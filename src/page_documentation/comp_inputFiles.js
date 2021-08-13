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
        <Text>SNPs alignment</Text>
        <br />
        <br />
        <Button type={"primary"} href={constant.TEMPLATE.snps}>
          Download SNPs example file
        </Button>
        <br />
        <br />

        <Title level={3}>Metadata table</Title>
        <Text>The metadata contains</Text>
        <br />
        <br />
        <Button type={"primary"} href={constant.TEMPLATE.metadata}>
          Download metadata example file
        </Button>
        <br />
        <br />

        <Title level={3}>Patient stay timeline table </Title>
        <Text>
          The phylogenetic tree input requires a Newick formatted tree with the
          branch length and the name of the taxa. The taxa name is compulsory to
          label the tree and link it with the metadata, while the branch length
          is optional to scale an additive tree.
        </Text>
        <br />
        <br />
        <Button type={"primary"} href={constant.TEMPLATE.stayTimeline}>
          Download Patient stay timeline example file
        </Button>

        <Divider />
      </div>
    </React.Fragment>
  );
};

export default InputFiles;
