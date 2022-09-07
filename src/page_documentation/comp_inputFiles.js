import { Button, Divider, Typography } from "antd";
import React from "react";
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
        <Title level={3}>A multi-fasta SNP alignment</Title>
        <Text>
          The alignment file must contain a minimum of two fasta-formatted,
          non-gap, ATGC-exclusive nucleotide sequences of equal length.
        </Text>
        <br />
        <br />
        <Button type={"primary"} href={constant.TEMPLATE.snps}>
          Download alignment example file
        </Button>
        <br />
        <br />
        <Title level={3}>A distance matrix</Title>
        <Text>
          Alternative to the alignment, a symmetric pairwise distance matrix can
          be used if users precompute the distance using 3rd party tools. The
          symmetric distance matrix should be written in CSV format.
        </Text>
        <br />
        <br />
        <Button type={"primary"} href={constant.TEMPLATE.distanceMatrix}>
          Download distance matrix example file
        </Button>
        <br />
        <br />

        <Title level={3}>Metadata table</Title>
        <Text>
          Metadata table must contain at least one non-empty column of
          sample_id. Sample identifier must be identical on both metadata and
          SNP alignment or matrix file. An additional column listing sample’s
          collection time (scaled in days, header: collection_day) is required
          for transmission analysis
        </Text>
        <br />
        <br />
        <Button type={"primary"} href={constant.TEMPLATE.metadata}>
          Download metadata example file
        </Button>
        <br />
      </div>
      <Divider />
    </React.Fragment>
  );
};

export default InputFiles;
