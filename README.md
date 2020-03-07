# EarthquakeGraph
Visualize earthquakes on map in the form of a graph<br/>
First specify a starting point. From there, the algorithm finds the greatest magnitude earthquake in a radius R. Then it tries to find adjacent earthquakes that are:<br/>
*In the R radius from the previous earthquake (the parent)<br/>
*Happened after the parent earthquake<br/>
*Returned in the order of magnitude<br/>

Size of graph can be specified, Arcgis map supports a maximum of about 800 points.<br/>

![system schema](out/mapExample.png)

Picture generated with params: <br/>
*START_POINT: counties.ROMANIA,
*STARTTIME: 1.11.1800,
*RADIUS: 400,
*MAX_GRAPH_SIZE: 200,
*ALGO: algoEnum.DEPTH_FIRST,

run with
`npm start`
<br/>

Edit the desired starting point, start date and other params(radius, graph size, algorithm) in src/config/parameterConfig.ts<br/>
If not already there, add the coordinates of the desired starting point in src/config/regionCoordinates.ts<br/>


### To debug with VSCode
run
`tsc`
to generate the js files in the 'built' folder<br/>
then go to 'built/index.js' file and press F5<br/>
select Node.js from the dropdown<br/>
