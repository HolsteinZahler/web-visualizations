let d3colors = Plotly.d3.scale.category10();

let firstKey = 'empty'
d3.json("./static/data/data_dict.json").then(function(data) {
    // Remove spinners after data is loaded
    d3.select("#barSpinner").remove();
    d3.select("#bar2Spinner").remove();
    d3.select("#scatterSpinner").remove();
    
    // Select dropdowns and get keys for data dictionary
    let dropdownbox = d3.selectAll("#selComArea")
    let keys = d3.keys(data);
    let graffitiCounts = [];
    let comAreaUnemployments = [];
    let comAreaPerCapitas = [];
    let scatterHover = [];
    let comAreaCtPerCap = [];
    // Fill in dropdown options and get plot data from json
    keys.forEach(key => {
        dropdownbox.append("option").attr("value", key).text(key+" - "+data[key]['COMMUNITY AREA NAME']);
        graffitiCounts.push(data[key]['COUNT']);
        comAreaUnemployments.push(data[key]['PERCENT AGED 16+ UNEMPLOYED']);
        comAreaPerCapitas.push(data[key]['PER CAPITA INCOME '])
        comAreaCtPerCap.push(data[key]['COUNT PER CAPITA'])
        scatterHover.push(data[key]['COMMUNITY AREA NAME']+' <br> Count: '+data[key]['COUNT']+' <br> Count Per 1K: '+data[key]['COUNT PER CAPITA'])
    });
    firstKey = keys[0]

    // Scatter plot
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

    Plotly.newPlot('scatter', scatter_trace, scatter_layout, {responsive: true});
    
    // Plots of grafffiti counts based on community area and demographic data table.
    
    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selComArea").on("change", updatePlotly);
    function updatePlotly() {

        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selComArea");
        
        // Assign the value of the dropdown menu option to a letiable
        let comAreaStr = d3.select('#selComArea option:checked').text();
        comAreaStr = comAreaStr.replace("-","<br>")
        
        comArea = dropdownMenu.property("value");
        com_area_data = data[comArea];

        // Update Demographics Table
        d3.select('#comAreaName').text(com_area_data['COMMUNITY AREA NAME']);
        d3.select('#perUnemployed').text(com_area_data['PERCENT AGED 16+ UNEMPLOYED']);
        d3.select('#perWOHS').text(com_area_data['PERCENT AGED 25+ WITHOUT HIGH SCHOOL DIPLOMA']);
        d3.select('#perAged').text(100-com_area_data['PERCENT AGED UNDER 18 OR OVER 64']);
        d3.select('#perCap').text(com_area_data['PER CAPITA INCOME ']);
        d3.select('#hrdIdx').text(com_area_data['HARDSHIP INDEX']);


        // Counts by location bar graph
        h_bar_values = com_area_data['location']['counts'];
        h_bar_labels = com_area_data['location']['types'];
        h_bar_labels_text =[];
        h_bar_hover = [];
        let value_sum = h_bar_values.reduce(function(a, b){
            return a + parseInt(b);
        }, 0);
        for (let i in h_bar_values) {
            h_bar_hover.push((h_bar_values[i]/value_sum*100).toFixed(2)+'%');
        }
        h_bar_labels.forEach(value => {
            h_bar_labels_text.push(value.toString()+" ");
        })
        
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
          
        Plotly.newPlot('bar', trace1, layout1, {responsive: true});
        
        // Counts by surface bar graph
        h_bar_values = com_area_data['surface']['counts'];
        h_bar_labels = com_area_data['surface']['types'];
        h_bar_labels_text =[];
        h_bar_hover = [];
        value_sum = h_bar_values.reduce(function(a, b){
            return a + parseInt(b);
        }, 0);
        for (let i in h_bar_values) {
            h_bar_hover.push((h_bar_values[i]/value_sum*100).toFixed(2)+'%');
        }
        h_bar_labels.forEach(value => {
            h_bar_labels_text.push(value.toString()+" ");
        })
        
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
        
        Plotly.newPlot('bar2', trace2, layout2, {responsive: true});

    }

    //Initialize plot
    updatePlotly(firstKey);
});



