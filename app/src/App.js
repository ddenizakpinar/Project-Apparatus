import React, { Component } from "react";
import { Steps, Divider } from "rsuite";
import axios from "axios";

import CsvUpload from "./components/steps/CsvUpload";
import TargetVariable from "./components/steps/TargetVariable";
import SplitData from "./components/steps/SplitData";
import AlgorithmPicker from "./components/steps/AlgorithmPicker";
import Tooltip from "./components/Tooltip";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      file: null,
      targetVariable: null,
      splitRatio: null,
      algorithm: null,
      model: null,
    };
  }

  onProgress = () => {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  };

  onFileSelect = (file) => {
    this.setState({
      file: file,
    });
  };

  setDataHeaders = (dataHeaders) => {
    this.setState({
      dataHeaders: dataHeaders,
    });
  };

  onTargetVariableChange = (targetVariable) => {
    this.setState({
      targetVariable: targetVariable,
    });
  };

  onSplitRatioChange = (splitRatio) => {
    this.setState({
      splitRatio: splitRatio,
    });
  };

  onAlgorithmChange = (algorithm) => {
    this.setState({
      algorithm: algorithm,
    });
  };

  resetProgress = () => {
    this.setState({
      step: 0,
      file: null,
      targetVariable: null,
      splitRatio: null,
      algorithm: null,
    });
  };

  title = (text, tooltip) => {
    return (
      <div className="step-title">
        {text}&nbsp; <Tooltip tooltip={tooltip} />
      </div>
    );
  };

  sendForm = async () => {
    const FileDownload = require("js-file-download");
    let formData = new FormData();
    for (const key in this.state) {
      formData.append(key, this.state[key]);
    }
    await axios
      .post("http://127.0.0.1:5000/train", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        FileDownload(res.data, "model.json");
        this.setState(
          {
            model: res.data,
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  predict = async () => {
    let formData = new FormData();
    formData.append("model", this.state.model);
    await axios
      .post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="app">
        <h1
          className="title"
          onClick={() => console.log(this.state.dataHeaders)}
        >
          Apparatus
          <div onClick={this.predict}>Predict</div>
          <Divider />
        </h1>
        <Steps current={this.state.step} vertical>
          <Steps.Item
            title={this.title("Choose your csv.", "Csv info")}
            description={
              <CsvUpload
                onProgress={this.onProgress}
                onFileSelect={this.onFileSelect}
                file={this.state.file}
                setDataHeaders={this.setDataHeaders}
                resetProgress={this.resetProgress}
              />
            }
          />
          <Steps.Item
            title={this.title("Choose target variable.", "Csv info")}
            description={
              <TargetVariable
                onProgress={this.onProgress}
                dataHeaders={this.state.dataHeaders}
                targetVariable={this.state.targetVariable}
                onTargetVariableChange={this.onTargetVariableChange}
              />
            }
          />
          <Steps.Item
            title={this.title("Split your data.", "Csv info")}
            description={
              <SplitData
                onProgress={this.onProgress}
                splitRatio={this.state.splitRatio}
                onSplitRatioChange={this.onSplitRatioChange}
              />
            }
          />
          <Steps.Item
            title={this.title("Choose your algorithm.", "Csv info")}
            description={
              <AlgorithmPicker
                onProgress={this.onProgress}
                sendForm={this.sendForm}
                algorithm={this.state.algorithm}
                onAlgorithmChange={this.onAlgorithmChange}
              />
            }
          />
        </Steps>
      </div>
    );
  }
}

export default App;
