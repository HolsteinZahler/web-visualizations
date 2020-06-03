    // Create a map object
    let myMap = L.map("map", {
      center: [41.8240, -87.6304],
      zoom: 10
    });

    // Streetmap layer from openstreetmap.org
    L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: ['a','b','c'],
    }).addTo(myMap);

// Functions used to color map
let number_of_colors = 20
let myColor = d3.scaleLinear().domain([0,(number_of_colors-1)/2,number_of_colors-1])
  .range(["blue", "yellow", "red"])

function getColor(value,num_of_colors,dataMin,dataMax){
  return myColor(Math.floor(1.0*(value-dataMin)/(dataMax-dataMin)*(num_of_colors)));
}




// Initialize slider
var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value


d3.json("./static/data/com_map_dict.json").then(function(data) {
  d3.select("#mapSpinner").remove();
  d3.select("#legSpinner").remove();


  function getMap(year) {


    console.log(data[year]);
    let comAreaCounts = [];
    data[year].forEach( count => { comAreaCounts.push(parseInt(count)) });
    //console.log("Result");
    //console.log(comAreaCounts);
    let legendTitle = year;
    let minCount = 0;
    let maxCount = 14000;    
    if (year === "2019") {
      legendTitle = `2010-2018`
      minCount = 0;
      maxCount = 70000;
    };
    
    //maxCount = Math.max(...comAreaCounts);
    //minCount = Math.min(...comAreaCounts);
    // comAreaCounts.forEach(value => {
    //   console.log(getColor(value,number_of_colors,minCount,maxCount))
    // });

    //Set border and fill colors
    function polystyle(feature) {
    return {
      fillColor: getColor(comAreaCounts[parseInt(feature.properties.area_num_1)-1],number_of_colors,minCount,maxCount),
      weight: 2,
      opacity: 1,
      color: 'white',  //Outline color
      fillOpacity: 0.5,
      className: "boundariesAndFill"
      };
    }
    // function myTooltips(feature) {
    //   return feature.properties.community;
    //   //L.bindTooltip(feature.properties.area_num_1);
    // };

      //Add borders of community areas to map
      L.geoJson(comarea_data, {style: polystyle}).bindTooltip(function (layer) {
        return layer.feature.properties.community+`<br>`+comAreaCounts[parseInt(layer.feature.properties.area_num_1)-1]; //merely sets the tooltip text
     }, {permanent: false, opacity: 0.8}).addTo(myMap);

      let legend = L.control({position: 'bottomright'});

      legend.onAdd = function (map) {
          
          let div = L.DomUtil.create('div', 'info legend'),
          // loop through our density intervals and generate a label with a colored square for each interval
          curValue = 1.0*minCount,
          delta = 1.0*(maxCount-minCount)/(number_of_colors);
          div.innerHTML +=`<h3> <strong> `+legendTitle+`</strong> </h3>`;
          for (var i = 0; i < number_of_colors; i++) {
            nextValue = curValue+delta;
                  if (i===0){
                    div.innerHTML +='<i style="background:' + getColor(curValue,number_of_colors,minCount,maxCount) + '"></i> '+0+'<br>';
                    //Math.ceil(curValue) + (Math.floor(nextValue) ? '&ndash;' + Math.floor(nextValue) + '<br>' : '+');
                  }
                  else if (i===(number_of_colors/2-1)||i===number_of_colors-1){
                    div.innerHTML +='<i style="background:' + getColor(curValue,number_of_colors,minCount,maxCount) + '"></i> ' + Math.floor(nextValue/1000) + 'K<br>';
                    //Math.ceil(curValue) + (Math.floor(nextValue) ? '&ndash;' + Math.floor(nextValue) + '<br>' : '+');
                  } else {
                    div.innerHTML +='<i style="background:' + getColor(curValue,number_of_colors,minCount,maxCount) + '"></i><br>';
                  }
                  //div.innerHTML +='<span style="background:' + getColor(curValue,number_of_colors,minCount,maxCount) + '"></span> ';
            curValue =  nextValue;
          }
    
          return div;
        };
      console.log("Counts are");
      console.log(minCount);
      console.log(maxCount);
      legend.addTo(myMap);

      let htmlObject = legend.getContainer();
      let a = document.getElementById('mapLegend');

      function setParent(el, newParent)
      {
         newParent.appendChild(el);
      }
      setParent(htmlObject, a);
  }

  //var legend = L.control({position: 'bottomright'});




  // Update the current slider value (each time you drag the slider handle)
  getMap('2010')
  slider.oninput = function() {
    let comGroup = document.getElementsByClassName("boundariesAndFill");
    while(comGroup.length > 0){
      comGroup[0].parentNode.removeChild(comGroup[0]);
    }
    let legendGroup = document.getElementsByClassName("info legend");
    while(legendGroup.length > 0){
       legendGroup[0].parentNode.removeChild(legendGroup[0]);
    }
    //comGroup.forEach(element => element. remove());
    //d3.selectAll("#map > *").remove().exit();
    //d3.selectAll(".leaflet-bottom leaflet-right").selectAll("div").remove();
    //d3.selectAll("svg  > *").remove();
    if (this.value === '2019') {
        console.log(this.value);
        //output.innerHTML = "2010-2018";
        getMap(this.value);
    } else {
        console.log(this.value);
        //output.innerHTML = this.value;
        getMap(this.value);
    }
  }

});



