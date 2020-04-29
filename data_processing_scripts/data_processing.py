import json

cat_dict = {}
duplicates = {
    "NASA/GSFC/SED/ESD/GCDC/OB.DAAC" : "OB.DAAC"
}
d3_dict = {
    "name": "datasets",
    "children": []
}

def findIndex(lst, key, value):
    for i, dic in enumerate(lst):
        if dic[key] == value:
            return i
    return ValueError

with open('data.json', encoding="utf8") as json_file:
    data = json.load(json_file)

    for ds in data['dataset']:
        if "publisher" in ds:
            for key, val in ds["publisher"].items():
                if key == "name":
                    if val in duplicats:
                        val = duplicats[val]
                    if val not in cat_dict:
                        cat_dict[val] = {}

                    if "theme" in ds:
                        for cat in ds["theme"]:
                            if cat not in cat_dict[val]:
                                cat_dict[val][cat] = {}
                            
                            for kw in ds["keyword"]:
                                if kw in cat_dict[val][cat]:
                                    cat_dict[val][cat][kw] += 1
                                else:
                                    cat_dict[val][cat][kw] = 1
    
    for src, cats in cat_dict.items():
        if src == "N/A":
            continue
        out_obj = {
            "name": src,
            "children": []
        }        
        d3_dict["children"].append(out_obj)
        for cat, kws in cats.items():
            out_obj2 = {
                "name": cat,
                "children": []
            }
            index_src = findIndex(d3_dict["children"], "name", src)
            d3_dict["children"][index_src]["children"].append(out_obj2)
            for kw, count in kws.items():
                if kw == "ngda":
                    continue
                if count > 100:
                    kw_out = {
                        "name": kw,
                        "value": count
                    }
                    index_cat = findIndex(d3_dict["children"][index_src]["children"], "name", cat)
                    d3_dict["children"][index_src]["children"][index_cat]["children"].append(kw_out)
    
    for i in d3_dict['children']:
        print(i["name"])

    with open('processed_data.json', 'w') as f:
        json.dump(d3_dict, f)