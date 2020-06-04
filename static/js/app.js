var d3colors = Plotly.d3.scale.category10();

let firstKey = 'empty'
d3.json("./static/data/data_dict.json").then(function(data) {

    d3.select("#barSpinner").remove();
    d3.select("#bar2Spinner").remove();
    d3.select("#scatterSpinner").remove();
    
    let dropdownbox = d3.selectAll("#selComArea")
    let keys = d3.keys(data);
    //console.log(keys);
    let graffitiCounts = [];
    let comAreaUnemployments = [];
    let comAreaPerCapitas = [];
    let scatterHover = [];
    let comAreaCtPerCap = [];
    keys.forEach(key => {
        dropdownbox.append("option").attr("value", key).text(key+" - "+data[key]['COMMUNITY AREA NAME']);
        graffitiCounts.push(data[key]['COUNT']);
        comAreaUnemployments.push(data[key]['PERCENT AGED 16+ UNEMPLOYED']);
        comAreaPerCapitas.push(data[key]['PER CAPITA INCOME '])
        comAreaCtPerCap.push(data[key]['COUNT PER CAPITA'])
        scatterHover.push(data[key]['COMMUNITY AREA NAME']+' <br> Count: '+data[key]['COUNT']+' <br> Count Per 1K: '+data[key]['COUNT PER CAPITA'])
    });
    firstKey = keys[0]
    //console.log(graffitiCounts)
    //console.log(comAreaUnemployments)
    //console.log(comAreaPerCapitas)

    let scatter_trace=[{
        x: comAreaPerCapitas,
        y: comAreaUnemployments,
        mode: 'markers',
        hovertext: scatterHover,
        marker: {
            color: comAreaCtPerCap,
            colorbar:{
                title: "Count per <br> 1000 Residents"
            }
        }
    }]

    let scatter_layout = {
        title: 'Graffiti Reports per 1000 Residents in Community Areas',
        xaxis: {
            title: 'Income Per Capita',
            automargin: true
            },
        yaxis: {
            title: 'Percent Unemployment',
            automargin: true
            },
    }

    Plotly.newPlot('scatter', scatter_trace, scatter_layout);
    
    
        

    
    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selComArea").on("change", updatePlotly);
    function updatePlotly() {

        
        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selComArea");
        
        // Assign the value of the dropdown menu option to a letiable
        let comAreaStr = d3.select('#selComArea option:checked').text();
        comAreaStr = comAreaStr.replace("-","<br>")
        
        console.log(comAreaStr);
        comArea = dropdownMenu.property("value");
        //console.log(comArea);
        com_area_data = data[comArea];

        // Update Demographics Table
        d3.select('#comAreaName').text(com_area_data['COMMUNITY AREA NAME']);
        d3.select('#perUnemployed').text(com_area_data['PERCENT AGED 16+ UNEMPLOYED']);
        d3.select('#perWOHS').text(com_area_data['PERCENT AGED 25+ WITHOUT HIGH SCHOOL DIPLOMA']);
        d3.select('#perAged').text(100-com_area_data['PERCENT AGED UNDER 18 OR OVER 64']);
        d3.select('#perCap').text(com_area_data['PER CAPITA INCOME ']);
        d3.select('#hrdIdx').text(com_area_data['HARDSHIP INDEX']);


        //
        h_bar_values = com_area_data['location']['counts'];
        h_bar_labels = com_area_data['location']['types'];
        h_bar_labels_text =[];
        h_bar_hover = [];
        var value_sum = h_bar_values.reduce(function(a, b){
            return a + parseInt(b);
        }, 0);
        for (var i in h_bar_values) {
            h_bar_hover.push((h_bar_values[i]/value_sum*100).toFixed(2)+'%');
        }
        h_bar_labels.forEach(value => {
            h_bar_labels_text.push(value.toString()+" ");
        })
        //h_bar_hover = com_area_data['location']['types'];
        
        let trace1 = [{
            type: 'bar',
            hovertext: h_bar_hover,
            x: h_bar_values,
            y: h_bar_labels_text,
            orientation: 'h'
          }];
        
        let layout1 = {
            title: 'Graffiti Locations in Community Area '+comAreaStr,
            xaxis: {
                title: 'Number of reports',
                automargin: true
                },
            yaxis: {
                title: 'Graffiti location',
                automargin: true
                },
        }
          
        Plotly.newPlot('bar', trace1, layout1);

        h_bar_values = com_area_data['surface']['counts'];
        h_bar_labels = com_area_data['surface']['types'];
        h_bar_labels_text =[];
        h_bar_hover = [];
        var value_sum = h_bar_values.reduce(function(a, b){
            return a + parseInt(b);
        }, 0);
        //console.log("value sum");
        //console.log(value_sum);
        for (var i in h_bar_values) {
            h_bar_hover.push((h_bar_values[i]/value_sum*100).toFixed(2)+'%');
            //console.log(h_bar_values[i]);
        }
        h_bar_labels.forEach(value => {
            h_bar_labels_text.push(value.toString()+" ");
        })
        //h_bar_hover = com_area_data['location']['types'];
        
        let trace2 = [{
            type: 'bar',
            hovertext: h_bar_hover,
            x: h_bar_values,
            y: h_bar_labels_text,
            orientation: 'h'
        }];
        
        let layout2 = {
            title: 'Graffiti Surfaces in Community Area <br>'+comAreaStr,
            xaxis: {
                title: 'Number of reports',
                automargin: true
                },
            yaxis: {
                title: 'Graffiti surface',
                automargin: true
                },
        }
        
        Plotly.newPlot('bar2', trace2, layout2);

//           let trace2 = [{
//             hovertext: sample_data["otu_labels"],
//             x: sample_data["otu_ids"],
//             y: sample_data["sample_values"],
//             mode: 'markers',
//             marker: {
//                 size: sample_data["sample_values"],
//                 color: sample_data["otu_ids"]
//             }
//           }];

//           let layout2 = {
//             title: 'Marker Size',
//             showlegend: false,
//             xaxis: { title: "OTU ID" } 
//           };
        
//           Plotly.newPlot('bubble', trace2, layout2);

//           wfreq = data["metadata"][sample_idx[dataset]]["wfreq"];

//           demo_list = d3.select("#sample-metadata")
//           demo_list.selectAll("li").remove();
//           demo_list.selectAll("ul").remove();
//           demo_list.append("ul")
//           demo_list.append("li").text("id: "+dataset)
//           demo_list.append("li").text("ethnicity: "+data["metadata"][sample_idx[dataset]]["ethnicity"])
//           demo_list.append("li").text("gender: "+data["metadata"][sample_idx[dataset]]["gender"])
//           demo_list.append("li").text("age: "+data["metadata"][sample_idx[dataset]]["age"])
//           demo_list.append("li").text("location: "+data["metadata"][sample_idx[dataset]]["location"])
//           demo_list.append("li").text("bbtype: "+data["metadata"][sample_idx[dataset]]["bbtype"])
//           demo_list.append("li").text("wfreq: "+wfreq.toString());

//           // BONUS

//           // Modified code from https://codepen.io/plotly/pen/rxeZME
//           // Enter a speed between 0 and 180
//         let level = wfreq*20; //180/9=20

//         // Trig to calc meter point
//         let degrees = 180 - level,
//             radius = .5;
//         let radians = degrees * Math.PI / 180;
//         let x = radius * Math.cos(radians);
//         let y = radius * Math.sin(radians);

//         // Path: may have to change to create a better triangle
//         let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
//             pathX = String(x),
//             space = ' ',
//             pathY = String(y),
//             pathEnd = ' Z';
//         let path = mainPath.concat(pathX,space,pathY,pathEnd);

//         let trace3 = [{ type: 'scatter',
//         x: [0], y:[0],
//             marker: {size: 28, color:'850000'},
//             showlegend: false,
//             name: ' washes',
//             text: level,
//             hoverinfo: 'text+name'},
//         { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
//         rotation: 90,
//         text: ['', '0-1', '1-2', '2-3', '3-4',
//                     '4-5', '5-6', '6-7', '7-8', '8-9'].reverse(),
//         textinfo: 'text',
//         textposition:'inside',	  
//         marker: {colors:[
//                         '#47ff4d', 
//                         '#54f14c',
//                         '#6ed74b', 
//                         '#95b04a',
//                         '#a3a34a', 
//                         '#ca7b48',
//                         '#ca7b48',
//                         '#e46147',
//                         '#ff4647',
//                         'rgba(255, 255, 255, 0)',
//                         ]},
//         labels: ['', '0-1', '1-2', '2-3', '3-4',
//         '4-5', '5-6', '6-7', '7-8', '8-9'].reverse(),
//         hoverinfo: 'label',
//         hole: .5,
//         type: 'pie',
//         showlegend: false
//         }];

//         let layout3 = {
//         shapes:[{
//             type: 'path',
//             path: path,
//             fillcolor: '850000',
//             line: {
//                 color: '850000'
//             }
//             }],
//         title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
// //        height: 600,
// //        width: 600,
//         xaxis: {zeroline:false, showticklabels:false,
//                     showgrid: false, range: [-1, 1]},
//         yaxis: {zeroline:false, showticklabels:false,
//                     showgrid: false, range: [-1, 1]}
//         };

//         Plotly.newPlot('gauge', trace3, layout3, {showSendToCloud:true});

    }
    //console.log(firstKey)
    //Initialize plot
    updatePlotly(firstKey);
    //d3.select("#selComArea").property("selected", function(d),{return d === '1'});
});


// 
// 

// // This function is called when a dropdown menu item is selected
