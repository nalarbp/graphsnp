import { Row, Col, Divider } from "antd";
import "./style_home.css";
const FooterComponent = (props) => {
  return (
    <Row>
      <Col sm={24} id="footer-component">
        <p>
          <a
            href="https://haiviz.beatsonlab.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GraphSNP v.0.1
          </a>
          | {new Date().getFullYear()}
          <br /> Developed by Budi Permana at{" "}
          <a
            href="https://beatsonlab.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Beatson Lab
          </a>
          <br />{" "}
          <a
            href="https://www.uq.edu.au/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The University of Queensland
          </a>{" "}
          | Australia
        </p>
      </Col>
    </Row>
  );
};

export default FooterComponent;
