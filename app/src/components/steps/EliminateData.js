import React, { Component } from "react";
import { Button, Divider } from "rsuite";
import { Checkbox, CheckboxGroup } from "rsuite";

class EliminateData extends Component {
  render() {
    return (
      <div className="eliminate-data">
        <div></div>
        <br />
        <div className="select-all">
          <span>Select All</span>
          <Checkbox
            onClick={this.props.selectAllDataHeaders}
            checked={this.props.dataHeaders === this.props.selectedDataHeaders}
          />
        </div>
        <Divider />
        <CheckboxGroup
          className="check-boxes"
          value={this.props.selectedDataHeaders}
          onChange={(e) => this.props.setSelectedDataHeaders(e)}
          inline
          name="checkboxList"
        >
          {this.props.dataHeaders?.map((header) => (
            <Checkbox value={header}>{header}</Checkbox>
          ))}
        </CheckboxGroup>
        <div>
          <Button
            disabled={!this.props.dataHeaders}
            onClick={() => this.props.onProgress()}
            appearance="primary"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default EliminateData;
