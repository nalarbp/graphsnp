import React from "react";
import { Typography, Divider, Button } from "antd";
import * as constant from "../utils/constants";
import "./style_documentation.css";

const { Title, Paragraph, Text } = Typography;

const InputFiles = (props) => {
  return (
    <React.Fragment>
      <div className="graphsnp-docs-content">
        <Title level={2} underline>
          {" "}
          Input file(s){" "}
        </Title>
        <Title level={3}>A multi-fasta SNPs alignment</Title>
        <Text>
          SNPs alignment file must contain at least two equally length of
          fasta-formatted non-gap nucleotide sequences.
        </Text>
        <br />
        <br />
        <Button type={"primary"} href={constant.TEMPLATE.snps}>
          Download a SNPs alignment example file
        </Button>
        <br />
        <br />
        <Title level={3}>A distance matrix</Title>
        <Text>
          User can also input the pairwise distances matrix instead of SNP
          alignment. The symmetric matrix should be written in comma-separated
          value (CSV) format.
        </Text>
        <br />
        <br />
        <Button type={"primary"} href={constant.TEMPLATE.distanceMatrix}>
          Download a distance matrix example file
        </Button>
        <br />
        <br />

        <Title level={3}>Metadata table</Title>
        <Text>
          Metadata table must contain at least one non-empty column of
          sample_id. Sample identifier must be identical on both metadata and
          SNPs alignment or matrix.
        </Text>
        <br />
        <br />
        <Button type={"primary"} href={constant.TEMPLATE.metadata}>
          Download a metadata example file
        </Button>
        <br />
        <br />
      </div>
      <Divider />
    </React.Fragment>
  );
};

export default InputFiles;
