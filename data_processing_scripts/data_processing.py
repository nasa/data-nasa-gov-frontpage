import json

keyword_count_theshold = 100
cat_dict = {}
d3_dict = {
    "name": "datasets",
    "children": []
}

with open("duplicates.json", encoding="utf8") as f:
    duplicates = json.load(f)

with open("ignoreData.json", encoding="utf8") as f:
    ignore_dict = json.load(f)

# Finds index of a dict in a list
def findIndex(lst, key, value):
    for i, dic in enumerate(lst):
        if dic[key] == value:
            return i
    return ValueError

with open('data.json', encoding="utf8") as json_file:
    data = json.load(json_file)

    # This for loop creates the cat_dict which is structured as follows:
    # {
    #     source: {
    #         category: {
    #             keyword: count,
    #             ...
    #         }, ...
    #     }, ...
    # }
    for ds in data['dataset']:
        if "publisher" in ds:
            for key, val in ds["publisher"].items():
                if key == "name":
                    if val in duplicates:
                        val = duplicates[val]
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


    # This for loop creates then creates the d3_dict using
    # the cat_dict and is structured as follows:
    # {
    #     "name": "dataset",
    #     "children": [
    #         {
    #             "name": source,
    #             "children": [
    #                 {
    #                     "name": category,
    #                     "children": [
    #                         {
    #                             "name": keyword,
    #                             "value": count
    #                         }, ...
    #                     ]
    #                 }, ...
    #             ]
    #         }, ...
    #     ]
    # }
    for src, cats in cat_dict.items():
        # Ignores sources in ignoreData.json
        if src in ignore_dict["source"]:
            continue
        out_obj = {
            "name": src,
            "children": []
        }        
        d3_dict["children"].append(out_obj)
        for cat, kws in cats.items():
            if cat in ignore_dict["category"]:
                continue
            out_obj2 = {
                "name": cat,
                "children": []
            }
            index_src = findIndex(d3_dict["children"], "name", src)
            d3_dict["children"][index_src]["children"].append(out_obj2)
            for kw, count in kws.items():
                # Ignores keywords in ignoreData.json
                if kw in ignore_dict["keyword"]:
                    continue

                if count > keyword_count_theshold:
                    kw_out = {
                        "name": kw,
                        "value": count
                    }
                    index_cat = findIndex(d3_dict["children"][index_src]["children"], "name", cat)
                    d3_dict["children"][index_src]["children"][index_cat]["children"].append(kw_out)
    
    with open('processed_data.json', 'w') as f:
        json.dump(d3_dict, f)