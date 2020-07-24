import React from "react";
import { Redirect } from "react-router-dom";
import fileContext from "../context/FileContext";
import "./Congrats.css";
export default class Congrats extends React.Component {
  state = {
    redirect: false,
  };
  static contextType = fileContext;
  handleButtonClick = () => {
    this.context.setPet("");
    this.setState({
      redirect: true,
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/"></Redirect>;
    }
    if (this.context.name === "" || this.context.myPet === {}) {
      //prevent people from accessing this component without first getting in line
      return <Redirect to="/" />;
    }
    return (
      <div id="congrats_box">
        <h1>Congratulations {this.context.name}!</h1>
        <img
          id="congrats_img"
          src={this.context.myPet.imageURL}
          alt={this.context.myPet.description}
        />
        <p>
          Thank you for adopting <strong>{this.context.myPet.name}</strong>. We
          hope to see you soon!
        </p>
        <p>
          If you would you like to adopt another animal, just click below to
          start the adoption process again!
        </p>
        <button onClick={this.handleButtonClick}>Adopt again!</button>
      </div>
    );
  }
}
