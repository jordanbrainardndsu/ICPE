
$(document).ready(function(){


// var style = {
// 	"clickable": true,
// 	"color": "#00D",
// 	"fillColor": "#00D",
// 	"weight": 1.0,
// 	"opacity": 0.3,
// 	"fillOpacity": 0.2
// };
// var hoverStyle = {
// 	"fillOpacity": 0.5
// };

// var geojsonURL = 'http://tile.example.com/{z}/{x}/{y}.json';
// var geojsonTileLayer = new L.TileLayer.GeoJSON(geojsonURL, {
// 	clipTiles: true,
// 	unique: function (feature) {
// 		return feature.id;
// 	}
// }, {
// 		style: style,
// 		onEachFeature: function (feature, layer) {
// 			if (feature.properties) {
// 				var popupString = '<div class="popup">';
// 				for (var k in feature.properties) {
// 					var v = feature.properties[k];
// 					popupString += k + ': ' + v + '<br />';
// 				}
// 				popupString += '</div>';
// 				layer.bindPopup(popupString);
// 			}
// 			if (!(layer instanceof L.Point)) {
// 				layer.on('mouseover', function () {
// 					layer.setStyle(hoverStyle);
// 				});
// 				layer.on('mouseout', function () {
// 					layer.setStyle(style);
// 				});
// 			}
// 		}
// 	}
// );
// map.addLayer(geojsonTileLayer);

//$('#slider').height(window.innerHTML);

$(document).on('click', '#toggle', function(){
	if($('#slider').hasClass('in')){
		$('#slider').removeClass('in')
	}else{
		$('#slider').addClass('in')
	}
});
var map = L.map('map', {
	minZoom: 1,
	maxZoom: 2,
	dragging: true
}).fitWorld();



L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(map);

L.control.scale({ maxWidth: 250 }).addTo(map);



map.setView([0, 0], 2);

// control that shows population info
var info = L.control();

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};


String.prototype.replaceAll = function (search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};


info.update = function (props) {
	this._div.innerHTML = '<h4>Country</h4>'+
	

	 (props ? '<b>' + props.NAME + '</b><br /> <h4>Institution</h4>' +
	 JSON.stringify(props.institutions).replace('[', '').replace(']', '').replaceAll('"', '').replaceAll(',', '<br>')
	 

		: 'Hover over a country');
	
	};

	info.addTo(map);

	var hr2 = new XMLHttpRequest();
	var url2 = "institutions.json";
	var json2;
	hr2.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				json2 = JSON.parse(hr2.responseText);
				

			}
		}

		hr2.open("GET", url2, true);
		hr2.send();
 
	
	

	

	//	get color depending on population
	function getColor(population) {
		     		
						if(population){
							return "red";
						}
								
								


						}
						  
							
						//return population === json2.institutions[i].country ? 'hsla(54, 91%, 46%, 0.88)' :
						// population === json2.institutions[1].country ? 'hsla(305, 61%, 30%, 0.97)' :
						// population === json2.institutions[2].country ? '#ce3e0e' :
						// population === json2.institutions[3].country ? 'hsla(245, 91%, 46%, 0.88)' :
						// population === json2.institutions[4].country ? '#ed0b17' :
						// population === json2.institutions[5].country ? '#e008f4' :
						// '#b6bab6';

				
	// L.geoJSON(states, {
		// 	style: function (feature) {
		// 		switch (feature.properties.party) {
		// 			case 'Republican':
		// 				return {
		// 					color: "#ff0000"
		// 				};
		// 			case 'Democrat':
		// 				return {
		// 					color: "#0000ff"
		// 				};
		// 		}
		// 	}
		// }).addTo(map);

  function mystyle(feature) {
		
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
	  fillColor: getColor(feature.properties.country)
			 
		};
		
  }




	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: 'yellow',
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
			mouseover: highlightFeature,
      //click: highlightFeature,
			 mouseout: resetHighlight,
      //click: resetHighlight,

			click: zoomToFeature
		});
	}


	var hr = new XMLHttpRequest();
	var url = "all.geojson";
		 var json;
	hr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
		 json = JSON.parse(hr.responseText);
	//	console.log(json.features.length);
		for(var i=0; i<=json.features.length-1; i++){
				//console.log(json.features[i].properties.name);
			for(var j=0; j<=json2.institutions.length-1; j++){
			
				if(json.features[i].properties.NAME===json2.institutions[j].country){
					json.features[i].properties.institutions = json2.institutions[j].institution;
					json.features[i].properties.country = json2.institutions[j].country;
          //console.log(json.features[i].properties.country);
					

				}
			}
		}
		 
	//    console.log(json.features.push(json2));

		//console.log(json)
	
                 geojson = L.geoJSON(json, {
								  style: mystyle,								  						
									onEachFeature: onEachFeature,
									})
			
				.addTo(map);

			
				 
					}
					}

					hr.open("GET", url, true);
					hr.send();


	map.attributionControl.addAttribution('Population data &copy; <a href="https://www.census.gov/popclock/">US Census Bureau</a>');


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

});