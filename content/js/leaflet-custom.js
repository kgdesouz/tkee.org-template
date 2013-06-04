/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

CM_ATTR = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://cloudmade.com">CloudMade</a><br/> ' + 
                'Contains dataset(s) licensed “as is” under ' +
                '<a href="http://www.ontario.ca/education-and-training/ontario-public-school-contact-information">Ontario Open Data</a> Terms of Use v1.0.<br/>' +
                'School Ranking data, used with permission: Copyright © 2010 <a href="http://ontario.compareschoolrankings.org/elementary/SchoolsByRankLocationName.aspx">The Fraser Institute.</a>';
                
CM_URL_LIGHT = 'http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png';
CM_KEY = 'BC9A493B41014CAABB98F0471D759707';
CM_URL_DARK = 'http://{s}.tile.cloudmade.com/82e1a1bab27244f0ab6a3dd1770f7d11/999/256/{z}/{x}/{y}.png';
OSM_URL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
OSM_ATTRIB = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';



window.onload = function() {
    
    leafletMarkers();
};

function leafletMarkers() {

    var map = L.map('map').setView([43.1460114, -80.2303925], 7);



    var baseLayer = L.tileLayer(CM_URL_LIGHT, {
        attribution: CM_ATTR,
        key: CM_KEY
    });

    baseLayer.addTo(map);

    var layerControl = L.control.layers({
            'Cloudmade (Light)': baseLayer 
    }).addTo(map);

    var marker;
    var layer;


    var createLayerGroup = function (name) {
            var layerGroup = new L.LayerGroup();

            map.addLayer(layerGroup);
            layerControl.addOverlay(layerGroup, name);

            return layerGroup;
    };


    function onEachFeature(feature, layer) {
            var popupContent = "<p>School: " + feature.properties.NAME + "</p>";
            
            popupContent += "Municipality: " +feature.properties.MUNICIPALITY + "<br/>";
            popupContent += "Type: " +feature.properties.TYPE + "<br/>";
            popupContent += "Level: " +feature.properties.LEVEL + "<br/>";
            popupContent += "Language: " +feature.properties.LANGUAG + "<br/>";
            popupContent += "Web: " +feature.properties.WEB + "<br/>";
            popupContent += "Board Name: " +feature.properties.BOARD_NAME + "<br/>";
            popupContent += "Rating 2011-12: " +feature.properties.Rating2011_12 + "<br/>";
            popupContent += "Rating (5 years): " +feature.properties.Rating_in_the_most_recent_five_years + "<br/>";
            popupContent += "Rank 2011-12: " +feature.properties.Rank2011_12 + "<br/>";
            popupContent += "Rank (5 years): " +feature.properties.Rank_in_the_most_recent_five_years + "<br/>";
            
            layer.bindPopup(popupContent);
    }


    function addNewLayer(data, legend, color) {
        var schoolsLayer = createLayerGroup(legend);

        marker = L.geoJson([data], {

                style: function (feature) {
                        return feature.properties && feature.properties.style;
                },

                onEachFeature: onEachFeature,

                pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, {
                                    radius: 6,
                                    fillColor: color,
                                    color: "#000",
                                    weight: 1,
                                    opacity: 1,
                                    fillOpacity: 0.8
                            } 

                        );
                }
        }).addTo(map);

        schoolsLayer.addLayer(marker); 

    
    }
    
 
    addNewLayer(schoolsNA, "No Data", "#737373");
    addNewLayer(schools0, "Rank 0-1", "#FFF7F3");
    addNewLayer(schools1, "Rank 1-2", "#FDE0DD");
    addNewLayer(schools2, "Rank 2-3", "#FCC5C0");
    addNewLayer(schools3, "Rank 3-4", "#FA9FB5");
    addNewLayer(schools4, "Rank 4-5", "#F768A1");
    //addNewLayer(schools5, "Rank 5-6", "#DD3497");
    addNewLayer(schools6, "Rank 6-7", "#AE017E");
    addNewLayer(schools7, "Rank 7-8", "#7A0177");
    addNewLayer(schools8, "Rank 8-9", "#49006A");
    addNewLayer(schools9, "Rank 9-10", "#49006A"); 


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

}    



