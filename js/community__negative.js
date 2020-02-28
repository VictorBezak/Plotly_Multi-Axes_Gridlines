const community_negative = () => {
    // *********************************************************************************************
    // PARENT / CHILD

    const parent = document.getElementById('community__container');
    const div = document.getElementById('community__graph');


    // *********************************************************************************************
    // DATA

    const X_AXIS = ["Jan", "Feb", "Mar", "Apr", "May"]

    const Y1_AXIS = [232, 2206, 37, -24, 190]
    y1_min_value = Math.min(...Y1_AXIS)  // -24
    y1_max_value = Math.max(...Y1_AXIS)  // 2206

    const Y2_AXIS = [141.21, 365.24, 265.21, 204.34, 129]
    y2_min_value = Math.min(...Y2_AXIS)  // 129
    y2_max_value = Math.max(...Y2_AXIS)  // 365.24


    let trace1 = {
        name: 'Apples',
        type: 'bar',
        marker: {
            color: 'rgb(70, 145, 24)'
        },
        x: X_AXIS,
        y: Y1_AXIS
    };

    let trace2 = {
        name: 'Oranges',
        type: 'line',
        marker: {
            color: 'black'
        },
        x: X_AXIS,
        y: Y2_AXIS,
        yaxis: 'y2'
    };

    let data = [trace1, trace2];


    // *********************************************************************************************
    // LAYOUT    

    graph_range_min = Math.min(y1_min_value, y2_min_value)  // -24
    
    let layout = {
        margin: {
            t: 40, r: 70, b: 40, l: 70,
        },
        legend: {
            orientation: 'h',
            x: 0.6,
            y: 1.1
        },

        yaxis: {
            title: 'Apples',
            side: 'left',
            zeroline: true,

            range: [graph_range_min, y1_max_value]
        },
        yaxis2: {
            title: 'Oranges',
            side: 'right',

            range: [graph_range_min, y2_max_value],
            overlaying: 'y'
        }
    }


    // *********************************************************************************************
    // CONFIG

    const config = {
        // responsive: true,
        displaylogo: false,
        displayModeBar: false
    }

    // *********************************************************************************************
    // CREATE AND APPEND

    const plotlyComponent = Plotly.newPlot( div, data, layout, config ).then(
        (result) => {
            parent.appendChild(result);
        }
    );
};
