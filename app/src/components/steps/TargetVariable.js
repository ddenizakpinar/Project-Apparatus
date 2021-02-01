import React, { Component } from "react";
import { SelectPicker, Button } from "rsuite";

class TargetVariable extends Component {
  dataFormatter = (dataHeaders) => {
    let dataArray = [];
    dataHeaders?.map((header) => {
      return dataArray.push({
        label: header,
        value: header,
      });
    });
    return dataArray;
  };

  render() {
    return (
      <div className="target-variable">
        <div>Choose your target variable</div>
        <div className="picker">
          <SelectPicker
            data={this.dataFormatter(this.props.selectedDataHeaders)}
            style={{ width: 224 }}
            appearance="subtle"
            onChange={this.props.onTargetVariableChange}
          />
        </div>
        <div>
          <Button
            onClick={() => this.props.onProgress()}
            disabled={!this.props.targetVariable}
            appearance="primary"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default TargetVariable;
