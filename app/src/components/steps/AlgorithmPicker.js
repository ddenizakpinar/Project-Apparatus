import React, { Component } from "react";
import { Button, SelectPicker } from "rsuite";

import { algorithms } from "../../AppVariables";

class AlgorithmPicker extends Component {
  render() {
    return (
      <div className="algorithm-picker">
        <div>
          <div className="picker">
            <SelectPicker
              data={algorithms}
              style={{ width: 224 }}
              appearance="subtle"
            />
          </div>
          <Button appearance="primary">Start Training</Button>
        </div>
      </div>
    );
  }
}

export default AlgorithmPicker;
