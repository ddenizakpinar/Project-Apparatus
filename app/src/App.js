import React, { Component } from "react";
import { Steps, Divider, Button } from "rsuite";
import axios from "axios";

import UploadCsv from "./components/steps/UploadCsv";
import EliminateData from "./components/steps/EliminateData";
import TargetVariable from "./components/steps/TargetVariable";
import SplitData from "./components/steps/SplitData";
import PickAlgorithm from "./components/steps/PickAlgorithm";
import TestModel from "./components/steps/TestModel";
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
      inputs: {},
      prediction: "",
      selectedDataHeaders: null,
      info: null,
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
      selectedDataHeaders: dataHeaders,
    });
  };

  setSelectedDataHeaders = (selectedDataHeaders) => {
    this.setState({
      selectedDataHeaders: selectedDataHeaders,
    });
  };

  selectAllDataHeaders = () => {
    this.setState({
      selectedDataHeaders: this.state.dataHeaders,
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

  setInput = (header, value) => {
    const newInputs = {
      ...this.state.inputs,
      [header]: value,
    };
    this.setState({ inputs: newInputs });
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
            model: res.data.model,
            columns: res.data.columns,
            info: {
              mae: res.data.mae,
              mse: res.data.mse,
              score: res.data.score,
            },
          },
          () => {
            this.onProgress();
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
    formData.append("columns", this.state.columns);
    formData.append("inputs", JSON.stringify(this.state.inputs));
    await axios
      .post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        this.setState({ prediction: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="app">
        <h1 className="title">
          Apparatus
          <Divider />
        </h1>
        <Steps current={this.state.step} vertical>
          <Steps.Item
            title={this.title("Choose your csv.", "Csv info")}
            description={
              this.state.step >= 0 ? (
                <UploadCsv
                  onProgress={this.onProgress}
                  onFileSelect={this.onFileSelect}
                  file={this.state.file}
                  setDataHeaders={this.setDataHeaders}
                  resetProgress={this.resetProgress}
                />
              ) : null
            }
          />
          <Steps.Item
            title={this.title("Choose or Eliminate.", "Csv info")}
            description={
              this.state.step >= 1 ? (
                <EliminateData
                  dataHeaders={this.state.dataHeaders}
                  selectedDataHeaders={this.state.selectedDataHeaders}
                  setDataHeaders={this.setDataHeaders}
                  setSelectedDataHeaders={this.setSelectedDataHeaders}
                  onProgress={this.onProgress}
                  selectAllDataHeaders={this.selectAllDataHeaders}
                />
              ) : null
            }
          />
          <Steps.Item
            title={this.title("Choose target variable.", "Csv info")}
            description={
              this.state.step >= 2 ? (
                <TargetVariable
                  onProgress={this.onProgress}
                  dataHeaders={this.state.dataHeaders}
                  targetVariable={this.state.targetVariable}
                  onTargetVariableChange={this.onTargetVariableChange}
                  selectedDataHeaders={this.state.selectedDataHeaders}
                />
              ) : null
            }
          />
          <Steps.Item
            title={this.title("Split your data.", "Csv info")}
            description={
              this.state.step >= 3 ? (
                <SplitData
                  onProgress={this.onProgress}
                  splitRatio={this.state.splitRatio}
                  onSplitRatioChange={this.onSplitRatioChange}
                />
              ) : null
            }
          />
          <Steps.Item
            title={this.title("Choose your algorithm.", "Csv info")}
            description={
              this.state.step >= 4 ? (
                <PickAlgorithm
                  onProgress={this.onProgress}
                  sendForm={this.sendForm}
                  algorithm={this.state.algorithm}
                  onAlgorithmChange={this.onAlgorithmChange}
                />
              ) : null
            }
          />
          <Steps.Item
            title={this.title("Test your model.", "Csv info")}
            description={
              this.state.step >= 5 ? (
                <TestModel
                  dataHeaders={this.state.dataHeaders}
                  selectedDataHeaders={this.state.selectedDataHeaders}
                  targetVariable={this.state.targetVariable}
                  inputs={this.state.inputs}
                  setInput={this.setInput}
                  predict={this.predict}
                  prediction={this.state.prediction}
                  info={this.state.info}
                />
              ) : null
            }
          />
        </Steps>
      </div>
    );
  }
}

export default App;
