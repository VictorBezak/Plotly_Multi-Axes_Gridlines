multiAxis = () => {
    //**************************************************************************
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DIV ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //**************************************************************************

    let graphDiv = document.getElementById('plotly_graph')


    //**************************************************************************
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DATA ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //**************************************************************************

    const X_AXIS = ["Jan", "Feb", "Mar", "Apr", "May"]


    // ************************************************************************
    // Y1 Calculations

    const Y1_AXIS = [232, 2506, 470, 1864, -190]
    y1_min = Math.min(...Y1_AXIS)
    y1_max = Math.max(...Y1_AXIS)

    if (y1_min < 0) {
        y1_range = y1_max - y1_min
    } else {
        y1_range = y1_max
    }

    y1_len = Math.floor(y1_range).toString().length
    y1_pow10_divisor = Math.pow(10, y1_len - 1)
    y1_firstdigit = Math.floor(y1_range / y1_pow10_divisor)
    y1_max_base = y1_pow10_divisor * y1_firstdigit

    y1_dtick = y1_max_base / 5


    // ************************************************************************
    // Y2 Calculations

    const Y2_AXIS = [-241.21, 365.24, 265.21, 204.34, 1129]
    y2_min = Math.min(...Y2_AXIS)
    y2_max = Math.max(...Y2_AXIS)

    if (y2_min < 0) {
        y2_range = y2_max - y2_min
    } else {
        y2_range = y2_max
    }

    y2_len = Math.floor(y2_range).toString().length
    y2_pow10_divisor = Math.pow(10, y2_len - 1)
    y2_firstdigit = Math.floor(y2_range / y2_pow10_divisor)
    y2_max_base = y2_pow10_divisor * y2_firstdigit

    y2_dtick = y2_max_base / 5


    /**************************************************************************/
    // Capture the highest dtick ratio as your global dtick ratio.
    //
    // All other axes will have their positive and negative ranges scaled to
    // make their dtick_ratios match the global ratio. When the ratios match,
    // the gridlines match!
    /**************************************************************************/

    y1_dtick_ratio = y1_range / y1_dtick
    y2_dtick_ratio = y2_range / y2_dtick

    global_dtick_ratio = Math.max(y1_dtick_ratio, y2_dtick_ratio)


    /**************************************************************************/
    // Calculate Range Minimums
    //
    // 1. This is done by first finding the negative ratio for all axes:
    //     1. what percentage of the range is coming from negative values
    //     2. multiply percentage by global ratio to get the percentage of the
    //        global ratio (percentage of total gridlines) that should be shown
    //        under the zero baseline.
    // 
    //     NEGATIVE RATIO == NUMBER OF GRIDLINES NEEDED FOR NEGATIVE VALUES
    //
    // 2. Capturing the highest negative ratio as the global negative ratio
    //
    // 3. Then applying the negative ratio to all of your axis minimumsto get
    //    their new proportionally scaled range minimums
    /**************************************************************************/

    negative = false  // Are there any negative values present

    if (y1_min < 0) {
        negative = true
        y1_negative_ratio = Math.abs(y1_min / y1_range) * global_dtick_ratio
    } else {
        y1_negative_ratio = 0
    }

    if (y2_min < 0) {
        negative = true
        y2_negative_ratio = Math.abs(y2_min / y2_range) * global_dtick_ratio
    } else {
        y2_negative_ratio = 0
    }

    // Increase the ratio by 0.1 so that your range minimums are extended just
    // far enough to not cut off any part of your lowest value
    global_negative_ratio = Math.max(y1_negative_ratio, y2_negative_ratio) + 0.1

    // If any negative value is present, you must proportionally extend the
    // range minimum of all axes
    if (negative) {
        y1_range_min = (global_negative_ratio) * y1_dtick * -1
        y2_range_min = (global_negative_ratio) * y2_dtick * -1
    }else {  // If no negatives, baseline is set to zero
        y1_range_min = 0
        y2_range_min = 0
    }


    // ************************************************************************
    // Calculate Range Maximums
    //
    // 1. This is done by first finding the positive ratio for all axes:
    //     1. what percentage of the range is coming from positive values
    //     2. multiply percentage by global ratio to get the percentage of the
    //        global ratio (percentage of total gridlines) that should be shown
    //        above the zero baseline.
    // 
    //     POSITIVE RATIO == NUMBER OF GRIDLINES NEEDED FOR POSITIVE VALUES
    //
    // 2. Capturing the highest positive ratio as the global positive ratio
    //
    // 3. Then applying the positive ratio to all of your axis maximums to get
    //    their new proportionally scaled range maximums
    /**************************************************************************/

    y1_positive_ratio = Math.abs(y1_max / y1_range) * global_dtick_ratio
    y2_positive_ratio = Math.abs(y2_max / y2_range) * global_dtick_ratio

    // Increase the ratio by 0.1 so that your range maximums are extended just
    // far enough to not cut off any part of your highest value
    global_positive_ratio = Math.max(y1_positive_ratio, y2_positive_ratio) + 0.1

    y1_range_max = (global_positive_ratio) * y1_dtick
    y2_range_max = (global_positive_ratio) * y2_dtick


    // ************************************************************************
    // Data Traces

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


    //**************************************************************************
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ LAYOUT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //**************************************************************************

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
            range: [y1_range_min, y1_range_max],
            dtick: y1_dtick,
        },
        yaxis2: {
            title: 'Oranges',
            side: 'right',
            range: [y2_range_min, y2_range_max],
            dtick: y2_dtick,
            overlaying: 'y',
            // zeroline: false,
            // showgrid: false

            /* Once you're confident that your axis grid are aligned
            to satisfaction, you can set those last two to false to
            clean up any resulting line overlap */
        }
    }


    //**************************************************************************
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CONFIG ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //**************************************************************************

    const config = {
        displaylogo: false,
        displayModeBar: false,
        responsive: true
    }


    //**************************************************************************
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //**************************************************************************

    Plotly.newPlot( graphDiv, data, layout, config )




    // OPTIONAL DEBUG

    console.log("\n-------------------------------------------------\nY1 Axis Calculations\n\n")

    console.log("y1: ", Y1_AXIS)
    console.log("y1_min: ", y1_min)
    console.log("y1_max: ", y1_max)
    console.log("y1_range: ", y1_range)
    console.log("")
    console.log("y1_len: ", y1_len)
    console.log("y1_pow10_divisor: ", y1_pow10_divisor)
    console.log("y1_firstdigit: ", y1_firstdigit)
    console.log("y1_max_base: ", y1_max_base)
    console.log("")
    console.log("y1_dtick: ", y1_dtick)

    console.log("\n-------------------------------------------------\nY2 Axis Calculations\n\n")

    console.log("y2: ", Y2_AXIS)
    console.log("y2_min: ", y2_min)
    console.log("y2_max: ", y2_max)
    console.log("y2_range: ", y2_range)
    console.log("")
    console.log("y2_len: ", y2_len)
    console.log("y2_pow10_divisor: ", y2_pow10_divisor)
    console.log("y2_firstdigit: ", y2_firstdigit)
    console.log("y2_max_base: ", y2_max_base)
    console.log("")
    console.log("y2_dtick: ", y2_dtick)

    console.log("\n-------------------------------------------------\nGlobal Ratios\n\n")

    console.log("y1_dtick_ratio: ", y1_dtick_ratio)
    console.log("y2_dtick_ratio: ", y2_dtick_ratio)
    console.log("global_dtick_ratio: ", global_dtick_ratio)

    console.log("\n\n")

    console.log("y1_negative_ratio: ", y1_negative_ratio)
    console.log("y2_negative_ratio: ", y2_negative_ratio)
    console.log("global_negative_ratio: ", global_negative_ratio)

    console.log("\n\n")

    console.log("y1_positive_ratio: ", y1_positive_ratio)
    console.log("y2_positive_ratio: ", y2_positive_ratio)
    console.log("global_positive_ratio: ", global_positive_ratio)

    console.log("\n-------------------------------------------------\nMin/Max Ranges\n\n")

    console.log("y1_min: ", y1_min)
    console.log("y1_max: ", y1_max)
    console.log("y1_range_min: ", y1_range_min)
    console.log("y1_range_max: ", y1_range_max)

    console.log("\n\n")

    console.log("y2_min: ", y2_min)
    console.log("y2_max: ", y2_max)
    console.log("y2_range_min: ", y2_range_min)
    console.log("y2_range_max: ", y2_range_max)
}
