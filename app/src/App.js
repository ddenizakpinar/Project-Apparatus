import React, { Component } from "react";
import { Button, Steps } from "rsuite";

import CsvUpload from "./components/CsvUpload";
import TargetVariable from "./components/TargetVariable";
import SplitData from "./components/SplitData";
import AlgorithmPicker from "./components/AlgorithmPicker";
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

  render() {
    return (
      <div className="app">
        <h1
          className="title"
          onClick={() => console.log(this.state.dataHeaders)}
        >
          Apparatus
        </h1>
        <Steps current={this.state.step} vertical>
          <Steps.Item
            title="Upload your csv."
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
            title="Waiting"
            description={
              <TargetVariable
                onProgress={this.onProgress}
                dataHeaders={this.state.dataHeaders}
              />
            }
          />
          <Steps.Item
            title="Split your data."
            description={<SplitData onProgress={this.onProgress} />}
          />
          <Steps.Item
            title="Choose your algorithm"
            description={<AlgorithmPicker onProgress={this.onProgress} />}
          />
        </Steps>
        <Button appearance="primary"> Hello world </Button>
      </div>
    );
  }
}

export default App;
