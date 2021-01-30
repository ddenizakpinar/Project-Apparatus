import React, { Component } from "react";
import { Tooltip as Tp, Whisper, Button } from "rsuite";

class Tooltip extends Component {
  render() {
    const tooltip = <Tp>{this.props.tooltip}</Tp>;
    return (
      <div className="tooltip">
        <Whisper
          className="tooltip"
          placement="top"
          trigger="hover"
          speaker={tooltip}
        >
          <i class="fas fa-info-circle"></i>
        </Whisper>
      </div>
    );
  }
}

export default Tooltip;
