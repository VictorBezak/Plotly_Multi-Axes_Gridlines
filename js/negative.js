negative = () => {
    // *********************************************************************************************
    // PARENT / CHILD

    let graphDiv = document.getElementById('plotly_graph')


    // *********************************************************************************************
    // DATA

    const X_AXIS = ["Jan", "Feb", "Mar", "Apr", "May"]

    const Y1_AXIS = [232, 2206, 37, -864, 190]
    y1_min = Math.min(...Y1_AXIS)
    y1_max = Math.max(...Y1_AXIS)

    y1_len = Math.floor(y1_max).toString().length
    y1_pow10_divisor = Math.pow(10, y1_len - 1)
    y1_firstdigit = Math.floor(y1_max / y1_pow10_divisor)
    y1_max_base = y1_pow10_divisor * y1_firstdigit

    y1_dtick = y1_max_base / 5

    const Y2_AXIS = [141.21, 365.24, 265.21, 204.34, 129]
    y2_min = Math.min(...Y2_AXIS)
    y2_max = Math.max(...Y2_AXIS)

    y2_len = Math.floor(y2_max).toString().length
    y2_pow10_divisor = Math.pow(10, y2_len - 1)
    y2_firstdigit = Math.floor(y2_max / y2_pow10_divisor)
    y2_max_base = y2_pow10_divisor * y2_firstdigit

    y2_dtick = y2_max_base / 5


    // *****************************************************

    // Finding axis ranges
    y1_range = y1_max  // 2206 - (-564)
    y2_range = y2_max

    // Finding initial ratios for comparison
    y1_dtick_ratio = y1_range / y1_dtick
    y2_dtick_ratio = y2_range / y2_dtick

    // Capture the larger of the two ratios
    global_dtick_ratio = Math.max(y1_dtick_ratio, y2_dtick_ratio)


    // *****************************************************


    // Increased from 2206 to 2434
    y1_range_max = global_dtick_ratio * y1_dtick
    // Stayed the same at 365.24
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
    }

    let trace2 = {
        name: 'Oranges',
        type: 'line',
        x: X_AXIS,
        y: Y2_AXIS,
        yaxis: 'y2'
    }

    let data = [trace1, trace2]


    // *********************************************************************************************
    // LAYOUT

    graph_range_min = Math.min(y1_min, y2_min)  // -24

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
            // range: [graph_range_min, y1_range_max],
            // dtick: y1_dtick,
            // scaleanchor: 'x',
            // scaleratio: global_dtick_ratio
            // constraintoward: 'center'
        },
        yaxis2: {
            title: 'Oranges',
            side: 'right',
            // range: [graph_range_min, y2_range_max],
            // dtick: y2_dtick,
            overlaying: 'y',


            scaleanchor: 'y',
            // constraintoward: 'center',
            scaleratio: global_dtick_ratio

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
        displayModeBar: false,
        responsive: true
    }


    // *********************************************************************************************
    // CREATE AND APPEND

    Plotly.newPlot( graphDiv, data, layout, config )
}
