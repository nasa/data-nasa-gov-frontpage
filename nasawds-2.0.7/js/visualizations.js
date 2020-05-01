// Used to create treemap, and its legend
var create_treemap = (data, tile) => {
    let color = d3.scaleOrdinal(d3.schemePaired);
    let format = d3.format(",d");
    let height = 780;
    let width = 780;
    let legendKeys = [];
    let margin = ({ top: 0, right: 0, bottom: 5, left: 0 });

    let treemap = data => d3.treemap()
        .tile(tiles[tile])
        .size([width, height])
        .padding(1.5)
        .round(true)
        (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value));

    let chart = () => {
        const root = treemap(data);

        // Tree map vis
        const svg = d3.select("#svg").append("svg")
            .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom])
            .style("font", "0.6em sans-serif");

        const leaf = svg.selectAll("g")
            .data(root.leaves())
            .join("g")
            .attr("transform", d => `translate(${d.x0 + margin.left}, ${d.y0 + margin.top})`);

        leaf.append("title")
            .text(d => {
                let arr = d.ancestors().reverse().map(d => d.data.name)
                let outStr;
                // Creating the tooltip text
                if (hasNestingOrderChanged) {
                    outStr = `Keyword: ${d.data.name}\nUpload Source: ${arr[2]}\nCategory: ${arr[1]}\n\nCount: ${format(d.value)}`;
                } else {
                    outStr = `Keyword: ${d.data.name}\nUpload Source: ${arr[1]}\nCategory: ${arr[2]}\n\nCount: ${format(d.value)}`;
                }
                return outStr;
            });

        leaf.append("a")
            .attr("xlink:href", d => {
                let arr = d.ancestors().reverse().map(d => d.data.name)
                let outStr;
                // Creating the tooltip text
                if (hasNestingOrderChanged) {
                    outStr = `Keyword: ${d.data.name}\nUpload Source: ${arr[2]}\nCategory: ${arr[1]}\n\nCount: ${format(d.value)}`;
                } else {
                    outStr = `Keyword: ${d.data.name}\nUpload Source: ${arr[1]}\nCategory: ${arr[2]}\n\nCount: ${format(d.value)}`;
                }
                return `https://data.nasa.gov/browse?q= ${d.data.name}\n+ ${arr[1]}\n+ ${arr[2]}\n\n&sortBy=relevance`
            })
            .append("rect")
            .attr("id", d => (d.leafUid = ID("leaf")).id)
            .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
            .attr("fill-opacity", 0.6)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            

        leaf.append("clipPath")
            .attr("id", d => (d.clipUid = ID("clip")).id)
            .append("use")
            .attr("xlink:href", d => `#${d.leafUid.id}`);

        leaf.append("text")
            .attr("clip-path", d => `url(#${d.clipUid.id})`)
            .selectAll("tspan")
            .data(d => {
                // Sets the legendKeys by only selecting sources with a value
                if (Number(d.value) > 0) {
                    let src = d.parent.parent.data.name;
                    if (legendKeys.indexOf(src) === -1) {
                        legendKeys.push(src)
                    }
                }
                return d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(d.value))
            })
            .join("tspan")
            .attr("class", "node-text")
            .attr("x", 3)
            .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
            .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
            .text(d => {return d});
        
        var svg2 = d3.select("#legend")
            .append("svg")
            .attr("width", 500)
            .attr("height", 25 * legendKeys.length);
        
        // Legend vis
        var legend = svg2.append("g")
            .attr("class", "legend")
            .attr('transform', 'translate(-20, 13)')  

        legend.append('g')
            .selectAll('.legend-group')
            .data(legendKeys)
            .join('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => `translate(20, ${i * 23})`)
            .append('rect')
                .attr('fill', (d) => color(d))
                .attr('opacity', 0.7)
                .attr('width', 15)
                .attr('height', 15)
                .attr('rx', 3)

        legend.selectAll('.legend')
            .append('text')
            .attr('font-size', "1em")
            .attr('transform', (d, i) => `translate(19, 12)`)
            .attr("class", "legend-text")
            .text((d) => {return d})
            .on("click", (d) => {
                document.location.href = `https://data.nasa.gov/browse?q=${d}&sortBy=relevance`
            })
    }
    chart();
}

// Created to emulate observable's "DOM.uid()" method
// Used for the treemap's clip path
var ID = (type) => {
    let out = {};
    let id_num = Math.random().toString(36).substr(2, 9);
    out["id"] = `O-${type}-${id_num}`;
    out["href"] = `${window.location.href}#${out["id"]}`;
    return out;
};

// Swaps out acronyms using acronyms.json
swap_acronyms = (str) => {
    if (str in acronyms) {
        return toTitleCase(acronyms[str]["name"]);
    } else {
        return toTitleCase(str);
    }
}

// Removes Categories and sources if empty
clean_data_treemap = (data) => {
    for (let i = 0; i < data["children"].length; i++) {
        // Checking if acronym has to be switched out
        data["children"][i]["name"] = swap_acronyms(data["children"][i]["name"]);
        for (let j = 0; j < data["children"][i]["children"].length; j++) {
            // Checking if acronym has to be switched out
            data["children"][i]["children"][j]["name"] = swap_acronyms(data["children"][i]["children"][j]["name"]);
            // Removing category if empty
            if (data["children"][i]["children"][j]["children"].length === 0) {
                data["children"][i]["children"].splice(j, 1);
                // Going back an index since element at current index
                // Just got spliced
                j--;
            }
        }
        // Remove Source if its empty
        if (data["children"][i]["children"].length === 0) {
            data.children.splice(i, 1);
            // Going back an index since element at current index
            // Just got spliced
            i--;
        } 
    }
    return data;
}

// Changes the nesting order of the data from:
// Source > Catergory > Keyword to ->
// Catergory > Source > Keyword
changeNesting = (data) => {
    var out = {"name": "datasets", "children": []};
    var obj = {};
    // Used to hold objects before being appened
    var temp_obj;
    var temp_obj2;
    var temp_obj3;

    // Begin looping through sources
    for (let i = 0; i < data["children"].length; i++) {
        // Begin looping through the catergories within each source
        for (let j=0; j < data["children"][i]["children"].length; j++) {
            // Checking if the category's "children" array has any kw's
            if (data["children"][i]["children"][j]["children"].length !== 0) {
                // If the output obj does not yet have an element <category name>, create one
                if (!obj.hasOwnProperty(data["children"][i]["children"][j]["name"])) {
                    obj[data["children"][i]["children"][j]["name"]] = {};
                }
                obj[data["children"][i]["children"][j]["name"]][data["children"][i]["name"]] = {}
                // Changes the nesting order 
                for (let x = 0; x < data["children"][i]["children"][j]["children"].length; x++) {
                    obj[data["children"][i]["children"][j]["name"]][data["children"][i]["name"]][data["children"][i]["children"][j]["children"][x]["name"]] = data["children"][i]["children"][j]["children"][x]["value"];
                }
            }
        }
    }
    // After the main obj is built, format the data correctly for D3
    for (let [category, cat_children] of Object.entries(obj)) {
        temp_obj = {};
        temp_obj["name"] = category;
        temp_obj["children"] = [];

        for (let [source, src_children] of Object.entries(cat_children)) {
            temp_obj2 = {};
            temp_obj2["name"] = source;
            temp_obj2["children"] = [];   

            for (let [kw, count] of Object.entries(src_children)) {
                temp_obj3 = {};
                temp_obj3["name"] = kw;
                temp_obj3["value"] = count;
                temp_obj2["children"].push(temp_obj3)
            } 
            temp_obj["children"].push(temp_obj2)           
        }
        out["children"].push(temp_obj);
    }
    return out;
}

// Capitilizes first letter of every word in a string
var toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

///=======/// EVENT LISTENERS: ///=======///

// When user changes treemap view
$("div").on("change", "#treemap-tile", () => {
     $("#svg").html("");
    $("#legend").html("");
    if (hasNestingOrderChanged) {
        create_treemap(reversed_data, $("#treemap-tile").val());
    } else {
        create_treemap(data, $("#treemap-tile").val());
    }
});

// When user changes nesting order
$("div").on("change", 'input[type=radio][name=nesting-order]', () => {
    $("#svg").html("");
    $("#legend").html("");
    let nestingNum = $('input[type=radio][name=nesting-order]:checked').val();
    if (nestingNum === "1") {
        hasNestingOrderChanged = false;
        create_treemap(data, $("#treemap-tile").val());
    } else {
        hasNestingOrderChanged = true;
        create_treemap(reversed_data, $("#treemap-tile").val()); 
    }   
});
