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
import { findClusters } from "../utils//find_clusters";
import cytoscape from "cytoscape";
import { LoadingOutlined } from "@ant-design/icons";
import { createColorLUT, getColorByColorIndex } from "../utils/utils";
import HammingMatrix from "../model/hammingMatrix_prop";
import {
  hmmMatrixToStore,
  graphObjectToStore,
  graphClusterToStore,
} from "../action/graphMatrixActions";
import {
  changeIsUserReDrawSetting,
  changeIsUserClusteringSetting,
} from "../action/graphSettingsActions";

const _ = require("lodash");

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
  const graph_colorNodeBy = props.graphSettings.colorNodedBy;
  //const graph_exportFormat = props.graphSettings.exportFormat;
  //const graph_isUserDownloading = props.graphSettings.isUserDownloading;

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
      let layout = { name: graph_layout, animate: false, fit: true };
      cy.layout(layout).run();
      cytoscapeRef.current = cy;
    }
  }, [graph_layout]);

  useEffect(() => {
    if (graph_colorNodeBy && props.colorLUT && cytoscapeRef.current) {
      let cy = cytoscapeRef.current;
      //console.log(graph_colorNodeBy, props.colorLUT);
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
            //console.log(props.colorLUT[graph_colorNodeBy]);
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
      props.metadata,
      props.phyloTimeTree
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
              label: "data(weight)",
              "font-size": "8px",
              "text-background-color": "#F5E372",
              color: "black",
              width: 3,
              "target-arrow-color": "black",
              "target-arrow-shape": (e) => {
                return e.data("dir") === "forward" ? "triangle" : "none";
              },
              "curve-style": "bezier",
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
    phyloTimeTree: state.phyloTimeTree,
    sequence: state.sequence,
    graphObject: state.graphObject,
    hammMatrix: state.hammMatrix,
    graphSettings: state.graphSettings,
    colorLUT: state.colorLUT,
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
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
/*

*/
