
import React from "react";
import Results from "./results-component";
import Nominations from "./nominations-component";
import axios from "axios";


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: "",
      movies: [],
      nominations: [
        {
          title: "",
          year: "",
          imdbID: "",
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
  }

  //mount localstorage for nominations
  componentDidMount() {
    this.loadLocalData();
  }

  //get nominations stored in local storage
  loadLocalData() {
    const temp = localStorage.getItem("nominations");
    const nominations = JSON.parse(temp);

    if (nominations !== null) {
      this.setState({
        nominations: nominations,
      });
    }
  }

  //setState from data of textbox
  handleChange(event) {
    this.setState({
      movie: event.target.value,
    });
  }

  //call function to get data from the API using state data
  handleSubmit(event) {
    this.getData();
    event.preventDefault();
  }

  //get data from API
  getData() {
    const url = "https://www.omdbapi.com/?apikey=ae471440&s=";
    

    axios
      .get(url + this.state.movie)
      .then((response) => {
        
        this.newState(response.data.Search);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //set new state using data from the api
  newState(movies) {
    const movieList = movies.map((movie) => {
      return {
        title: movie.Title,
        year: movie.Year,
        imdbID: movie.imdbID,
        nominate: false,
      };
    });

    this.setState({
      movies: movieList.slice(1),
    });
  } // here we make individual elements from the array

  //handling Nominee Button events and adding movies to Nominations
  handleAdd(i) {
    let nominations = this.state.nominations.slice();
    let movies = this.state.movies.slice();

    if (nominations.length <= 5) {
      movies[i] = {
        title: this.state.movies[i].title,
        year: this.state.movies[i].year,
        imdbID: this.state.movies[i].imdbID,
        nominate: true,
      };

      nominations.push({
        title: this.state.movies[i].title,
        year: this.state.movies[i].year,
        imdbID: this.state.movies[i].imdbID,
      });

      this.setState({
        movies: movies,
        nominations: nominations,
      });

      localStorage.setItem("nominations", JSON.stringify(nominations));
    } else alert("Maximum nominations is 5");
  }

  //handling Remove Button events to delete Nominated Movies
  handleDelete(index) {
    const nominations = this.state.nominations;
    const delNomination = nominations.filter((nom, i) => i !== index);

    const movies = this.state.movies.slice();

    for (let i = 0; i < movies.length; i++) {
      if (nominations[index].imdbID === movies[i].imdbID)
        movies[i].nominate = false;
    } // blur the nominate button on this side

    localStorage.setItem("nominations", JSON.stringify(delNomination));

    this.setState({
      movies: movies,
      nominations: delNomination,
    });
  }

  //Rendering
  render() {
    const movies = this.state.movies.slice();

    const results = this.state.movie ? `"${this.state.movie}"` : null;

    return (
      <div className="container m-4">
        <div className="row">
          <div className="col m-2">
            <h3>Find your movies with OMDB </h3>
          </div>
        </div>
        <div className="input-box bg-grey m-2 p-4">
          <div className="row">
            <div className="col">
              <h6>Movie Title</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <form onSubmit={this.handleSubmit}>
                <input
                  className="col"
                  type="text"
                  value={this.state.movie}
                  onChange={this.handleChange}
                />
              </form>
            </div>
          </div>
        </div>
        <div className="row m-2">
          <div className="col mr-2 p-3 min-vh-100 bg-white">
            <h6>Results for {results}</h6>
            <table className="table ">
              <tbody>
                <Results
                  movies={movies}
                  onClick={(i) => {
                    this.handleAdd(i);
                  }}
                />
              </tbody>
            </table>
          </div>
          <div className="col ml-2 p-3 min-vh-100 bg-white">
            <h6>Nominations</h6>
            <table className="table ">
              <tbody>
                <Nominations
                  nominations={this.state.nominations}
                  onClick={(delButton) => {
                    this.handleDelete(delButton);
                  }}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
