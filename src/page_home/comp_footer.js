import { Row, Col } from "antd";
import "./style_home.css";
const FooterComponent = (props) => {
  return (
    <Row>
      <Col sm={24} id="footer-component">
        <p>
          <a
            href="https://graphsnp.beatsonlab.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>GraphSNP v1.0</b>
          </a>
          <br />
          <b>
            {" "}
            Graph-based, drag and drop web visualization tool for <br />
            cluster and transmission analysis using pairwise SNP-distance.
          </b>
          <br /> Developed by Budi Permana at{" "}
          <a
            href="https://beatsonlab.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
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
// <br /> {new Date().getFullYear()}
