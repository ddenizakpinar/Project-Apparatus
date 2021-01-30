import React, { Component } from "react";
import { Tooltip as Tp, Whisper } from "rsuite";

class Tooltip extends Component {
  render() {
    return (
      <Whisper
        placement="top"
        trigger="hover"
        speaker={this.props.tooltip}
      ></Whisper>
    );
  }
}

export default Tooltip;
