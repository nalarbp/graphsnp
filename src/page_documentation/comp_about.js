import React from "react";
import { Typography, Divider } from "antd";
import { Link } from "react-router-dom";
import "./style_documentation.css";

const { Title, Text } = Typography;

const About = (props) => {
  return (
    <React.Fragment>
      <div className="graphsnp-docs-content">
        <Title level={2} underline>
          {" "}
          GraphSNP: What is it?{" "}
        </Title>
        <Text>
          GraphSNP is a web-based application to create and visualise network of
          pairwise SNP distances for outbreak cluster and transmission analysis.
          It is a client-side and standalone version of integrated cluster
          analysis platform CATHAI: Cluster Analysis for Healthcare Associated
          Infection (REF:Forde et al., 2021)
        </Text>
        <Title level={3}>When to use </Title>
        <Text>You can use GraphSNP for:</Text>
        <ul>
          <li>
            Rapid outbreak network visualization:{" "}
            <b>
              No instalation required, drag and drop input files, interactive
              and easy to use.
            </b>
          </li>
          <li>
            {" "}
            <b>Visualize distribution </b> of pairwise SNP distances from a
            multi-fasta SNPs aligment{" "}
          </li>
          <li>
            {" "}
            <b>Create network </b>of pairwise SNP distances and{" "}
            <b>apply SNPs cutoff </b>for cluster analysis
          </li>
          <li>
            <b>Automatic cluster detection </b> based on community detection
            algorithms
          </li>
          <li>
            {" "}
            <b>Create transmission tree </b> based on SNPs, sampling dates, and
            patient stay timeline (for nosocomial outbreak){" "}
          </li>
        </ul>
        <Title level={3}>How to use </Title>
        <Text>
          Simple, have at least a multi-fasta SNPs alignment file as the input
          file then drag and drop it to
          <Link
            to="/graphsnp"
            onClick={() => {
              props.changeNavLocation("graphsnp");
            }}
          >
            {" "}
            GraphSNP page.
          </Link>{" "}
          You can also add other information like metadata and patient stay
          timeline to the analysis.
        </Text>

        <Divider />
      </div>
    </React.Fragment>
  );
};

export default About;
