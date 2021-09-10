//Is input loading
export const INPUT_LOADING = "INPUT_LOADING";
//Is loading modal being displayed
export const IS_SHOWING_LOADING_MODAL = "IS_SHOWING_LOADING_MODAL";
//Graph matrix
export const GRAPH_OBJECT = "GRAPH_OBJECT";
//Graph cluster
export const GRAPH_CLUSTER = "GRAPH_CLUSTER";
//Hamming matrix
export const MATRIX_HAMMING = "MATRIX_HAMMING";
//Previouse graph
export const PREV_GRAPH = "PREV_GRAPH";
//Navigation
export const NAV_LOCATION = "NAV_LOCATION";
//Sequence
export const SEQ_DATA = "SEQ_DATA";
//Metadata
export const META_DATA = "META_DATA";
//Categorical map
export const METADATA_CATEGORICAL = "METADATA_CATEGORICAL";
//Exposure period
export const TIME_TREE_DATA = "TIME_TREE_DATA";
//Color LUT
export const COLOR_LUT = "COLOR_LUT";
//Demo dataset selection
export const SELECT_DEMO_DATA = "SELECT_DEMO_DATA";
//Selected Node
export const SELECTED_NODE = "SELECTED_NODE";

//Graph Settings
export const SETTING_METHOD = "SETTING_METHOD";
export const SETTING_LAYOUT = "SETTING_LAYOUT";
export const SETTING_IS_USER_REDRAW = "SETTING_IS_USER_REDRAW";
export const SETTING_EDGE_FILTER_CUTOFF = "SETTING_EDGE_FILTER_CUTOFF";
export const SETTING_IS_USER_FILTER_EDGES = "SETTING_IS_USER_FILTER_EDGES";
export const SETTING_CLUSTER_METHOD = "SETTING_CLUSTER_METHOD";
export const SETTING_IS_USER_CLUSTERING = "SETTING_IS_USER_CLUSTERING";
export const SETTING_IS_EDGE_SCALED = "SETTING_IS_EDGE_SCALED";
export const SETTING_EDGE_SCALE_FACTOR = "SETTING_EDGE_SCALE_FACTOR";
export const SETTING_IS_HIDE_EDGES = "SETTING_IS_HIDE_EDGES";
export const SETTING_EDGE_HIDE_CUTOFF = "SETTING_EDGE_HIDE_CUTOFF";
export const SETTING_COLOR_NODE_BY = "SETTING_COLOR_NODE_BY";
export const SETTING_EXPORT_FORMAT = "SETTING_EXPORT_FORMAT";
export const SETTING_IS_USER_DOWNLOADING = "SETTING_IS_USER_DOWNLOADING";
export const SETTING_TRANS_LOC_LEVEL = "SETTING_TRANS_LOC_LEVEL";
export const SETTING_TYPE_ANALYSIS = "SETTING_TYPE_ANALYSIS";
export const SETTING_CHART_SESSION = "SETTING_CHART_SESSION";
export const SETTING_IS_USER_LOAD_SESSION = "SETTING_IS_USER_LOAD_SESSION";

//Snp dist settings
export const DIST_DATA_TO_DISPLAY = "DIST_DATA_TO_DISPLAY";
export const DIST_DATA_COLUMN = "DIST_DATA_COLUMN";
export const DIST_DATA_COLUMN_LEVEL = "DIST_DATA_COLUMN_LEVEL";
export const DIST_CHART_ORIENTATION = "DIST_CHART_ORIENTATION";
export const DIST_CHART_TYPE = "DIST_CHART_TYPE";
export const DIST_IS_USER_GENERATE_MATRIX = "DIST_IS_USER_GENERATE_MATRIX";
export const DIST_EXPORT_FORMAT = "DIST_EXPORT_FORMAT";
export const DIST_IS_USER_DRAW = "DIST_IS_USER_DRAW";
export const DIST_IS_USER_EXPORT = "DIST_IS_USER_EXPORT";
export const DIST_CHART_SESSION = "DIST_CHART_SESSION";
export const DIST_IS_USER_LOAD_SESSION = "DIST_IS_USER_LOAD_SESSION";

//Demonstration dataset
export const DEMO = {
  demo1: {
    snps: "./data/demoFile/1/st78_snps_input.fa",
    metadata: "./data/demoFile/1/st78_metadata_input.csv",
    stayTimeline: null,
  },
  demo2: {
    snps: "./data/demoFile/2/seqtk_snps_input.fa",
    metadata: "./data/demoFile/2/seqtk_metadata_input.csv",
    stayTimeline: null,
  },
};

//Input files template
export const TEMPLATE = {
  snps: "./data/templateFile/snps_input.fa",
  metadata: "./data/templateFile/metadata_input.csv",
  stayTimeline: "./data/templateFile/patientStayTimeline_input.csv",
};
