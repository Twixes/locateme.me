import Phenomenon from 'phenomenon'

const OPT_PHI = "phi";
const OPT_THETA = "theta";
const OPT_DOTS = "mapSamples";
const OPT_MAP_BRIGHTNESS = "mapBrightness";
const OPT_BASE_COLOR = "baseColor";
const OPT_MARKER_COLOR = "markerColor";
const OPT_GLOW_COLOR = "glowColor";
const OPT_MARKERS = "markers";
const OPT_DIFFUSE = "diffuse";
const OPT_DPR = "devicePixelRatio";
const OPT_DARK = "dark";

declare module "cobe" {
    export interface Marker {
        location: [number, number];
        size: number;
    }

    export interface Options {
        [OPT_PHI]: number,
        [OPT_THETA]: number,
        [OPT_DOTS]: number,
        [OPT_MAP_BRIGHTNESS]: number,
        [OPT_BASE_COLOR]: string,
        [OPT_MARKER_COLOR]: string,
        [OPT_GLOW_COLOR]: string,
        [OPT_MARKERS]: Marker[],
        [OPT_DIFFUSE]: number,
        [OPT_DPR]: number,
        [OPT_DARK]: number,
      }

    function createGlobe(canvas: HTMLCanvasElement, opts: Options): void;
    export = createGlobe;
  }
