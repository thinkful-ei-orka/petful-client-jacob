import React from "react";
import fileContext from "../context/FileContext";

export default class Loading extends React.Component {
  static contextType = fileContext;
  renderLoading = () => {
    return (
      <div id="loading_section">
        <p id="loading_message">Loading... please wait</p>
      </div>
    );
  };

  render() {
      return (
        <div id="loading_section">
        <p id="loading_message">Loading... please wait</p>
      </div>
      )
    // return <>{this.context.isLoading ? this.renderLoading() : ""}</>;
  }
}
