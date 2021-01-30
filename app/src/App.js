import React, { Component } from "react";
import { Button, Steps } from "rsuite";

import CsvUpload from "./components/CsvUpload";
import SplitData from "./components/SplitData";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }

  onProgress = () => {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  };

  render() {
    return (
      <div className="app">
        <h1 className="title">Apparatus</h1>
        <Steps current={this.state.step} vertical currentStatus={"process"}>
          <Steps.Item
            title="Upload your csv."
            description={<CsvUpload onProgress={this.onProgress} />}
          />
          <Steps.Item
            title="Split your data."
            description={<SplitData onProgress={this.onProgress} />}
          />
          <Steps.Item title="Waiting" description="Description" />
          <Steps.Item title="Waiting" description="Description" />
        </Steps>
        <Button appearance="primary"> Hello world </Button>
      </div>
    );
  }
}

export default App;
