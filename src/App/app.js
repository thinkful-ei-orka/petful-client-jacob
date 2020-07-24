import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Root from "../root/Root";
import Adopt from "../Adopt/adopt";
import FileContext from "../context/FileContext";

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
//   toggleRedirect = () => {
//       this.setState({
//           redirect: !this.state.redirect
//       })
//   }
  render() {
    const value = {
      name: this.state.name,
      myPet: this.state.myPet,
    //   redirect: this.state.redirect,
      setName: this.setName,
    //   toggleRedirect: this.toggleRedirect,
    };
    return (
      <div className="App">
        <FileContext.Provider value={value}>
            <Switch>
                <Route exact path={"/"} component={Root} />
                <Route exact path={"/adopt"} component={Adopt}/>
            </Switch>
        </FileContext.Provider>
      </div>
    );
  }
}
