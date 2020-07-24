import React from "react";
import { Redirect } from "react-router-dom";
import fileContext from "../context/FileContext";
import "./adopt.css";
import Loading from "../Loading/Loading";
import PetApiService from "../services/pet-service";


export default class Adopt extends React.Component {
  static contextType = fileContext;
  storeOfPeople = ["Johnny", "Amanda", "Steve", "Susie", "Bob"];
  state = {
    redirect: false,
    myTurn: false,
    peopleBehindMe: 0,
    isLoading: false,
    error: null,
    queue: ["John", "Jane", "Billy"],
    currentCat: {},
    currentDog: {},
  };
  adoptMyCat = () => {
    //If the user selects a cat, then this function runs, which sets the context to contain the selected pet, removes the pet from the server, and redirects to the congrats page
    this.context.setPet(this.state.currentCat);
    PetApiService.removeCat().then(() => {
      this.setState({
        redirect: true,
      });
    });
  };
  adoptMyDog = () => {
    //If the user selects a dog, then this function runs, which sets the context to contain the selected pet, removes the pet from the server, and redirects to the congrats page
    this.context.setPet(this.state.currentDog);
    PetApiService.removeDog().then(() => {
      this.setState({
        redirect: true,
      });
    });
  };
  adoptCat = () => {
    //make an api call to delete the cat, then delete person from queue
    let currQueue = this.state.queue;
    currQueue.shift();
    PetApiService.removeCat()
      .then(() => PetApiService.getCat())
      .then((cat) => {
        console.log(cat);
        this.setState({
          currentCat: cat,
          queue: currQueue,
        });
      });
  };
  adoptDog = () => {
    //make an api call to delete the dog from the queue, then delete person from client side queue
    let currQueue = this.state.queue;
    currQueue.shift();
    PetApiService.removeDog()
      .then(() => PetApiService.getDog())
      .then(this.setDog);
    this.setState({
      queue: currQueue,
    });
  };
  setCat = (cat) => {
    //updates the current cat in the DOM
    this.setState({
      currentCat: cat,
    });
  };
  setDog = (dog) => {
    //updates the current dog in the DOM
    this.setState({
      currentDog: dog,
      isLoading: false,
    });
  };
  setLine = (line) => {
    //updates the queue
    if (!line.includes(this.context.name)) {
      line.push(this.context.name);
    }
    this.setState({
      queue: line,
    });
  };
  addPersonToLine = () => {
    let newPerson = this.storeOfPeople.pop();
    let currQueue = this.state.queue;
    currQueue.push(newPerson);
    this.setState({
      queue: currQueue,
      peopleBehindMe: this.state.peopleBehindMe + 1,
    });
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      //If you are not next in line.  Flip a coin. 0 is heads, 1 is tails. Heads, the person selects a cat.  Tails the person selects a dog. Then we move the line and check again
      if (this.state.queue[0] !== this.context.name) {
        let coinFlip = Math.floor(Math.random() * 2);
        coinFlip === 1 ? this.adoptDog() : this.adoptCat();
      } else {
        this.setState({
          myTurn: true,
        });
        if (this.state.peopleBehindMe < 5) {
          this.addPersonToLine();
        }
      }
    }, 5000);
    this.setState({
      isLoading: true,
    });
    PetApiService.getCat()
      .then(this.setCat)
      .then(PetApiService.getDog)
      .then(this.setDog)
      .then(PetApiService.getLine)
      .then(this.setLine)
      .catch((error) => this.setState({ error: error }));
  }
  componentWillUnmount() {
    //clean up interval for selecting pet
    clearInterval(this.interval);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/congrats"></Redirect>;
    }
    if (this.context.name === "") {
      //prevent people from accessing this component without first getting in line
      return <Redirect to="/" />;
    }
    if(this.state.peopleBehindMe === 5) {
        clearInterval(this.interval);
    }
    console.log(this.state.queue);
    return (
      <div className="Adoption_component">
        <h1 id="current_pets">Current Pets</h1>
        {this.state.isLoading && <Loading />}
        <section id="adoption_box">
          <section id="pets_box">
            <section id="cat_box">
              <ul id="cat_info_list">
                <li className="cat_info">
                  <img
                    id="cat_img"
                    src={this.state.currentCat.imageURL}
                    alt={this.state.description}
                  />
                </li>
                <li className="cat_info" id="cat_name">
                  <strong>Name:</strong> {this.state.currentCat.name}
                </li>
                <li className="cat_info" id="cat_gender">
                  <strong>Gender: </strong> {this.state.currentCat.gender}
                </li>
                <li className="cat_info" id="cat_age">
                  <strong>Age: </strong> {this.state.currentCat.age}
                </li>
                <li className="cat_info" id="cat_breed">
                  <strong>Breed: </strong> {this.state.currentCat.breed}
                </li>
                <li className="cat_info" id="cat_age">
                  <strong>{this.state.currentCat.name}'s story: </strong>{" "}
                  {this.state.currentCat.story}
                </li>
              </ul>
              {this.state.myTurn ? (
                <button onClick={this.adoptMyCat} className='adopt_button'>Adopt</button>
              ) : (
                ""
              )}
            </section>
            <section id="dog_box">
              <ul id="dog_info_list">
                <li className="dog_info">
                  <img
                    id="dog_img"
                    src={this.state.currentDog.imageURL}
                    alt={this.state.description}
                  />
                </li>
                <li className="dog_info" id="dog_name">
                  <strong>Name:</strong> {this.state.currentDog.name}
                </li>
                <li className="dog_info" id="dog_gender">
                  <strong>Gender: </strong> {this.state.currentDog.gender}
                </li>
                <li className="dog_info" id="dog_age">
                  <strong>Age: </strong> {this.state.currentDog.age}
                </li>
                <li className="dog_info" id="dog_breed">
                  <strong>Breed: </strong> {this.state.currentDog.breed}
                </li>
                <li className="dog_info" id="dog_age">
                  <strong>{this.state.currentDog.name}'s story: </strong>{" "}
                  {this.state.currentDog.story}
                </li>
              </ul>
              {this.state.myTurn ? (
                <button onClick={this.adoptMyDog} className='adopt_button'>Adopt</button>
              ) : (
                ""
              )}
            </section>
          </section>
        </section>
        <h1 id="queue_header">Current queue </h1>
        <section className="queue_box">
          <ul className="queue_list">
            {this.state.myTurn ? (
              <p>It's your turn! Select your new pet.</p>
            ) : (
              ""
            )}
            {this.state.queue.map((person) => {
              if(person === this.context.name){
                  return <li className="person_in_line"><strong>{person}</strong></li>
              }
              return <li className="person_in_line">{person}</li>;
            })}
          </ul>
        </section>
      </div>
    );
  }
}
