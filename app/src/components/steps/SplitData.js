import React, { Component } from "react";
import { Slider, Button } from "rsuite";

class SplitData extends Component {
  render() {
    return (
      <div className="split-data">
        <div className="text">Decide your train data size.</div>
        <Slider
          defaultValue={this.props.splitRatio}
          min={20}
          step={10}
          max={80}
          graduated
          progress
          onChange={this.props.onSplitRatioChange}
          renderMark={(mark) => {
            return mark;
          }}
        />
        <Button
          onClick={() => this.props.onProgress()}
          disabled={!this.props.splitRatio}
          appearance="primary"
        >
          Next
        </Button>
      </div>
    );
  }
}

export default SplitData;
