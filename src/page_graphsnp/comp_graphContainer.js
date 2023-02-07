/*
- Comp init => render => all useEffect
- loading wont work using states, use indicator on draw button instead
- All useEffect called when first loaded (eg: from Home to graphSNP page)
- certain useEffect called when any deppendent useEffect affected
*/
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Empty, message } from "antd";
import cytoscape from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";
import cy_svg from "cytoscape-svg";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { colorLUTtoStore } from "../action/colorActions";
import {
  graphClusterToStore,
  graphObjectToStore,
  hmmMatrixToStore,
} from "../action/graphMatrixActions";
import {
  changeChartSessionSetting,
  changeIsUserClusteringSetting,
  changeIsUserDownloadingSetting,
  changeIsUserLoadSessionSetting,
  changeIsUserReDrawSetting,
  changeIsUserRelayoutSetting,
  changeSelectedNode,
} from "../action/graphSettingsActions";
import isShowingLoadingModalToStore from "../action/isShowingLoadingModalActions";
import HammingMatrix from "../model/hammingMatrix_prop";
import { findClusters } from "../utils//find_clusters";
import { createCytoscapeData } from "../utils/create_cyData";
import { createGraphObject } from "../utils/create_graphObject";
import {
  createColorLUT,
  downloadFileAsText,
  getColorByColorIndex,
  getEdgeAndArrowWidth,
} from "../utils/utils";

const _ = require("lodash");
const fcose = require("cytoscape-fcose");
const spread = require("cytoscape-spread");

cytoscape.use(coseBilkent); // register extension
cytoscape.use(fcose); // register extension
cytoscape.use(spread); // register extension
cytoscape.use(cy_svg); // register extension

const GraphContainer = (props) => {
  //state
  const [graphIsAvailable, setGraphIsAvailable] = useState(false);
  const [processingGraph, setProcessingGraph] = useState(false);

  //Settings
  const graph_method = props.graphSettings.method;
  const graph_layout = props.graphSettings.layout;
  const graph_isUserReDraw = props.graphSettings.isUserReDraw;
  const graph_isUserFilterEdges = props.graphSettings.isUserFilteringEdge;
  const graph_edgeFilterCutoff = graph_isUserFilterEdges
    ? props.graphSettings.edgeFilterCutoff
    : null;
  const graph_clusterMethod = props.graphSettings.clusterMethod;
  const graph_isUserClustering = props.graphSettings.isUserClustering;
  const graph_isEdgesHideByCutoff = props.graphSettings.isHideEdgesByCutoff;
  const graph_edgesHideCutoff = props.graphSettings.hiddenEdgesCutoff;
  const graph_colorNodeBy = props.graphSettings.colorNodedBy;
  const graph_isEdgeScaled = props.graphSettings.isEdgeScaled;
  const graph_edgeScaleFactor = props.graphSettings.edgeScaleFactor;
  const graph_isUserDownloading = props.graphSettings.isUserDownloading;
  const graph_isUserRelayout = props.graphSettings.isUserRelayout;
  const graph_node_isLabelShown = props.graphSettings.node_isLabelShown;
  const graph_edge_labelSize = props.graphSettings.edge_labelSize;
  const graph_node_size = props.graphSettings.node_size;
  const graph_exportFormat = props.graphSettings.exportFormat;

  //Internal setting
  const cy_layout = { name: graph_layout, animate: false, fit: true };
  const cytoscapeRef = useRef(null);
  const prevSessionData = props.graphSettings.chartSession;
  const isUserReloadSession = props.graphSettings.isUserReloadSession;

  //Cytoscape default settings
  const node_size = 6;
  const node_size_margin = 1;
  const node_label_size = "6px";

  //Automatic reloading if previous graph session data is a available
  useEffect(() => {
    if (graph_isUserReDraw) {
      //console.log("1. START: user click draw ##", +new Date());
      //setProcessingGraph(true); // set time out to delay drawing and let processing graph state run
      setTimeout(function () {
        //console.log("2. setTimeout start and draw start ##", +new Date());
        draw();
        //console.log("8. Draw end in setTimeout ##", +new Date());
        setGraphIsAvailable(true);
        //setProcessingGraph(false);
        props.changeIsUserReDrawSetting(false);
        props.isShowingLoadingModalToStore(false);
        //console.log("9. SetTimeout end ##", +new Date());
      }, 100);
    }
  }, [graph_isUserReDraw]);

  useEffect(() => {
    if (isUserReloadSession) {
      //setProcessingGraph(true);
      setTimeout(() => {
        redraw();
        setGraphIsAvailable(true);
        //setProcessingGraph(false);
        props.changeIsUserLoadSessionSetting(false);
        props.isShowingLoadingModalToStore(false);
      }, 100);
    }
  }, [isUserReloadSession]);

  useEffect(() => {
    if (graph_isUserDownloading) {
      let cy = cytoscapeRef.current;
      if (graph_exportFormat === "svg") {
        let svgContent = cy.svg({ scale: 1, full: true });
        downloadFileAsText("graph.svg", svgContent);
        props.changeIsUserDownloadingSetting(false);
      }
      if (graph_exportFormat === "png") {
        var png = cy.png();
        var link = document.createElement("a");
        link.download = "graph.png";
        link.href = png;
        link.click();
        props.changeIsUserDownloadingSetting(false);
      }
    }
  }, [graph_isUserDownloading]);

  useEffect(() => {
    if (graph_isUserClustering && props.graphObject) {
      setProcessingGraph(true);
      setTimeout(function () {
        //call clustering
        let clusters = findClusters(props.graphObject, graph_clusterMethod);
        //console.log(props.graphObject);
        setProcessingGraph(false);
        message.success(
          `Found ${clusters.group.length} clusters in the graph`,
          2
        );
        //update colorLUT by new clusters color
        let colorLUT_byCluster = createColorLUT(clusters.members, "clusterID");
        let newColorLUT = _.cloneDeep(props.colorLUT);
        if (newColorLUT) {
          let updated_newColorLUT = {
            ...newColorLUT,
            clusterID: colorLUT_byCluster,
          };
          newColorLUT = updated_newColorLUT;
        } else {
          newColorLUT = { clusterID: colorLUT_byCluster };
        }
        props.colorLUTtoStore(newColorLUT);

        props.graphClusterToStore(clusters);
        props.changeIsUserClusteringSetting(false);
      }, 100);
    }
  }, [graph_clusterMethod, graph_isUserClustering]);

  useEffect(() => {
    if (graph_isUserRelayout && cytoscapeRef.current) {
      setTimeout(() => {
        let cy = cytoscapeRef.current;
        let layout = {
          name: graph_layout,
          animate: false,
          fit: true,
          prelayout: false,
        };
        cy.layout(layout).run();
        cytoscapeRef.current = cy;
        props.isShowingLoadingModalToStore(false);
        props.changeIsUserRelayoutSetting(false);
      }, 100);
    }
  }, [graph_isUserRelayout]);

  useEffect(() => {
    if (props.graphObject && cytoscapeRef.current) {
      let cy = cytoscapeRef.current;
      if (graph_isEdgeScaled) {
        cy.style()
          .selector("edge")
          .style({
            width: function (e) {
              return getEdgeAndArrowWidth(
                graph_isEdgeScaled,
                e.data("weight"),
                graph_edgeScaleFactor,
                "edge"
              );
            },
            "arrow-scale": function (e) {
              return getEdgeAndArrowWidth(
                graph_isEdgeScaled,
                e.data("weight"),
                graph_edgeScaleFactor,
                "arrow"
              );
            },
          })
          .update();
        cytoscapeRef.current = cy;
      } else {
        cy.style()
          .selector("edge")
          .style({
            width: 3,
            "arrow-scale": 1,
          })
          .update();
        cytoscapeRef.current = cy;
      }
    }
  }, [graph_isEdgeScaled, graph_edgeScaleFactor]);

  useEffect(() => {
    if (props.graphObject && cytoscapeRef.current) {
      let cy = cytoscapeRef.current;
      if (graph_isEdgesHideByCutoff) {
        cy.style()
          .selector("edge")
          .style({
            opacity: function (o) {
              let edgeWeight = o.data("weight");
              if (graph_isEdgesHideByCutoff) {
                let res =
                  edgeWeight < graph_edgesHideCutoff.min ||
                  edgeWeight > graph_edgesHideCutoff.max
                    ? 0
                    : 1;
                return res;
              } else {
                return 1;
              }
            },
          })
          .update();
        cytoscapeRef.current = cy;
      } else {
        cy.style()
          .selector("edge")
          .style({
            opacity: 1,
          })
          .update();
        cytoscapeRef.current = cy;
      }
      cytoscapeRef.current = cy;
    }
  }, [graph_isEdgesHideByCutoff, graph_edgesHideCutoff]);

  useEffect(() => {
    if (graph_colorNodeBy && props.colorLUT && cytoscapeRef.current) {
      let cy = cytoscapeRef.current;
      cy.style()
        .selector("node")
        .style({
          "background-color": function (d) {
            let isolate_name = d.data("id");
            let col = getColorByColorIndex(
              isolate_name,
              graph_colorNodeBy,
              props.colorLUT
            );
            return col;
          },
        })
        .update();

      cytoscapeRef.current = cy;
    }
  }, [graph_colorNodeBy, props.colorLUT]);

  useEffect(() => {
    if (cytoscapeRef.current) {
      let cy = cytoscapeRef.current;
      if (graph_node_isLabelShown) {
        cy.style()
          .selector("node")
          .style({ "font-size": node_label_size })
          .update();
      } else {
        cy.style().selector("node").style({ "font-size": "0px" }).update();
      }
      cytoscapeRef.current = cy;
    }
  }, [graph_node_isLabelShown]);

  useEffect(() => {
    if (cytoscapeRef.current) {
      let cy = cytoscapeRef.current;
      cy.style()
        .selector("edge")
        .style({ "font-size": String(graph_edge_labelSize) + "px" })
        .update();
      cytoscapeRef.current = cy;
    }
  }, [graph_edge_labelSize]);

  useEffect(() => {
    if (cytoscapeRef.current) {
      let cy = cytoscapeRef.current;
      cy.style()
        .selector("node")
        .style({
          width: String(graph_node_size) + "px",
          height: String(graph_node_size) + "px",
        })
        .update();
      cytoscapeRef.current = cy;
    }
  }, [graph_node_size]);

  useEffect(() => {
    if (props.selectedNode && cytoscapeRef.current) {
      let cy = cytoscapeRef.current;
      if (props.selectedNode.length >= 1) {
        props.selectedNode.forEach((n) => {
          cy.filter(`node[id = "${n}"]`).select();
        });
      } else {
        cy.filter("node").unselect();
      }

      cytoscapeRef.current = cy;
    }
  }, [props.selectedNode]);

  const reloadChartHandler = (val) => {
    if (!isUserReloadSession) {
      props.isShowingLoadingModalToStore(true);
      props.changeIsUserLoadSessionSetting(true);
    }
  };

  //DRAW
  function draw() {
    console.time("draw MST");
    //console.log("drawww", props.selectedNode);
    //console.log("3. Start drawing, creating hammingMatrix ##", +new Date());
    //check hamming distance ? if not create one, send to store at the end.
    const hammingMatrix = !props.hammMatrix
      ? new HammingMatrix(props.sequence).getHammingMatrix()
      : props.hammMatrix;

    const seq_len = props.sequence ? props.sequence[0].size : null;

    //Look at param (method, seq, ), generate graph object: util functions
    //graphObject: {type:'mcg', mapData: edgeList object}
    //console.log("4. Creating graph object ##", +new Date());

    const graphObject = createGraphObject(
      hammingMatrix,
      graph_method,
      graph_edgeFilterCutoff,
      props.categoricalMap,
      props.metadata,
      seq_len
    );

    //generate cytoscape data
    if (graphObject && graphObject.nodes && graphObject.edges) {
      //cytoscapeData = [{data:{id:id, nodeType:'singleton', data:[]}}, { data: {source: s, target: t, weight: w} } ]
      //console.log("5. Creating cytoscape data ##", +new Date());
      const cytoscapeData = createCytoscapeData(graphObject);

      //Load and view cytoscape
      if (cytoscapeData) {
        //console.log("6. Cytoscape data mapping ##", +new Date());
        if (prevSessionData) {
          let cy = prevSessionData;
          cy.unmount();
        }

        const cy = cytoscape({
          elements: cytoscapeData,
          container: document.getElementById("graph-cont-cytoscape-canvas"),
          pannable: true,
          selected: true,
          boxSelectionEnabled: false,
          style: [
            {
              selector: "node",
              style: {
                shape: graph_method === "mscg" ? "round-rectangle" : "circle",
                width: function (d) {
                  let nodeData = d.data("data");
                  if (nodeData && nodeData.size) {
                    return (node_size + node_size_margin) * nodeData.size;
                  } else {
                    return node_size;
                  }
                },
                height: function (d) {
                  let nodeData = d.data("data");
                  if (nodeData && nodeData.size) {
                    return (node_size + node_size_margin) * nodeData.size;
                  } else {
                    return node_size;
                  }
                },
                label: "data(id)",
                "text-wrap": "none",
                "text-valign": function (d) {
                  let nodeData = d.data("data");
                  if (nodeData && nodeData.size) {
                    return "center";
                  } else {
                    return "top";
                  }
                },
                "font-size": node_label_size,
                "border-width": 1,
                "border-style": "solid",
                "border-color": "black",
                "background-color": function (d) {
                  if (graph_colorNodeBy && props.colorLUT) {
                    let isolate_name = d.data("id");
                    let col = getColorByColorIndex(
                      isolate_name,
                      graph_colorNodeBy,
                      props.colorLUT
                    );
                    return col;
                  } else {
                    return "lightgray";
                  }
                },
              },
            },
            {
              selector: ":parent",
              shape: "round-rectangle",
              style: {
                "background-image": "none",
                "padding-top": "5px",
                "background-position-x": "0",
                "background-position-y": "0",
                "background-width": "100%",
                "background-height": "100%",
                "background-fit": "contain",
                "background-opacity": "0",
                "border-width": "1",
                "text-valign": "top",
                "text-halign": "center",
              },
            },
            {
              selector: "edge",
              style: {
                opacity: function (o) {
                  let edgeWeight = o.data("weight");
                  //console.log(edgeWeight);
                  if (graph_isEdgesHideByCutoff) {
                    let res =
                      edgeWeight < graph_edgesHideCutoff.min ||
                      edgeWeight > graph_edgesHideCutoff.max
                        ? 0
                        : 1;
                    return res;
                  } else {
                    return 1;
                  }
                },
                label: "data(weight)",
                "font-size": String(graph_edge_labelSize) + "px",
                "text-background-color": "#F5E372",
                color: "red",
                width: function (e) {
                  return getEdgeAndArrowWidth(
                    graph_isEdgeScaled,
                    e.data("weight"),
                    graph_edgeScaleFactor,
                    "edge"
                  );
                },
                "target-arrow-color": "black",
                "target-arrow-shape": (e) => {
                  return e.data("dir") === "forward" ? "triangle" : "none";
                },
                "curve-style": "bezier",
                "arrow-scale": function (e) {
                  return getEdgeAndArrowWidth(
                    graph_isEdgeScaled,
                    e.data("weight"),
                    graph_edgeScaleFactor,
                    "arrow"
                  );
                },
              },
            },
            {
              selector: ":selected",
              style: {
                "border-width": 2,
                "border-color": "red",
                "border-style": "double",
              },
            },
          ],
        });

        if (graph_layout === "spread") {
          let diverted_layout = {
            name: "cose",
            animate: false,
            fit: true,
            prelayout: false,
          };

          cy.layout(diverted_layout).run();
        } else {
          //console.log("7. Cytoscape running with layout ##", +new Date());
          cy.layout(cy_layout).run();
        }
        //node event click listener
        cy.selectionType("single");
        cy.nodes().bind("tap", function (evt) {
          let nodeData = evt.target.data("data");
          let nodeId =
            nodeData && nodeData.size
              ? nodeData.contents
              : [evt.target.data("id")]; //always return arr
          let prev_selected_nodes = cy
            .elements("node:selected")
            .map((d) => (d ? d.id() : null)); // always return empty arr or with id(s)
          //let current_selected_nodes = prev_selected_nodes.concat(nodeId);
          props.changeSelectedNode(nodeId);
        });
        //click on background listener
        cy.on("tap", function (evt) {
          if (evt.target === cy) {
            props.changeSelectedNode([]);
          }
        });
        //cy.layout(cy_layout).run();
        //save current Ref
        //save current Ref
        cytoscapeRef.current = cy;

        //==== SEND TO STORE ====
        if (props.hammMatrix) {
          props.hmmMatrixToStore(hammingMatrix);
        }
        props.graphObjectToStore(graphObject);
        props.changeChartSessionSetting(cy);
        console.timeEnd("draw MST");
      }
    }
  }
  function redraw() {
    let cy = prevSessionData;
    cy.unmount();
    cy.mount(document.getElementById("graph-cont-cytoscape-canvas"));
    cytoscapeRef.current = cy;
  }

  return (
    <React.Fragment>
      <Col span={24} style={{ position: "relative" }}>
        <div
          id="graph-cont-is-empty"
          style={{ display: graphIsAvailable ? "none" : "block" }}>
          <Empty
            description={
              prevSessionData ? "Reload previous graph" : "No graph. Create one"
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}>
            {prevSessionData && (
              <Button onClick={reloadChartHandler} type="primary">
                <ReloadOutlined />
              </Button>
            )}
          </Empty>
        </div>
        <div
          id="graph-cont-is-processing"
          style={{ display: processingGraph ? "block" : "none" }}>
          <p
            style={{
              textAlign: "right",
            }}>
            <span>
              <LoadingOutlined
                style={{
                  fontSize: 18,
                }}
                spin
              />
            </span>{" "}
            Creating graph ...
          </p>
        </div>
      </Col>
      <div id="graph-cont-cytoscape-canvas"></div>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    metadata: state.metadata,
    sequence: state.sequence,
    graphObject: state.graphObject,
    hammMatrix: state.hammMatrix,
    graphSettings: state.graphSettings,
    colorLUT: state.colorLUT,
    graphClusters: state.graphClusters,
    categoricalMap: state.categoricalMap,
    selectedNode: state.selectedNode,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeIsUserClusteringSetting,
      changeIsUserReDrawSetting,
      hmmMatrixToStore,
      graphObjectToStore,
      graphClusterToStore,
      colorLUTtoStore,
      changeIsUserDownloadingSetting,
      changeChartSessionSetting,
      changeIsUserLoadSessionSetting,
      changeSelectedNode,
      isShowingLoadingModalToStore,
      changeIsUserRelayoutSetting,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
/*
label: function (d) {
                  let nodeData = d.data("data");
                  if (nodeData && nodeData.size) {
                    let textLabel = nodeData.contents.join("\n");
                    return textLabel;
                  } else {
                    return d.data("id");
                  }
                },
*/
