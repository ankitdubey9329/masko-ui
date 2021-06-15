//importing modules
import React from "react";

//It creates the movies lists in Results table
export default class Results extends React.Component {
  moviesList() {
    const movie = this.props.movies.map((eachMovie, i) => {
      return (
        <tr key={i}>
          <td>
            &#8226; {eachMovie.title} ({eachMovie.year})
          </td>
          <td>
            <button
              onClick={() => {
                this.props.onClick(i);
              }}
              disabled={eachMovie.nominate}
            >
              Nominee
            </button>
          </td>
        </tr>
      );
    });

    return movie;
  }

  //rendering
  render() {
    return this.moviesList();
  }
}
