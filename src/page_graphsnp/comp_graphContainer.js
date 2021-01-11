/*
- Comp init => render => all useEffect
- loading wont work using states, use indicator on draw button instead
- All useEffect called when first loaded (eg: from Home to graphSNP page)
- certain useEffect called when any deppendent useEffect affected
*/
import React, { useEffect, useRef, useState } from "react";
import { Empty } from "antd";
import { generateCytoscapeGraph } from "../utils/utils";
import cytoscape from "cytoscape";

const GraphContainer = (props) => {
  //state
  const [graphIsDrawn, setgraphIsDrawn] = useState(false);
  //Settings
  const layout = props.graphSettings.layout;
  const userDrawGraph = props.graphSettings.isUserReDraw;
  const userFilterEdges = props.graphSettings.isUserFilterEdges;
  const cytoscapeRef = useRef(null);

  useEffect(() => {
    if (userDrawGraph) {
      draw();
      setgraphIsDrawn(true);
      props.changeIsUserReDrawSetting(false);
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
    if (cy && userFilterEdges.status && userFilterEdges.cutoff > 0) {
      let cy = cytoscapeRef.current;
      cy.remove(`edge[weight > ${userFilterEdges.cutoff}]`);
      let graph_layout = { name: layout, animate: false, fit: true };
      cy.layout(graph_layout).run();
      props.changeIsUserFilterEdgesSetting({
        status: false,
        cutoff: userFilterEdges.cutoff,
      });
      //cytoscapeRef.current = cy;
    }
  }, [userFilterEdges]);

  //DRAW
  function draw() {
    const graphData = generateCytoscapeGraph(
      props.sequence,
      props.collectionDates,
      props.exposurePeriod,
      props.graphSettings
    );
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
      cy.layout(graph_layout).run();
      //save current Ref
      cytoscapeRef.current = cy;
      //setIsProcessingGraph(false);
    }
  }

  return (
    <React.Fragment>
      <div
        id="graph-empty"
        style={{ display: graphIsDrawn ? "none" : " block" }}
      >
        <Empty
          description={"No graph: click load previous graph or draw new graph"}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
      <div
        id="cytoscape-canvas"
        style={{ display: graphIsDrawn ? "block" : " none" }}
      ></div>
    </React.Fragment>
  );
};

export default GraphContainer;
/*

*/
