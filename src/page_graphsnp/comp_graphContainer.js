/*
- Comp init => render => all useEffect
- loading wont work using states, use indicator on draw button instead
- All useEffect called when first loaded (eg: from Home to graphSNP page)
- certain useEffect called when any deppendent useEffect affected
*/
import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Empty } from "antd";
import { generateCytoscapeGraph } from "../utils/create_cyData";
import cytoscape from "cytoscape";
import { LoadingOutlined } from "@ant-design/icons";

const GraphContainer = (props) => {
  //state
  const [graphIsDrawn, setgraphIsDrawn] = useState(false);
  const [drawingGraph, setdrawingGraph] = useState(false);
  //Settings
  const layout = props.graphSettings.layout;
  const userDrawGraph = props.graphSettings.isUserReDraw;
  const edgeFilterCutoff = props.graphSettings.edgeFilterCutoff;
  const userFilterEdges = props.graphSettings.isUserFilterEdges;
  const clusterMethod = props.graphSettings.clusterMethod;
  const userDoClustering = props.graphSettings.isUserClustering;
  const cytoscapeRef = useRef(null);
  const prevGraph = props.prevGraph;

  useEffect(() => {
    if (userDrawGraph) {
      setdrawingGraph(true);
      setgraphIsDrawn(true);
      setTimeout(function () {
        draw();
        setdrawingGraph(false);
        props.changeIsUserReDrawSetting(false);
      }, 100);
    }
  }, [userDrawGraph]);

  useEffect(() => {
    if (layout && cytoscapeRef.current) {
      let cy = cytoscapeRef.current;
      let graph_layout = { name: layout, animate: false, fit: true };
      cy.layout(graph_layout).run();
      cytoscapeRef.current = cy;
    }
  }, [layout]);

  useEffect(() => {
    let cy = cytoscapeRef.current;
    if (cy && userFilterEdges) {
      let cy = cytoscapeRef.current;
      cy.remove(`edge[weight > ${edgeFilterCutoff}]`);
      let graph_layout = { name: layout, animate: false, fit: true };
      cy.layout(graph_layout).run();
      props.changeIsUserFilterEdgesSetting(false);
      cytoscapeRef.current = cy;
    }
  }, [edgeFilterCutoff, userFilterEdges]);

  useEffect(() => {
    if (!graphIsDrawn) {
      if (prevGraph) {
        setdrawingGraph(true);
        setgraphIsDrawn(true);
        setTimeout(function () {
          reload();
          setdrawingGraph(false);
        }, 1);
      }
    }
  }, [graphIsDrawn, prevGraph]);

  useEffect(() => {
    if (userDoClustering) {
      //do clustering
      let cy = cytoscapeRef.current;
      var clusters = cy.elements().markovCluster({
        attributes: [
          function (edge) {
            return edge.data("weight");
          },
        ],
      });
      console.log(clusters);
    }
  }, [clusterMethod, userDoClustering]);

  //DRAW
  function reload() {
    const graph_layout = { name: layout, animate: false, fit: true };
    if (prevGraph) {
      let cy = prevGraph;
      cy.mount(document.getElementById("cytoscape-canvas"));
      // const cy = cytoscape({
      //   elements: prevGraph.cytoscape,
      //   container: document.getElementById("cytoscape-canvas"),
      //   pannable: true,
      //   selected: true,
      //   boxSelectionEnabled: false,
      //   style: [
      //     {
      //       selector: "node",
      //       style: {
      //         label: "data(id)",
      //         "border-width": 3,
      //         "border-style": "solid",
      //         "border-color": "black",
      //       },
      //     },
      //     {
      //       selector: "edge",
      //       style: {
      //         label: "data(weight)",
      //         "font-size": "8px",
      //         "text-background-color": "#F5E372",
      //         color: "black",
      //         width: 3,
      //         "target-arrow-color": "black",
      //         "target-arrow-shape": (e) => {
      //           return e.data("dir") === "forward" ? "triangle" : "none";
      //         },
      //         "curve-style": "bezier",
      //       },
      //     },
      //     {
      //       selector: ":selected",
      //       style: {
      //         "border-width": "5",
      //         "border-color": "red",
      //         "border-style": "dashed",
      //         padding: "8px",
      //       },
      //     },
      //   ],
      // });
      cy.layout(graph_layout).run();
      //save current Ref
      cytoscapeRef.current = cy;
    }
  }
  function draw() {
    const graphData = generateCytoscapeGraph(
      props.sequence,
      props.collectionDates,
      props.exposurePeriod,
      props.graphSettings
    );
    //clean previous drawing artifacts
    const graph_layout = { name: layout, animate: false, fit: true };
    if (graphData && graphData.cytoscape) {
      const cy = cytoscape({
        elements: graphData.cytoscape,
        container: document.getElementById("cytoscape-canvas"),
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
      cy.layout(graph_layout).run();
      //save current Ref
      cytoscapeRef.current = cy;
      //send to matrix store
      props.graphMatrixToStore({
        type: graphData.method,
        data: graphData.distanceMatrix,
      });
      props.prevGraphToStore(cy);
    }
  }

  return (
    <React.Fragment>
      <Col span={24}>
        <div
          id="loading-graph"
          style={{ display: drawingGraph ? "block" : " none" }}
        >
          <p>Loading graph ... </p>
          <LoadingOutlined
            style={{
              fontSize: 18,
            }}
            spin
          />
        </div>
      </Col>

      <div
        id="graph-empty"
        style={{ display: graphIsDrawn ? "none" : " block" }}
      >
        <Empty
          description={"No previous graph found: click draw to create one"}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>

      <div id="cytoscape-canvas"></div>
    </React.Fragment>
  );
};

export default GraphContainer;
/*

*/
