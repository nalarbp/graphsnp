import { Divider, Typography } from "antd";
import React from "react";
import "./style_documentation.css";

const { Title, Text } = Typography;

const Extra = (props) => {
  return (
    <React.Fragment>
      <div className="graphsnp-docs-content">
        <Title level={2} underline>
          Browser compatibility{" "}
        </Title>
        GraphSNP was boostrapped using Create React App (CRA) tool and works on
        majority of modern browsers. GraphSNP was tested and compatible on the
        following browsers:
        <ul>
          <li> Microsoft Edge </li>
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
                rel="noopener noreferrer">
                React.js
              </a>
            </li>
            <li>
              <a
                href="https://d3js.org/"
                target="_blank"
                rel="noopener noreferrer">
                Data-Driven Documents (D3.js)
              </a>
            </li>
            <li>
              <a
                href="https://ant.design/"
                target="_blank"
                rel="noopener noreferrer">
                Ant design UI
              </a>
            </li>
            <li>
              <a
                href="https://js.cytoscape.org/"
                target="_blank"
                rel="noopener noreferrer">
                Cytoscape
              </a>
            </li>
            <li>
              Redux, bio-parsers, graphlib-dot, kruskal-mst, lodash, moment.
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
          Related publications{" "}
        </Title>
        <Text>
          <ul>
            <li>
              {" "}
              GraphSNP (available soon). In the meantime, please cite this
              website: https://graphsnp.beatsonlab.com{" "}
            </li>
            <li>
              {" "}
              <a
                href="https://academic.oup.com/bioinformaticsadvances/article/2/1/vbac040/6594149"
                target="_blank"
                rel="noopener noreferrer">
                CATHAI: cluster analysis tool for healthcare-associated
                infections
              </a>{" "}
            </li>
          </ul>
        </Text>
        <Divider />
      </div>
    </React.Fragment>
  );
};

export default Extra;
