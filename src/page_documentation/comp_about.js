import { Button, Divider, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import * as constant from "../utils/constants";
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
          GraphSNP is an interactive visualisation tool running in a web browser
          that allows users to rapidly generate pairwise SNP distance networks,
          investigate SNP distance distributions, identify clusters of related
          organisms, and reconstruct transmission routes.
        </Text>
        <Title level={3}>When to use </Title>
        <Text>You can use GraphSNP for:</Text>
        <ul>
          <li>
            Rapid SNP distance or (other type of distances) network
            visualisation:{" "}
            <b>
              No instalation required, drag and drop input files, interactive
              and easy to use.
            </b>
          </li>
          <li>
            {" "}
            <b>Visualise and investigate distance distribution </b>{" "}
            interactively.
          </li>
          <li>
            {" "}
            <b>Create network </b>of pairwise SNP distances and{" "}
            <b>apply SNPs cutoff </b>for cluster analysis.
          </li>
          <li>
            <b>Detect and report cluster's membership</b> based on community
            detection algorithms.
          </li>
          <li>
            {" "}
            <b>Create transmission tree </b> based on SNPs and collection day.{" "}
          </li>
        </ul>
        <Title level={3}>How to use </Title>
        <Text>
          Drag and drop a multi-fasta SNPs alignment or a distance matrix and a
          metadata file into
          <Link
            to="/"
            onClick={() => {
              props.changeNavLocation("home");
            }}>
            {" "}
            Input
          </Link>{" "}
          page. Then visualise it at{" "}
          <Link
            to="/snpdistance"
            onClick={() => {
              props.changeNavLocation("snpdistance");
            }}>
            {" "}
            Distances
          </Link>{" "}
          and{" "}
          <Link
            to="/graphsnp"
            onClick={() => {
              props.changeNavLocation("graphsnp");
            }}>
            {" "}
            GraphSNP
          </Link>{" "}
          page.
        </Text>

        <Title level={3}>User Manual </Title>
        <Text>
          For more detailed information about GrapSNP, please download GraphSNP
          user manual below.
          <br />
          <br />
        </Text>
        <Button type={"danger"} href={constant.USER_MANUAL.latest}>
          Download GraphSNP User Manual
        </Button>

        <Divider />
      </div>
    </React.Fragment>
  );
};

export default About;
