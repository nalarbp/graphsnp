import { Row, Col, Table } from "antd";
import "./style_matrix.css";
const MatrixViewer = (props) => {
  let tableHeaders = props.graphMatrix.data.cells;
  let tableCells = props.graphMatrix.data.headers;
  // let tableHeaders = [
  //   {
  //     key: "1",
  //     name: "Mike",
  //     age: 32,
  //     address: "10 Downing Street",
  //   },
  //   {
  //     key: "2",
  //     name: "John",
  //     age: 42,
  //     address: "10 Downing Street",
  //   },
  // ];
  // let tableCells = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Age",
  //     dataIndex: "age",
  //     key: "age",
  //   },
  //   {
  //     title: "Address",
  //     dataIndex: "address",
  //     key: "address",
  //   },
  // ];
  console.log(tableHeaders, tableCells);
  return (
    <Row>
      <Col sm={24}>
        <Table
          dataSource={tableHeaders}
          pagination={false}
          columns={tableCells}
        />
      </Col>
    </Row>
  );
};

export default MatrixViewer;
