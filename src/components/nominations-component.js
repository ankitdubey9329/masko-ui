//importing modules
import React from "react";

//It creates the Nominations List in Nominations table
function Nominations(props) {
  const nominations = props.nominations.map((movie, movKey) => {
    if (movKey > 0) {
      return (
        <tr key={movKey}>
          <td>
          &#x2a; {movie.title} {movie.year}
          </td>
          <td>
            <button
              onClick={() => {
                props.onClick(movKey);
              }}
            >
              Remove
            </button>
          </td>
        </tr>
      );
    }
    return null;
  });
  return nominations;
}

export default Nominations;
