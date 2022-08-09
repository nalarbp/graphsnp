import { Row, Col } from "antd";
import { graphSNP_desc } from "./util_home";

const TextLink = (props) => {
  return (
    <a href={props.link} target="_blank" rel="noopener noreferrer">
      {props.text}
    </a>
  );
};

const FooterComponent = () => {
  return (
    <Row>
      <Col id="home-footer">
        <p>
          <b>
            <TextLink
              text={"GraphSNP v1.0"}
              link={"https://github.com/nalarbp/graphsnp"}
            />
          </b>
          <br />
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
  );
};

export default FooterComponent;
