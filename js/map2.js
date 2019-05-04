
//  "Morocco": ["Université Mohammed VI des Sciences de la Santé, Casablanca",
// "Université Mohammed VI Polytechnique, Benguerir",
// "Abdelmalek Essaâdi University, Tétouan - Tanger",
// "Al Akhawayn University, Ifrane",
// "Cadi Ayyad University, Marrakesh",
// "Chouaib Doukkali University, El Jadida",
// "Hassan II Mohammedia University",
// "Mohammedia Hassan Premier University, Settat",
// "Ibn Tofail University, Kenitra",
// "Ibnou Zohr University, Agadir",
// "Mohamed Premier University, Oujda",
// "Mohammed V University, Rabat"
// ]


/*
   Capstone Project Spring of 2019, NDSU
   
   Author:   Khurshid Kurbanov   
   Date:     2/11/19
   
   Filename: map.css
   

*/

$(document).ready(function () {

	var map = L.map('map', {
		minZoom: 1,
		// maxZoom: 2,
		dragging: true,

	}).fitWorld();


	//tile is used as base map
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);

	L.control.scale({
		maxWidth: 250
	}).addTo(map);

	//set the map within one site view
	var southWest = L.latLng(-89.98155760646617, -180),
		northEast = L.latLng(89.99346179538875, 180);
	var bounds = L.latLngBounds(southWest, northEast);

	map.setMaxBounds(bounds);
	map.on('drag', function () {
		map.panInsideBounds(bounds, {
			animate: false
		});
	});


	//set map's view and coordinate center
	map.setView([0, 0], 2);

	// control that displays country name and participating universities. Only works if country has a member university
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	//  removes commas, brackets if present 
	String.prototype.replaceAll = function (search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};


	info.update = function (props) {
		this._div.innerHTML = '<h4>Country</h4>' +
			(props ? '<b>' + props.NAME + '</b><br /> <h4>Institution</h4>' +
				JSON.stringify(props.institutions).replace('[', '').replace(']', '').replaceAll('"', '').replaceAll(',', '<br>') :

				'Hover over a country');
	};

	info.addTo(map);

	//read in institutions json file
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

	for (i in json2) {
		console.log(json2[i]);
	}

	//	sets countries into four different colors that are not adjacent on the map
	function getColor(countryName) {
		

		if (countryName) {
			return ["Albania", "Argentina", "Australia", "Azerbaijan", "Belarus",
					"Bhutan", "Bosnia and Herz.", "Bulgaria", "Cyprus", "Dem. Rep. Congo",
					"El Salvador", "Finland", "Gabon", "Gambia", "Germany", "Guyana", "Hungary",
					"Iceland", "Iraq", "Italy", "Jamaica", "Kazakhstan", "Laos", "Liberia", "Malawi",
					"Malaysia", "Mauritania", "Mexico", "Niger", "North Korea", "Pakistan", "Peru",
					"Somalia", "Spain", "Sri Lanka", "Sudan", "Swaziland", "Taiwan", "Tajikistan",
					"Bahamas", "Togo", "United Arab Emirates", "Vanuatu", "Yemen", "eSwatini"
				].includes(countryName) ? '#e2061c':

				["Angola", "Bangladesh", "Belize", "Bolivia", "Botswana", "Burkina Faso",
					"Burundi", "Central African Rep.", "China", "Costa Rica", "Czech Republic", "Estonia",
					"France", "Georgia", "Greece", "Guinea", "Indonesia", "Iran", "Ireland", "Israel",
					"Lebanon", "Libya", "Lithuania", "Mozambique", "Nigeria", "Norway", "Oman",
					"Puerto Rico", "Slovenia", "Thailand", "Uganda", "Ukraine", "United States of America",
					"Uzbekistan", "Venezuela", "W. Sahara", "New Caledonia", "Ethiopia", "Czechia", "Serbia",
					"Falkland Is."
				].includes(countryName) ? '#1324dd':

				["Algeria", "Armenia", "Benin", "Cameroon", "Canada", "Colombia",
					"Cuba", "Djibouti", "Dominican Rep.", "Guatemala", "India", "Ivory Coast",
					"Kyrgyzstan", "Lesotho", "Macedonia", "Madagascar", "Moldova", "Montenegro", "Namibia",
					"Netherlands", "New Zealand", "Nicaragua", "Paraguay", "Portugal", "Russia",
					"Saudi Arabia", "Senegal", "Slovakia", "Solomon Is.", "South Korea", "S. Sudan",
					"Suriname", "Sweden", "Switzerland", "Syria", "Turkmenistan", "United Kingdom",
					"Tanzania", "Uruguay", "Vietnam", "Zimbabwe", "Côte d'Ivoire",
				].includes(countryName) ? '#f7e702':

				["Brazil", "Afghanistan", "Austria", "Belgium", "Brunei", "Cambodia", "Chad",
					"Chile", "Congo", "Croatia", "Denmark", "Ecuador", "Egypt", "Eq. Guinea", "Eritrea",
					"Fiji", "Ghana", "Greenland", "Guinea-Bissau", "Haiti", "Honduras", "Japan", "Jordan",
					"Kenya", "Kuwait", "Latvia", "Mali", "Mongolia", "Morocco", "Myanmar", "Nepal",
					"Panama", "Papua New Guinea", "Philippines", "Poland", "Qatar", "Romania", "Rwanda",
					"Sierra Leone", "South Africa", "Trinidad and Tobago", "Tunisia", "Turkey", "Zambia",
					"Somaliland", "Kosovo", "Timor-Leste"
				].includes(countryName) ? '#16dd23':

				'gray'
		}
	}

	// sets styles
	function mystyle(feature) {

		return {
			weight: 2,
			opacity: 1,
			color: '#F5F5F5',
			dashArray: '1',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.country),

		};

	}

	//highlights a country when clicked or hovered over
	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#ababab',
			dashArray: '',
			fillOpacity: 0.8
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

	// reads in geojson file that is must for leaflet to get countries boundries and various properties of each country
	var hr = new XMLHttpRequest();
	var url = "all.geojson";
	var json;
	hr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			json = JSON.parse(hr.responseText);
			for (var i = 0; i <json.features.length; i++) {
				for (var j in json2) {
					if (json.features[i].properties.NAME === j) {
						// add institutions json file objects  to the geojson at runtime to make the map automated 
						// with institutions and country properties
						json.features[i].properties.institutions = json2[j];
						json.features[i].properties.country = j;	
					}
				
				}
			}
			geojson = L.geoJSON(json, {
					style: mystyle,
					onEachFeature: onEachFeature,
				})

				.addTo(map);

		}
	}

	hr.open("GET", url, true);
	hr.send();

});