/*
- Comp init => render => all useEffect
- loading wont work using states, use indicator on draw button instead
- All useEffect called when first loaded (eg: from Home to graphSNP page)
- certain useEffect called when any deppendent useEffect affected
*/
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { colorLUTtoStore } from "../action/colorActions";
import { Col, Empty, message } from "antd";
import { createGraphObject } from "../utils/create_graphObject";
import { createCytoscapeData } from "../utils/create_cyData";
import { createClusterCSVFile } from "../utils/create_exportFile";
import { findClusters } from "../utils//find_clusters";
import cytoscape from "cytoscape";
import cy_svg from "cytoscape-svg";
import { LoadingOutlined } from "@ant-design/icons";
import {
  createColorLUT,
  getColorByColorIndex,
  getEdgeAndArrowWidth,
  downloadFileAsText,
} from "../utils/utils";
import HammingMatrix from "../model/hammingMatrix_prop";
import {
  hmmMatrixToStore,
  graphObjectToStore,
  graphClusterToStore,
} from "../action/graphMatrixActions";
import {
  changeIsUserReDrawSetting,
  changeIsUserClusteringSetting,
  changeIsUserDownloadingSetting,
} from "../action/graphSettingsActions";

const _ = require("lodash");
const fcose = require("cytoscape-fcose");
const spread = require("cytoscape-spread");
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
  const graph_edgeFilterCutoff = props.graphSettings.edgeFilterCutoff;
  const graph_clusterMethod = props.graphSettings.clusterMethod;
  const graph_isUserClustering = props.graphSettings.isUserClustering;
  const graph_isEdgesHideByCutoff = props.graphSettings.isHideEdgesByCutoff;
  const graph_edgesHideCutoff = props.graphSettings.hiddenEdgesCutoff;
  const graph_colorNodeBy = props.graphSettings.colorNodedBy;
  const graph_isEdgeScaled = props.graphSettings.isEdgeScaled;
  const graph_edgeScaleFactor = props.graphSettings.edgeScaleFactor;
  const graph_isUserDownloading = props.graphSettings.isUserDownloading;
  const trans_locLevel = props.graphSettings.transIncludeLocLevel;

  //Internal setting
  const cy_layout = { name: graph_layout, animate: false, fit: true };
  const cytoscapeRef = useRef(null);

  useEffect(() => {
    if (graph_isUserReDraw) {
      setProcessingGraph(true);
      setTimeout(function () {
        draw();
        setGraphIsAvailable(true);
        setProcessingGraph(false);
        props.changeIsUserReDrawSetting(false);
      }, 100);
    }
  }, [graph_isUserReDraw]);

  useEffect(() => {
    if (graph_isUserDownloading) {
      let cy = cytoscapeRef.current;
      let svgContent = cy.svg({ scale: 1, full: true });
      downloadFileAsText("GraphSNP-cytoscape-svg.svg", svgContent);
      props.changeIsUserDownloadingSetting(false);
    }
  }, [graph_isUserDownloading]);

  useEffect(() => {
    if (graph_isUserClustering && props.graphObject) {
      setProcessingGraph(true);
      setTimeout(function () {
        //call clustering
        let clusters = findClusters(props.graphObject, graph_clusterMethod);
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
    if (graph_layout && cytoscapeRef.current) {
      let cy = cytoscapeRef.current;
      let layout = {
        name: graph_layout,
        animate: false,
        fit: true,
        prelayout: false,
      };
      cy.layout(layout).run();
      cytoscapeRef.current = cy;
    }
  }, [graph_layout]);

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
                let res = edgeWeight <= graph_edgesHideCutoff ? 0 : 1;
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

  //DRAW
  function draw() {
    //check hamming distance ? if not create one, send to store at the end.
    const hammingMatrix = !props.hammMatrix
      ? new HammingMatrix(props.sequence).getHammingMatrix()
      : props.hammMatrix;

    //Look at param (method, seq, ), generate graph object: util functions
    //graphObject: {type:'mcg', mapData: edgeList object}
    const graphObject = createGraphObject(
      hammingMatrix,
      graph_method,
      graph_edgeFilterCutoff,
      props.categoricalMap,
      props.patientMovement,
      props.metadata,
      trans_locLevel
    );

    //generate cytoscape data
    //graphObject = [{data:{id:id, nodeType:'singleton', data:[]}}, { data: {source: s, target: t, weight: w} } ]
    const cytoscapeData = createCytoscapeData(graphObject);

    //Load and view cytoscape
    if (cytoscapeData) {
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
              label: "data(id)",
              "border-width": 3,
              "border-style": "solid",
              "border-color": "black",
              "background-color": "lightgray",
            },
          },
          {
            selector: "edge",
            style: {
              opacity: function (o) {
                let edgeWeight = o.data("weight");
                //console.log(edgeWeight);
                if (graph_isEdgesHideByCutoff) {
                  let res = edgeWeight <= graph_edgesHideCutoff ? 0 : 1;
                  return res;
                } else {
                  return 1;
                }
              },
              label: "data(weight)",
              "font-size": "10px",
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
              "border-width": "5",
              "border-color": "red",
              "border-style": "dashed",
              padding: "8px",
            },
          },
        ],
      });
      cy.layout(cy_layout).run();
      //save current Ref
      cytoscapeRef.current = cy;

      //==== SEND TO STORE ====
      if (props.hammMatrix) {
        props.hmmMatrixToStore(hammingMatrix);
      }
      props.graphObjectToStore(graphObject);
    }
  }

  return (
    <React.Fragment>
      <Col span={24} style={{ position: "relative" }}>
        <div
          id="graph-cont-is-empty"
          style={{ display: graphIsAvailable ? "none" : "block" }}
        >
          <Empty
            description={"No previous graph found: click draw to create one"}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
        <div
          id="graph-cont-is-processing"
          style={{ display: processingGraph ? "block" : "none" }}
        >
          <p>
            <span>
              <LoadingOutlined
                style={{
                  fontSize: 18,
                }}
                spin
              />
            </span>{" "}
            Processing ...
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
    patientMovement: state.patientMovement,
    sequence: state.sequence,
    graphObject: state.graphObject,
    hammMatrix: state.hammMatrix,
    graphSettings: state.graphSettings,
    colorLUT: state.colorLUT,
    graphClusters: state.graphClusters,
    categoricalMap: state.categoricalMap,
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
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
/*

*/
