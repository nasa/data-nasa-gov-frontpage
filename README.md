# data-nasa-gov-frontpage

Data.nasa.gov holds metadata harvested from more than 88 different NASA sites that share public data.

This front-end only page serves as an easy to change front-page for the system that hosts the catalog of datasets in data.nasa.gov (which is not on github).

## Contributing
If you find any factual errors or places where additions could be made, please add it as an issue or submit a pull request. We accept pull requests from the public. 

## Potentially Reusable Code Assets Leveraged by this Repository

1. This page uses nasawds-2.0.7, which you can find here: https://github.com/nasa/nasawds which is based on GSA's <a href="https://github.com/uswds/uswds"> US web design service</a>. Both are open-source projects on Github.

2. The <a href="https://github.com/nasa/data-nasa-gov-frontpage/tree/master/non-nasawds-assets/footer">footer</a> is reused across several open-innovation pages.

3. The page data_visualization.html contains a treemap that displays an aggregate data visualization of contents of data.nasa.gov data catalog. The data is represented by rectangles scaled by the number of datasets. Each rectangle reflects a unique combination of source, category, and keyword. This data is extracted from the metadata in data.json.

## The Treemap Data Visualization Page
### Data Source:
The aggregate data visualization code depends on a JSON file that follows a valid data.json schema as defined by the open data project here: https://project-open-data.cio.gov/ and here https://project-open-data.cio.gov/v1.1/schema/.

Theoretically, you should be able to drop in any data.json from any federal agency. Your milage may vary, however. The visualization may not look as nice if the structure is different. For example, if source is shown as the first breakdown and 95% of your datasets are from a single source, than that rectange will take up the majority of the space. This won't look very nice.

### Data Processing:
INSERT WORDS HERE (code files, key functions, common english summarry of what is done)

##### Converting Data Structure:
INSERT WORDS HERE (code files, key functions, common english summarry of what is done)

##### Duplicates:
INSERT WORDS HERE (code files, key functions, common english summarry of what is done)

##### JSON of acronym definitions & links:
INSERT WORDS HERE (code files, key functions, common english summarry of what is done)

#### D3.js code summary
INSERT WORDS HERE (code files, key functions, common english summarry of what is done)

#### Finding other d3.js code that will work with same data structure
INSERT WORDS HERE

