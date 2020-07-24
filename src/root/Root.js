import React from "react";
import { Redirect } from "react-router-dom";
import fileContext from "../context/FileContext";
import "./Root.css";
export default class Root extends React.Component {
  state = {
    redirect: false,
  };

  static contextType = fileContext;

  toggleRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.toggleRedirect();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/adopt" />;
    }
    return (
      <div id="landing_page">
        <h1>Petful</h1>
        <p>
          Welcome to our adorable adoption adventure! We are excited for you to
          add a new fluffy member to your family!
        </p>
        <p>Here are the rules for our adoption process:</p>
        <ol>
          <li className='rule'>You may select from either a dog or a cat</li>
          <li className='rule'>
            We run strictly on a First In, First Out basis. So you may only
            select the first cat or the first dog in line
          </li>
          <li className='rule'>
            We also operate on a queue based system for saving your spot in
            line.
          </li>
          <li className='rule'>
            If you refresh your browser, you will lose your spot in line and will
            have to start the adoption process over again.
          </li>
        </ol>
        <p>
          Whenever you are ready, enter your name down below, and get ready to
          hop in line!
        </p>
        <form id="name_form" onSubmit={this.handleSubmit}>
          <label htmlFor="name_field">Name: </label>
          <input
            type="text"
            name="name_box"
            value={this.context.name}
            id="name_box"
            onChange={(e) => this.context.setName(e)}
            placeholder="e.g. Jane Doe"
          />
          <button type="submit" id="submit_button">
            Begin!
          </button>
        </form>
      </div>
    );
  }
}
