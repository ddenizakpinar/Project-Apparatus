import React, { Component } from "react";
import { Button, Steps, Divider } from "rsuite";

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

  resetProgress = () => {
    this.setState({ step: 0 });
  };

  title = (text, tooltip) => {
    return (
      <div className="step-title">
        {text}&nbsp; <Tooltip tooltip={tooltip} />
      </div>
    );
  };

  render() {
    return (
      <div className="app">
        <h1
          className="title"
          onClick={() => console.log(this.state.dataHeaders)}
        >
          Apparatus
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
              />
            }
          />
          <Steps.Item
            title={this.title("Split your data.", "Csv info")}
            description={<SplitData onProgress={this.onProgress} />}
          />
          <Steps.Item
            title={this.title("Choose your algorithm.", "Csv info")}
            description={<AlgorithmPicker onProgress={this.onProgress} />}
          />
        </Steps>
      </div>
    );
  }
}

export default App;
