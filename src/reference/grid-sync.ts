export default class GridSync {
   private readonly traces: Trace[];
   private readonly axes: YAxisLayout[];
   private readonly gridlineCount: number;

   constructor(traces: Trace[], yAxes: YAxisLayout[], gridlineCount: number) {
      this.gridlineCount = gridlineCount;
      this.traces = traces;
      this.axes = yAxes;
   }

   /**
    * Returns derived data for a provided axis.
    */
   sync() {
      const axisMetas: AxisMeta[] = this.traces.map(trace => {
         return this.getAxisMeta(trace.y);
      });


      /////////////////////////////////////////////////////////////////////////////////////
      // Get global dtick ratio
      /////////////////////////////////////////////////////////////////////////////////////
      const dtickRatios = axisMetas.map(meta => meta.dtickRatio);
      const globalDtickRatio = Math.max(...dtickRatios);


      /////////////////////////////////////////////////////////////////////////////////////
      // Get global negative ratio
      /////////////////////////////////////////////////////////////////////////////////////
      let hasNegative = false;
      const negativeRangeRatios = axisMetas.map(axis => {
         if (axis.min < 0) {
            hasNegative = true;
            return Math.abs(axis.min / axis.rangeDelta) * globalDtickRatio
         } else {
            return 0;
         }
      });
      // Increase the ratio by 0.1 so that your range minimums are extended just
      // far enough to not cut off any part of your lowest value
      const globalNegativeRatio = Math.max(...negativeRangeRatios) + 0.1


      /////////////////////////////////////////////////////////////////////////////////////
      // Get global positive ratio
      /////////////////////////////////////////////////////////////////////////////////////
      const positiveRangeRatios = axisMetas.map(axis => {
         return Math.abs(axis.max / axis.rangeDelta) * globalDtickRatio;
      });
      // Increase the ratio by 0.1 so that your range maximums are extended just
      // far enough to not cut off any part of your highest value
      const globalPositiveRatio = Math.max(...positiveRangeRatios) + 0.1


      /////////////////////////////////////////////////////////////////////////////////////
      // Set the range minimum and maximums, for all axes, based on our new global ratios
      /////////////////////////////////////////////////////////////////////////////////////
      axisMetas.map(axis => {
         axis.rangeMax = globalPositiveRatio * axis.dtick;
         // If any negative value is present, you must proportionally extend the
         // range minimum of all axes
         axis.rangeMin = hasNegative
            ? globalNegativeRatio * axis.dtick * -1
            : 0
         return axis;
      });


      /////////////////////////////////////////////////////////////////////////////////////
      // Return the provided axis layouts, but with their new range and dtick values
      /////////////////////////////////////////////////////////////////////////////////////
      return this.axes.map((axis, index) => {
         const meta = axisMetas[index];
         return {
            ...axis,
            range: [meta.rangeMin, meta.rangeMax],
            dtick: meta.dtick,
         };
      })
   }

   /**
    * Returns derived data for a provided axis.
    */
   getAxisMeta(axis: number[]): AxisMeta {
      const min = Math.min(...axis);
      const max = Math.max(...axis);

      // If no negative, range base will default to zero
      const rangeDelta = min < 0 ? max - min : max;

      const dtick = this.dtickCalculate(rangeDelta);
      const dtickRatio = rangeDelta / dtick;

      return { min, max, rangeDelta, dtick, dtickRatio };
   }

   /**
    * Finds a clean dtick value for the provided range.
    * 
    * dtick docs: https://plotly.com/javascript/reference/#layout-yaxis-dtick
    */
   private dtickCalculate(range: number): number {
      const rangeBase = this.bigFloor(range);

      return rangeBase / this.gridlineCount;
   }

   /**
    * Keeps the leading digit and sets the following digits to zero.
    * 
    * Example: 425837 => 400000
    */
    private bigFloor(value: number) {
      // multiply by 1000 so calculations hold for ranges < 1
      const inflatedValue = value * 1000;

      const valueString = Math.floor(inflatedValue).toString();
      const firstDigit = Number(valueString[0]);

      // Now that we're done with calculations, divide back
      return firstDigit * Math.pow(10, valueString.length - 1) / 1000;
   }
}
