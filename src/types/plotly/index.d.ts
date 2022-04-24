type Trace = {
   name: string;
   type: string;
   x: number[];
   y: number[];
   yaxis?: string;
}

type YAxisLayout = {
   title?: string;
   side?: string;
   range?: [number, number];
   dtick?: number;
   overlaying?: string;
   zeroline?: boolean;
   showgrid?: boolean;
};

type Layout = {
   margin?: {
      t?: number;
      r?: number;
      b?: number;
      l?: number;
   };
   legend?: {
      orientation?: string;
      x?: number;
      y?: number;
   };
   yaxis?: YAxisLayout;
   yaxis2?: YAxisLayout;
}