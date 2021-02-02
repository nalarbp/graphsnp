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
            GraphSNP v.0.1
          </a>
          <br />
          <b>
            {" "}
            Graph-based outbreak cluster and transmission
            <br /> detection and visualization using single-nucleotide
            polymorphisms (SNPs) in web browser
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
          <br /> {new Date().getFullYear()}
        </p>
      </Col>
    </Row>
  );
};

export default FooterComponent;
