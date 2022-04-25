import GridSync from "./grid-sync.js";

const X_AXIS = ["Jan", "Feb", "Mar", "Apr", "May"];
const Y1_AXIS = [232, 2506, 470, 1864, -190];
const Y2_AXIS = [-0.8, 0.09, 0.01, 0.13, 0.42];

// Traces
const traces = [
   {
      name: 'Apples',
      type: 'bar',
      x: X_AXIS,
      y: Y1_AXIS
   },
   {
      name: 'Oranges',
      type: 'line',
      x: X_AXIS,
      y: Y2_AXIS,
      yaxis: 'y2'
   },
];

// Layout
const axes = [
   {
      title: 'Apples',
      side: 'left',
   },
   {
      title: 'Oranges',
      side: 'right',
      overlaying: 'y',
      zeroline: false,
      showgrid: false,
   },
];

/**
 * This is where the magic happens. You give it your traces, and your axis layouts,
 * and it will return your axes layouts with the synchronized range and dtick values.
 */
const adjustedAxes = new GridSync(traces, axes, 4).sync();

const layout = {
   margin: {
      t: 40, r: 70, b: 40, l: 70,
   },
   legend: {
      orientation: 'h',
      x: 0.6,
      y: 1.1
   },
   yaxis: adjustedAxes[0], // Apply the returned axis layouts here
   yaxis2: adjustedAxes[1],
};

// Create
const graphDiv = document.getElementById('plotly_graph');
const config = {
   displaylogo: false,
   displayModeBar: false,
   responsive: true
};

Plotly.newPlot( graphDiv, traces, layout, config );