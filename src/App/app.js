import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Root from "../root/Root";
import Adopt from "../Adopt/adopt";
import FileContext from "../context/FileContext";
import Congrats from "../Congrats/Congrats";
import './app.css';
export default class extends Component {
  state = {
    name: "",
    // redirect: false,
    myPet: {},
  };
  setName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  setPet = (pet) => {
    this.setState({
      myPet: pet,
    });
  };
  render() {
    const value = {
      name: this.state.name,
      myPet: this.state.myPet,
      //   redirect: this.state.redirect,
      setName: this.setName,
      setPet: this.setPet,
      //   toggleRedirect: this.toggleRedirect,
    };
    return (
      <div className="App">
        <FileContext.Provider value={value}>
          <Switch>
            <Route exact path={"/"} component={Root} />
            <Route exact path={"/adopt"} component={Adopt} />
            <Route exact path={"/congrats"} component={Congrats} />
          </Switch>
        </FileContext.Provider>
      </div>
    );
  }
}
