import React, { useEffect, useRef, useState } from "react";
import { Empty, Spin } from "antd";
import cytoscape from "cytoscape";
import { LoadingOutlined } from "@ant-design/icons";
import { generateCytoscapeGraph } from "../utils/utils";

const loadingIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

const GraphContainer = (props) => {
  //Settings/state
  const layout = props.graphSettings.layout;
  const cytoscapeRef = useRef(null);

  const [graphIsReady, setGraphIsReady] = useState(true);
  const [isProcessingGraph, setIsProcessingGraph] = useState(false);
  const graphCytoscapeRef = useRef();
  const graphEmptyRef = useRef();
  const graphProcessingRef = useRef();
  const graphData = generateCytoscapeGraph(
    props.sequence,
    props.collectionDates,
    props.exposurePeriod,
    props.graphSettings
  );

  useEffect(() => {
    draw();
  }, [props.sequence]);

  //DRAW
  function draw() {
    //clean previous drawing artifacts
    const graph_layout = { name: layout, animate: false, fit: true };
    if (graphData) {
      const cy = cytoscape({
        elements: graphData,
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
      cy.selectionType("single");
      cy.layout(graph_layout).run();

      //save current Ref
      cytoscapeRef.current = cy;
    }
  }

  return (
    <React.Fragment>
      <div
        id="processing-graph"
        style={{ display: isProcessingGraph ? "block" : " none" }}
        ref={graphProcessingRef}
      >
        <Spin
          indicator={loadingIcon}
          style={{ fontSize: "10pt", color: "black" }}
          size="small"
        />
      </div>

      <div
        id="graph-empty"
        style={{ display: graphIsReady ? "none" : " block" }}
        ref={graphEmptyRef}
      >
        <Empty
          description={"No graph: click draw graph to create one"}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
      <div
        id="cytoscape-canvas"
        style={{ display: graphIsReady ? "block" : "none" }}
        ref={graphCytoscapeRef}
      ></div>
    </React.Fragment>
  );
};

export default GraphContainer;
