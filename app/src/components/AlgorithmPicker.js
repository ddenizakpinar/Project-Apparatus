import React, { Component } from "react";
import { Radio, RadioGroup, Button } from "rsuite";

class AlgorithmPicker extends Component {
  render() {
    return (
      <div className="algorithm-picker">
        <RadioGroup
          name="radioList"
          inline
          appearance="picker"
          defaultValue="A"
        >
          <Radio value="A">Item A</Radio>
          <Radio value="B">Item B</Radio>
          <Radio value="C">Item C</Radio>
          <Radio value="D">Item D</Radio>
        </RadioGroup>
        <div>
          <Button appearance="primary">Start Training</Button>
        </div>
      </div>
    );
  }
}

export default AlgorithmPicker;
