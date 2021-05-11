# data-nasa-gov-frontpage

Data.nasa.gov holds metadata harvested from more than 88 different NASA sites that share public data.

This front-end only page serves as an easy to change front-page for the system that hosts the catalog of datasets in data.nasa.gov (which is not on github).

## Contributing
If you find any factual errors or places where additions could be made, please add it as an issue or submit a pull request. We accept pull requests from the public. 

## Deployment

This page is live under https://data.nasa.gov. 

It used to be live under https://nasa.github.io/data-nasa-gov-frontpage/ as a github pages page, but now that redirects to https://data.nasa.gov as well. 

The catalog itself is proxied in from a 3rd party SAAS.

After changes are made here, the code changes can be updated on the appropriate server using the update bash script. Look internally for a more detailed description of the worflow. Only after the update on the server, will updates appear on data.nasa.gov. 


## Potentially Reusable Code Assets Leveraged by this Repository

1. This page uses nasawds-2.0.7, which you can find here: https://github.com/nasa/nasawds which is based on GSA's <a href="https://github.com/uswds/uswds"> US web design service</a>. Both are open-source projects on Github.

2. The <a href="https://github.com/nasa/data-nasa-gov-frontpage/tree/master/non-nasawds-assets/footer">footer</a> is reused across several open-innovation pages.

3. The page data_visualization.html contains a treemap that displays an aggregate data visualization of contents of data.nasa.gov data catalog. The data is represented by rectangles scaled by the number of datasets. Each rectangle reflects a unique combination of source, category, and keyword. This data is extracted from the metadata in data.json.

## The Treemap Data Visualization Page
### Data Source:
The aggregate data visualization code depends on a JSON file that follows a valid data.json schema as defined by the open data project here: https://project-open-data.cio.gov/ and here https://project-open-data.cio.gov/v1.1/schema/.

Theoretically, you should be able to drop in any data.json from any federal agency. Your milage may vary, however. The visualization may not look as nice if the structure is different. For example, if source is shown as the first breakdown and 95% of your datasets are from a single source, than that rectange will take up the majority of the space. This won't look very nice.

### Data Processing:
`data_processing.py` is responsible for processing the data and can be found inside the `data_processing_scripts` folder. To run it, make sure your data source is in the same folder as the script and run `python3 data_processing.py`. This will produce `processed_data.json`, which is formatted as follows: 
```
{
   "name": "dataset",
   "children": [
       {
           "name": <source>,
           "children": [
               {
                   "name": <category>,
                   "children": [
                       {
                           "name": <keyword>,
                           "value": <count>
                       }, ...
                   ]
               }, ...
           ]
       }, ...
   ]
}
```
**NOTE**: Category refers to "theme" in the original schema.

#### Duplicates:
If your source data has a duplicate source, you may add it to `duplicates.json` found inside the `data_processing_scripts` folder.

Example:
```
{
  "National Aeronautics Space Administration": "NASA",
  ...
}
```
This example will group both "National Aeronautics Space Administration" and "NASA" under the source name "NASA" in `data_processing.py`.

#### Ignoring Data:
If your source data has any source, category or keyword you want ignored, you may add it to `ignoreData.json` found inside the `data_processing_scripts` folder.

Example: 
```
{
  "source": ["NASA"],
  "category": ["Earth Science", "Geospatial"],
  "keyword": []
}
```
This example will ignore all entries in which "NASA" is the source, and ignore all entires with "Earth Science" and "Geospatial" are categories. 
**NOTE**: Category refers to "theme" in the original schema

#### Keyword Count Minimum:
`keyword_count_threshold` sets the minimum number a keyword count must be to be added to `processed_data.json` and can be changed inside `data_processing.py` [here](https://github.com/nasa/data-nasa-gov-frontpage/blob/master/data_processing_scripts/data_processing.py#L3).

### Data Visualization:
The code used to visualize the data is `visualizations.js` and can be found inside `nasawds-2.07/js`. 

#### Expanding Acronyms to be Displayed in Treemap Legend:
In `acronyms.json`, found inside `nasawds-2.0.7/json`, you may select acronyms you wish to be expanded for the purpose of displaying them in the treemap legend. Each acronym must have a `type` (either source or category), and a `name` (the acronym's expansion).

Example: 
```
{
  "NASA": { "type": "source", "name": "National Aeronautics Space Administration"},
  "GPM": {"type": "category", "name": "Global Precipitation Measurement"}
}
```

#### Treemap Rectangle and Legend Key Links:
When a user clicks on either a treemap rectangle or a legend key, they are redirected to data.nasa.gov's data catalog page. Changing where a user is redirected can be done inside of `nasawds-2.07/js/visualizations.js`. Setting the treemap rectangle link is done [here](https://github.com/nasa/data-nasa-gov-frontpage/blob/master/nasawds-2.0.7/js/visualizations.js#L55), and setting the legend key link is done [here](https://github.com/nasa/data-nasa-gov-frontpage/blob/master/nasawds-2.0.7/js/visualizations.js#L120).

#### Functions:
`create_treemap(<data>, <format>)` function takes the `processed_data.json` as the first argument, and the treemap format (d3.treemapSquarify, d3.treemapBinary, d3.treemapSlice, d3.treemapDice, d3.treemapSliceDice) as the second. This function is responsible for rendering and appending the treemap to the site. 

`changeNesting(<data>)` function takes the `processed_data.json` as an argument, and returns back the same data except it changes the grouping/nesting order from `source -> category -> keyword` to `category -> source -> keyword`.

`clean_data_treemap(<data>)` function takes the `processed_data.json` as an argument, and is responsible for removing sources and categories that have no children, as well as swap out source and category acronyms listed in `acronyms.json` (found inside `nasawds-2.0.7/json`) using `swap_acronyms()`. This new cleaned dataset it returned. 

`swap_acronyms(<acronym>)` function takes an acronym string and returns its expantion if listed in `acronyms.json`. If no expantion is found, the original acronym string is returned.


#### Other D3.js visualizations that will work with same processed data format:
[Collapsible Tree](https://observablehq.com/@d3/collapsible-tree)

[Circle Packing](https://observablehq.com/@d3/circle-packing)

[Sunburst](https://observablehq.com/@d3/sunburst)

[Icicle](https://observablehq.com/@d3/icicle)

[Cluster Dendrogram](https://observablehq.com/@d3/cluster-dendrogram)


