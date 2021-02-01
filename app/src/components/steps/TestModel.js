import React, { Component } from "react";
import { Input, Button } from "rsuite";

class TestModel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { selectedDataHeaders, targetVariable, info } = this.props;
    return (
      <div className="test-model">
        <div className="info">
          <div>Mean Absolute Error (MAE): {info?.mae}</div>
          <div>Root mean squared error (RMSE): {info?.mse}</div>
          <div>Score: {info?.score}</div>
        </div>
        {selectedDataHeaders
          ?.filter((x) => x !== targetVariable)
          ?.map((header, index) => (
            <Input
              key={index}
              placeholder={header}
              onChange={(value) => this.props.setInput(header, value)}
            />
          ))}
        <Button onClick={this.props.predict} appearance="primary">
          Make Prediction
        </Button>
        <div>
          Response: <span className="prediction">{this.props.prediction}</span>
        </div>
      </div>
    );
  }
}

export default TestModel;
