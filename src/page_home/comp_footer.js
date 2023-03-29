import { Button, Col, Modal, Row } from "antd";
import React from "react";
import compatibleBrowsers from "../img/compatibleBrowsers.png";
import { graphSNP_desc } from "./util_home";

const TextLink = (props) => {
  return (
    <a href={props.link} target="_blank" rel="noopener noreferrer">
      {props.text}
    </a>
  );
};

const FooterComponent = () => {
  const toolInfo = () => {
    Modal.info({
      title: "GraphSNP v1.0",
      content: (
        <div style={{ overflowX: "auto" }}>
          <p>Budi Permana</p>
          <p>Built using:</p>
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
                Ant design charts and UI
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
              Redux, bio-parsers, graphlib-dot, hamming, kruskal-mst, lodash,
              moment, ve-sequence-utils.
            </li>
          </ul>
        </div>
      ),
      onOk() {},
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Col id="home-footer-hanging">
          Compatible desktop browsers:
          <br></br>
          <img
            src={compatibleBrowsers}
            height={40}
            alt="Compatible desktop browsers"></img>
        </Col>

        <Col id="home-footer">
          <Button
            onClick={toolInfo}
            style={{
              fontWeight: "Bold",
              color: "#1E90FF",
              border: "None",
              padding: "0px",
            }}>
            GraphSNP v1.0
          </Button>
          <p>
            <b>{graphSNP_desc}</b>
            <br /> Developed by
            <TextLink
              text={" Budi Permana "}
              link={"https://nalarbp.github.io"}
            />
            at
            <TextLink text={" Beatson Lab "} link={"https://beatsonlab.com/"} />
            <br />
            <TextLink
              text={"The University of Queensland"}
              link={"https://www.uq.edu.au/"}
            />
          </p>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FooterComponent;
