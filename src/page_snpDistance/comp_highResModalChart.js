import { CloudDownloadOutlined } from "@ant-design/icons";
import { Column } from "@ant-design/plots";
import { Button, Modal } from "antd";
import { useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dist_changeIsModalOpen } from "../action/snpdistSettingsActions";
import { downloadSVGchart } from "./util_snpDist";

const HighResModalChart = (props) => {
  const chart_ref = useRef(null);

  const downloadHandler = () => {
    let ref = chart_ref.current;
    let id = "all_samples_barchart";
    downloadSVGchart(ref, id);
  };

  const closeModal = () => {
    props.dist_changeIsModalOpen(false);
  };
  const createChart = (modalContent) => {
    if (
      modalContent.visible &&
      modalContent.chartType &&
      modalContent.chartSettings
    ) {
      let newSettings = modalContent.chartSettings;
      newSettings["renderer"] = "svg";

      if (modalContent.chartType === "column") {
        return (
          <div ref={chart_ref}>
            <Column {...newSettings} />
          </div>
        );
      }
    }
  };

  return (
    <div>
      <Modal
        title={
          <Button onClick={downloadHandler}>
            <CloudDownloadOutlined title="Download SVG" />
          </Button>
        }
        visible={props.isModalOpen.visible}
        closable={true}
        centered={true}
        width="90vw"
        footer={null}
        onCancel={closeModal}
        maskStyle={{ background: "rgba(0, 0, 0, 0.85)" }}
        bodyStyle={{
          textAlign: "center",
          padding: "20px",
          overflow: "auto",
          height: "80vh",
        }}>
        {createChart(props.isModalOpen)}
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isModalOpen: state.snpDistSettings.isModalOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ dist_changeIsModalOpen }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HighResModalChart);

/*

*/
