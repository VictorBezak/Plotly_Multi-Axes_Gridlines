const community_positive = () => {
    // *********************************************************************************************
    // PARENT / CHILD

    const parent = document.getElementById('community__container');
    const div = document.getElementById('community__graph');


    // *********************************************************************************************
    // DATA

    const X_AXIS = ["Jan", "Feb", "Mar", "Apr", "May"]

    const Y1_AXIS = [232, 2206, 37, 1629, 190]
    y1_min = Math.min(...Y1_AXIS)  // 37
    y1_max = Math.max(...Y1_AXIS)  // 2206
    y1_len = Math.floor(y1_max).toString().length  // 4
    y1_pow10_divisor = Math.pow(10, y1_len - 1)  // 1000
    y1_firstdigit = Math.floor(y1_max / y1_pow10_divisor)  // 2
    y1_max_base = y1_pow10_divisor * y1_firstdigit  // 2000

    y1_dtick = y1_max_base / 5  // 2000 / 5 == 400

    const Y2_AXIS = [141.21, 365.24, 265.21, 204.34, 129]
    y2_min = Math.min(...Y2_AXIS)  // 129
    y2_max = Math.max(...Y2_AXIS)  // 365.24
    y2_len = Math.floor(y2_max).toString().length  // 3
    y2_pow10_divisor = Math.pow(10, y2_len - 1)  // 100
    y2_firstdigit = Math.floor(y2_max / y2_pow10_divisor)  // 3
    y2_max_base = y2_pow10_divisor * y2_firstdigit  // 300

    y2_dtick = y2_max_base / 5  // 300 / 5 == 60


    // *****************************************************


    // Finding initial ratios for comparison
    y1_dtick_ratio = y1_max / y1_dtick  // 5.515
    y2_dtick_ratio = y2_max / y2_dtick  // 6.0873333333333335

    // Capture the larger of the two ratios
    global_dtick_ratio = Math.max(y1_dtick_ratio, y2_dtick_ratio)


    // *****************************************************


    /* This is how we raise the range max of the axis with a
    smaller ratio. Since we don't know if the global_dtick_ratio
    is from y1 or y2, we will perform the operation on both axes
    --one range will stay the same, one will increase
    accordingly */
    
    // INCREASED: y1_max was == 2206 -> y1_range_max is == 2434
    y1_range_max = global_dtick_ratio * y1_dtick
    // SAME: y2_max was == 365.24 -> y2_range_max is == 365.24
    y2_range_max = global_dtick_ratio * y2_dtick


    // *****************************************************


    /* Add these to your y_range_max if one of your traces
    is too close to the top of the graph you want to bring
    more of the graph into view. */
    y1_range_extension = (y1_range_max / 2) / global_dtick_ratio
    y2_range_extension = (y2_range_max / 2) / global_dtick_ratio

    
    let trace1 = {
        name: 'Apples',
        type: 'bar',
        x: X_AXIS,
        y: Y1_AXIS
    };

    let trace2 = {
        name: 'Oranges',
        type: 'line',
        x: X_AXIS,
        y: Y2_AXIS,
        yaxis: 'y2'
    };

    let data = [trace1, trace2];


    // *********************************************************************************************
    // LAYOUT
    
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
            range: [0, y1_range_max + y1_range_extension],
            dtick: y1_dtick
        },
        yaxis2: {
            title: 'Oranges',
            side: 'right',
            range: [0, y2_range_max + y2_range_extension],
            overlaying: 'y',
            dtick: y2_dtick
            // zeroline: false,
            // showgrid: false

            /* Once you're confident that your axis grid are aligned
            to satisfaction, you can set those last two to false to
            clean up any resulting line overlap */
        }
    }


    // *********************************************************************************************
    // CONFIG

    const config = {
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
