let d3colors = Plotly.d3.scale.category10();

// Load box plot data
d3.json("./static/data/box_plots_dict.json").then(function(data) {
    // Remove spinners after data is loaded
    d3.select("#locSpinner").remove();
    d3.select("#surSpinner").remove();
    d3.select("#comSpinner").remove();
    //Comunity Area Box Plot
    let box_data = []
    data['PER CAPITA INCOME ORDER'].forEach(j => {
        let five_num_summary = data['comunity areas'][j]['com_quartiles'];
        let temp_trace = {
              type: 'box', 
              x: five_num_summary,
              autobinx: true, 
              autobiny: true, 
              name: j+" - "+data['comunity areas'][j]['COMMUNITY AREA NAME'],
              marker:{
                  color: d3colors(0)
              },
            };
        box_data.push(temp_trace)
    });

    box_layout = {
        title: 'Boxplots of cleanuptimes - community areas in decending order by Per Capita Income',
      yaxis: {
        autorange: true, 
        automargin: true
      }, 
      xaxis: {
        type: 'linear', 
        range: [-0.5, 6.25], 
        title: 'Time to complete cleanup (days)', 
        automargin: true
      }, 
       height: 800, 
      autosize: true, 
      hovermode: 'closest', 
      showlegend: false
    };
    Plotly.plot('comBoxPlot', {
      data: box_data,
      layout: box_layout,
      config: {responsive: true}
    });

    // Surface type boxplot
    box_data = []
    d3.keys(data['surfaces']).forEach(type => {
        let five_num_summary = data['surfaces'][type];
        let temp_trace = {
              type: 'box', 
            //  ysrc: 'chris:18050:7ac9c3', 
              x: five_num_summary,
              autobinx: true, 
              autobiny: true, 
              name: type,
              marker:{
                  color: d3colors(0)
              },
            };
        box_data.push(temp_trace)
    });

    box_layout = {
        title: 'Boxplots of cleanuptimes by surface type',
      yaxis: {
        autorange: true, 
        automargin: true
      }, 
      xaxis: {
        type: 'linear', 
        range: [-0.5, 6.25], 
        title: 'Time to complete cleanup (days)', 

        automargin: true
      }, 
      height: 800, 
      autosize: true, 
      hovermode: 'closest', 
      showlegend: false
    };
    Plotly.plot('surBoxPlot', {
      data: box_data,
      layout: box_layout,
      config: {responsive: true}
    });

    // locations type boxplot
    box_data = []
    d3.keys(data['locations']).forEach(type => {
        let five_num_summary = data['locations'][type];
        let temp_trace = {
              type: 'box', 
              x: five_num_summary,
              autobinx: true, 
              autobiny: true, 
              name: type,
              marker:{
                  color: d3colors(0)
              },
            };
        box_data.push(temp_trace)
    });

    box_layout = {
        title: 'Boxplots of cleanuptimes by graffiti location',
      yaxis: {
        autorange: true, 
        automargin: true
      }, 
      xaxis: {
        type: 'linear', 
        range: [-0.5, 6.25], 
        title: 'Time to complete cleanup (days)', 
        automargin: true
      }, 
       height: 800, 
      autosize: true, 
      hovermode: 'closest', 
      showlegend: false
    };
    Plotly.plot('locBoxPlot', {
      data: box_data,
      layout: box_layout,
      config: {responsive: true}
    });

});