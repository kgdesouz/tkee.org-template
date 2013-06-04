/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


window.onload = function() {
    
     launchMap();
    
};

function simpleMap() {
    map = new OpenLayers.Map("basicMap");
    var mapnik         = new OpenLayers.Layer.OSM();
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(13.41,52.52).transform( fromProjection, toProjection);
    var zoom           = 15; 

    map.addLayer(mapnik);
    map.setCenter(position, zoom );

}

function launchMap() {

    var lat            = 43.45;
    var lon            = -80.49;

    map = new OpenLayers.Map("basicMap");
    var mapnik         = new OpenLayers.Layer.OSM();
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(-80.5,43.47).transform( fromProjection, toProjection);
    var zoom           = 13; 

    map.addLayer(mapnik);

    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(position));

    map.setCenter(position, zoom );
    /* map.zoomToMaxExtent(); */
}



function launchMapWithData() {
    map = new OpenLayers.Map("basicMap");
    map.addLayer(new OpenLayers.Layer.OSM());
 
    var pois = new OpenLayers.Layer.Text( "My Points",
                    { location:"/data/textfile.txt",
                      projection: map.displayProjection
                    });
    map.addLayer(pois);
 
    //Set start centrepoint and zoom    
    var lonLat = new OpenLayers.LonLat( 9.5788, 48.9773 )
          .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
          );
    var zoom=11;
    map.setCenter (lonLat, zoom);
}

    
function launchMapLargeData() {   
            
    
            // Define three colors that will be used to style the cluster features
            // depending on the number of features they contain.
            var colors = {
                low: "rgb(181, 226, 140)", 
                middle: "rgb(241, 211, 87)", 
                high: "rgb(253, 156, 115)"
            };
            
            // Define three rules to style the cluster features.
            var lowRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.LESS_THAN,
                    property: "count",
                    value: 15
                }),
                symbolizer: {
                    fillColor: colors.low,
                    fillOpacity: 0.9, 
                    strokeColor: colors.low,
                    strokeOpacity: 0.5,
                    strokeWidth: 12,
                    pointRadius: 10,
                    label: "${count}",
                    labelOutlineWidth: 1,
                    fontColor: "#ffffff",
                    fontOpacity: 0.8,
                    fontSize: "12px"
                }
            });
            var middleRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.BETWEEN,
                    property: "count",
                    lowerBoundary: 15,
                    upperBoundary: 50
                }),
                symbolizer: {
                    fillColor: colors.middle,
                    fillOpacity: 0.9, 
                    strokeColor: colors.middle,
                    strokeOpacity: 0.5,
                    strokeWidth: 12,
                    pointRadius: 15,
                    label: "${count}",
                    labelOutlineWidth: 1,
                    fontColor: "#ffffff",
                    fontOpacity: 0.8,
                    fontSize: "12px"
                }
            });
            var highRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.GREATER_THAN,
                    property: "count",
                    value: 50
                }),
                symbolizer: {
                    fillColor: colors.high,
                    fillOpacity: 0.9, 
                    strokeColor: colors.high,
                    strokeOpacity: 0.5,
                    strokeWidth: 12,
                    pointRadius: 20,
                    label: "${count}",
                    labelOutlineWidth: 1,
                    fontColor: "#ffffff",
                    fontOpacity: 0.8,
                    fontSize: "12px"
                }
            });
            
            // Create a Style that uses the three previous rules
            var style = new OpenLayers.Style(null, {
                rules: [lowRule, middleRule, highRule]
            });            

    
    
    // Create a map and add OSM raster layer as the base layer
            var map2 = new OpenLayers.Map("basicMap");
            var osm2 = new OpenLayers.Layer.OSM();
            map2.addLayer(osm2);
            
            // Initial view location
            var center = new OpenLayers.LonLat(2, 40);
            center.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
            map2.setCenter(center, 5);
            // Add a LayerSwitcher control
            map2.addControl(new OpenLayers.Control.LayerSwitcher());  

            // Create a vector layers
            var vector2 = new OpenLayers.Layer.Vector("Features", {
                renderers: ['Canvas','SVG'],
                strategies: [
                    new OpenLayers.Strategy.AnimatedCluster({
                        distance: 45,
                        animationMethod: OpenLayers.Easing.Expo.easeOut,
                        animationDuration: 20
                    })
                ],
                styleMap:  new OpenLayers.StyleMap(style)
            });
            map2.addLayer(vector2);
            
            // Create some random features
            var features = [];
            for(var i=0; i< 50000; i++) {
                var lon = Math.random() * 2 + -4;
                var lat = Math.random() * 2 + 40;
                
                var lonlat = new OpenLayers.LonLat(lon, lat);
                lonlat.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));

                var f = new OpenLayers.Feature.Vector( new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat));
                features.push(f);
            }
            vector2.addFeatures(features);
}