// var map = L.map('map').setView([0, 0], 2);


var map = L.map('map', {
	minZoom: 1,
	maxZoom: 2,
	dragging: false
});5
var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

// var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
// 	attribution: cartodbAttribution
// }).addTo(map);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 10,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
	'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox.light'
}).addTo(map);

L.control.scale({ maxWidth: 250 }).addTo(map);

// setInterval(function () {
// 	map.setView([0, 0], 2, { duration: 1, animate: true });
// 	setTimeout(function () {
// 		map.setView([60, 0], 2, { duration: 1, animate: true });
// 	}, 2000);
// }, 4000);

map.setView([0, 0], 2);

// control that shows population info
var info = L.control();

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};

info.update = function (props) {
	this._div.innerHTML = '<h4>Country</h4>' +
	 (props ?	'<b>' +	props.name +'</b><br /> <h4>Institution</h4>' + props.institutions + '<br>'
		: 'Click over a country');
	};

	info.addTo(map);

//	get color depending on population
	function getColor(population) {


    return  population === "United States"  ? 'yellow':
    population === "Angola"  ? 'blue':
    population === "Australia"  ? 'green':
    population === "Brazil"  ? 'red':
    population === "Germany"  ? 'purple':
    population === "New Zealand"  ? 'orange':
    population === "Sweden"  ? '#f44259':
		'gray';
	}

  function mystyle(feature) {
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
       fillColor: getColor(feature.properties.name)
    };
  }




	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

	var geojson;

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			//mouseover: highlightFeature,
      click: highlightFeature,
			 mouseout: resetHighlight,
      //click: resetHighlight,

			//click: zoomToFeature
		});
	}


	var hr = new XMLHttpRequest();
	var url = "/custom.geo.json";

	hr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
		var json = JSON.parse(hr.responseText);
                 geojson = L.geoJSON(json, {
                  style: mystyle,
                  onEachFeature: onEachFeature
                }).addTo(map);
							}
		}

    hr.open("GET", url, true);
  	hr.send();

	map.attributionControl.addAttribution('Population data &copy; <a href="https://www.census.gov/popclock/">US Census Bureau</a>');

// var hr = new XMLHttpRequest();
// var url = "/custom.geo.json";
// var json;
// hr.onreadystatechange = function () {
// 	if (this.readyState == 4 && this.status == 200) {
// 		json = JSON.parse(hr.responseText);
// 		var unique;

// 		for (var i = 0; i < json.features.length; i++) {
// 			var found = false;
// 			//console.log(i);
// 			for (var j = 0; j < myobject.institutions.length; j++) {
// 				if (json.features[i].properties.name === myobject.institutions[j].country) {
// 					found = true;
// 					unique = json.features[i].properties.name;

// 					function mystyle(feature) {
// 						return {
// 							weight: 2,
// 							opacity: 1,
// 							color: 'white',
// 							dashArray: '3',
// 							fillOpacity: 0.7,

// 							fillColor: getColor(unique)


// 						};
// 					}


// 					//console.log("one "+unique);
// 					geojson = L.geoJSON(json, {

// 						style: mystyle,
// 						onEachFeature: onEachFeature
// 					}).addTo(map);
// 					break;
// 				} else if (found == false) {
// 					unique = json.features[i].properties.name;
// 					console.log("two " + unique);




// 				}


// 				console.log(worldData.features[i].properties.name);

// 				console.log(json.institutions[j].country);


// 				console.log(worldData.features[i].properties.name);
// 			}


// 		}




// 	}

// }


// hr.open("GET", url, true);
// hr.send();

// var institutionsJSON = false;
// fetch('/institutions.json', {
// 		method: 'GET'
// 	})
// 	.then(response => response.json())
// 	.then(json => {
// 		//	console.log(json)


// 		// geojson = L.geoJSON(json, {
// 		// 	style: mystyle,
// 		// 	onEachFeature: onEachFeature
// 		// })
// 		// .addTo(map);
// 	})
// 	.catch(error => console.log(error.message));

	