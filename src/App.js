import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

function App() {
  return (
    <div className="App">
      <div className="py-5"></div>

      <figure class="text-center">
        <blockquote class="blockquote">
          <p>A React Notes App</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          users can enter text to each note and
        </figcaption>
        <figcaption class="blockquote-footer">
          save it in local storage,
        </figcaption>
        <figcaption class="blockquote-footer">
          delete an existing note,
        </figcaption>
        <figcaption class="blockquote-footer">
          dynamically search among the notes and
        </figcaption>
        <figcaption class="blockquote-footer">add character limit.</figcaption>
        <button className="btn btn-primary">Click Me</button>
      </figure>

      <div></div>
    </div>
  );
}

export default App;
