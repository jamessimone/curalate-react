import React, { Component } from "react";

class ScriptInjector extends Component {
  render() {
    return <script src={this.props.scriptCallback} async={true} />;
  }
}

export default ScriptInjector;