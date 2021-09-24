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
          Download SNPs example file
        </Button>
        <br />
        <br />

        <Title level={3}>Metadata table</Title>
        <Text>
          Metadata table must contain at least three non-empty columns:
          sampleID, sampleDate, and sampleSource. Sample identifier must be
          identical on both metadata and SNPs alignment.
        </Text>
        <br />
        <br />
        <Button type={"primary"} href={constant.TEMPLATE.metadata}>
          Download metadata example file
        </Button>
        <br />
        <br />
      </div>
    </React.Fragment>
  );
};

export default InputFiles;
