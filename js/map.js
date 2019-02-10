


	var map = L.map('map').setView([0, 0], 1);





	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);


		var blueIcon = L.icon({
    iconUrl: 'images/blueuniversity.png',


    iconSize:     [32, 37], // size of the icon
    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

	var redIcon = L.icon({
    iconUrl: 'images/reduniversity.png',


    iconSize:     [32, 37], // size of the icon
    iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});


var marker1 = L.marker([46.893567560684936,  -96.8035626411438], {icon: redIcon}).bindPopup("North Dakota State University");

var marker2 = L.marker([-8.888484877052155, 13.184044361114502], {icon: blueIcon}).bindPopup("Universidade Independente de Angola");

var marker3 = L.marker([-37.82062648990132, 144.9500995874405], {icon: blueIcon}).bindPopup("Deakin University");

var marker4 = L.marker([-37.8221504, 145.0389546], {icon: redIcon}).bindPopup("Swinburne University of Technology");

var marker5 = L.marker([52.35409,	9.721999], {icon: redIcon}).bindPopup("Fachhochschule Hannover");

var marker6 = L.marker([-36.851747,	174.762963], {icon: redIcon}).bindPopup("University of Auckland");

var marker7 = L.marker([56.180362,	15.591223], {icon: redIcon}).bindPopup("Blekinge Institute of Technology");

var marker7 = L.marker([56.180362,	15.591223], {icon: redIcon}).bindPopup("Blekinge Institute of Technology");

var marker8 = L.marker([58.412688,	15.639732], {icon: redIcon}).bindPopup("Linköping University");

var marker9 = L.marker([36.037694, -79.035584], {icon: redIcon}).bindPopup("North Carolina State University");

var marker10 = L.marker([36.060498, -94.157887], {icon: redIcon}).bindPopup("University of Arkansas - Fayetteville");


var featureGroup = L.featureGroup([marker1, marker2, marker3, marker4, marker5, marker6, marker7,  marker8, marker9, marker10]).addTo(map);
map.fitBounds(featureGroup.getBounds(), {
	padding: [10,10]
});


	// control that shows population info
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		this._div.innerHTML = '<h4>World Population</h4>' +  (props ?
			'<b>' + props.name + '</b><br />' + props.pop_est + ' people '
			: 'Hover over a country');
	};

	info.addTo(map);


	// get color depending on population
	function getColor(population) {
		return population > 1000000000 ? '#BF3F3F' :
				population > 500000000  ? '#FDF6F6' :
				population > 300000000  ? '#B0B21E' :
				population > 200000000 ? '#5A5B0F' :
				population > 150000000 ? '#7F3FBF' :
				population > 100000000   ? '#2F353B' :
				population > 50000000   ? '#2F07BE' :
				population > 40000000 ? '#237068' :
				population > 30000000 ? '#AC740B':
				population > 20000000 ? '#04025D' :
				population > 10000000  ? '#44AB1B' :
							'#7B2F97';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.pop_est)
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
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	geojson = L.geoJson(worldData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);

	map.attributionControl.addAttribution('Population data &copy; <a href="https://www.census.gov/popclock/">US Census Bureau</a>');


	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 10000000, 50000000, 100000000, 150000000, 200000000, 300000000, 500000000, 1000000000],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);
