import React from "react";
import { Typography, Divider } from "antd";
import "./style_documentation.css";

const { Title, Text } = Typography;

const Extra = (props) => {
  return (
    <React.Fragment>
      <div className="graphsnp-docs-content">
        <Title level={2} underline>
          Browser compatibility{" "}
        </Title>
        GraphSNP was boostrapped using Create React App (CRA) tool and so it
        works on majority of modern browsers. Except Internet Explorer (IE),
        GraphSNP was tested and compatible on the following desktop browsers:
        <ul>
          <li> Microsoft Edge </li>
          <li> Safari</li>
          <li> Chrome</li>
          <li> Firefox</li>
          <li> Opera</li>
        </ul>
        <Title level={3}>Core libraries</Title>
        <Text>
          Thanks to all the frameworks and libraries run on the background,
          GraphSNP is now up and running and available worldwide. These are some
          of key frameworks and libraries used by GraphSNP:
          <ul>
            <li>
              <a
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React.js
              </a>
            </li>
            <li>
              <a
                href="https://d3js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Data-Driven Documents (D3.js)
              </a>
            </li>
            <li>
              <a
                href="https://ant.design/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ant design UI
              </a>
            </li>
            <li>
              <a
                href="https://js.cytoscape.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cytoscape
              </a>
            </li>
            <li>
              Create React App, cytoscape-svg, dotparser, export-to-csv, lodash,
              moment, moment-range, react-color, react-faux-dom, react-measure,
              react-player, redux, react router etc.
            </li>
          </ul>
        </Text>
        <Title level={3}>Have any questions? </Title>
        <Text>
          Please feel free to send it to my email:{" "}
          <span style={{ weight: "bold", color: "blue" }}>
            b.permana@uq.edu.au
          </span>
        </Text>
        <Title level={2} underline>
          Cite us{" "}
        </Title>
        <Text>
          If you use GraphSNP in your publication, please cite our web
          application: GraphSNP:https://graphsnp.beatsonlab.com and CATHAI:
          https://cathai.fordelab.com/cathai/
        </Text>
        <Divider />
      </div>
    </React.Fragment>
  );
};

export default Extra;
