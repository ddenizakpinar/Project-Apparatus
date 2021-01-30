import React, { Component } from "react";
import { Slider, Button } from "rsuite";

class SplitData extends Component {
  render() {
    return (
      <div className="split-data">
        Decide your train data size.
        <Slider
          defaultValue={40}
          min={20}
          step={10}
          max={80}
          graduated
          progress
          renderMark={(mark) => {
            return mark;
          }}
        />
        <Button onClick={() => this.props.onProgress()} appearance="primary">
          Split!
        </Button>
      </div>
    );
  }
}

export default SplitData;
