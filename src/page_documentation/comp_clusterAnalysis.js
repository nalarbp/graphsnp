import React from "react";
import { Typography, Divider } from "antd";
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
        <Title level={3}>Isolate metadata</Title>
        <Text>
          The metadata contains isolate’s information such as the name,
          locations, date of collection, and other isolates’ profiles, formatted
          in comma-separated value (.csv). Metadata file is a mandatory input to
          use HAIviz, as it serves as a central hub to link other inputs and to
          create integrated visualization. For instance, to integrate
          phylogenetic tree and transmission graph both files must have
          identical isolate’s name with the metadata
        </Text>
        <br />
        <br />
        <Button href={constant.TEMPLATE.isolateData}>
          Metadata example file
        </Button>
        <Divider />

        <Title level={3}>Local map </Title>
        <Text>
          The local map input is an XML formatted file that contains SVG map and
          location data. Users can create this map on the fly at HAIviz
          <Link
            to="/create-map"
            onClick={() => {
              props.changeNavLocation("createMap");
            }}
          >
            {" "}
            map editor page{" "}
          </Link>
          by loading SVG image and annotating its locations.
        </Text>
        <br />
        <br />
        <Button href={constant.TEMPLATE.svg}>SVG example file</Button>
        <Button href={constant.TEMPLATE.xmlData}>XML example file</Button>
        <Divider />

        <Title level={3}>Phylogenetic tree </Title>
        <Text>
          The phylogenetic tree input requires a Newick formatted tree with the
          branch length and the name of the taxa. The taxa name is compulsory to
          label the tree and link it with the metadata, while the branch length
          is optional to scale an additive tree.
        </Text>
        <br />
        <br />
        <Button href={constant.TEMPLATE.treeData}>Tree example file</Button>
        <Divider />

        <Title level={3}>Transmission graph</Title>
        <Text>
          The transmission input a graph file that contains a collection of
          nodes, links, and the corresponding attributes to describe the
          transmission, written in DOT language format. Similar to the tree, the
          graph also requires attributes to be displayed correctly.
        </Text>
        <br />
        <br />
        <Button href={constant.TEMPLATE.transData}>Graph example file</Button>
        <Divider />

        <Title level={3}>Movement table</Title>
        <Text>
          The host movement input is a CSV file containing host’s name, their
          location and the duration of their stay at that particular location
          (e.g., start and end date of stay).
        </Text>
        <br />
        <br />
        <Button href={constant.TEMPLATE.movementData}>Example file</Button>
        <Divider />
        <Divider />
      </div>
    </React.Fragment>
  );
};

export default InputFiles;
