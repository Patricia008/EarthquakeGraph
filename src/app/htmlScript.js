require([
	"esri/Map",
	"esri/views/MapView",
	"esri/Graphic",
	"esri/layers/GraphicsLayer",
], function(Map, MapView, Graphic, GraphicsLayer) {
	
	var map = new Map({
		basemap: "topo-vector"
	})

	var view = new MapView({
		container: "viewDiv",
		map: map,
		// center: [-118.80500,34.02700],
		zoom: 3
	})

	var graphicsLayer = new GraphicsLayer()
	map.add(graphicsLayer)

	fetch('graph.json')
		.then(response => response.json())
		.then(jsonResponse => {
			console.log(jsonResponse[0])
			jsonResponse.forEach(vertex => {
				// Mark the earthquake with a point
				createAndAddPoint(Graphic, graphicsLayer, vertex[0].geometry.coordinates[0], vertex[0].geometry.coordinates[1])
				// Draw lines between earthquakes
				const adjQuakes = vertex[1]
				adjQuakes.forEach(adjVertex => {
					createAndAddLine(
						Graphic,
						graphicsLayer,
						vertex[0].geometry.coordinates[0],
						vertex[0].geometry.coordinates[1],
						adjVertex.geometry.coordinates[0],
						adjVertex.geometry.coordinates[1]
					)
				})
			})
		})

})

function createAndAddPoint(Graphic, graphicsLayer, long, lat) {
	var point = {
		type: "point",
		longitude:long,
		latitude: lat,
	};
	var simpleMarkerSymbol = {
		type: "simple-marker",
		color: [226, 119, 40],
		outline: {
			color: [255, 255, 255],
			width: 1
		}
	};
	var pointGraphic = new Graphic({
		geometry: point,
		symbol: simpleMarkerSymbol
	});
	graphicsLayer.add(pointGraphic);
}

function createAndAddLine(Graphic, graphicsLayer, long1, lat1, long2, lat2) {
	var simpleLineSymbol = {
		type: "simple-line",
		color: [226, 119, 40], // orange
		width: 1
	  };

	  var polyline = {
		type: "polyline",
		paths: [
		  [long1, lat1],
		  [long2, lat2],
		]
	  }

	  var polylineGraphic = new Graphic({
		geometry: polyline,
		symbol: simpleLineSymbol
	  })

	  graphicsLayer.add(polylineGraphic);
}
