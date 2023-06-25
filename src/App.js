import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { useState } from "react";

function App() {

  // how to have a local storage in a react app

  // Storing data in local storage:
  // Get the data you want to store
  const data = { name: "John", age: 25 };

  // Store the data in local storage
  localStorage.setItem("myData", JSON.stringify(data));

  // Retrieving data from local storage:
  // Retrieve the data from local storage
  const storedData = localStorage.getItem("myData");

  // Check if the data exists
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    // Use the data as needed
  }

  // Removing data from local storage:
  // Remove the data from local storage
  localStorage.removeItem("myData");

  // Remember to handle edge cases and potential errors, such as when the data doesn't exist in local storage or when the browser has disabled local storage.

  return (
    <div className="App">
      <div className="py-5"></div>

      <figure class="text-center">
        <blockquote class="blockquote"><p>A React Notes App</p></blockquote>
        <figcaption class="blockquote-footer">users can enter text to each note and</figcaption>
        <figcaption class="blockquote-footer">save it in local storage,</figcaption>
        <figcaption class="blockquote-footer">delete an existing note,</figcaption>
        <figcaption class="blockquote-footer">dynamically search among the notes and</figcaption>
        <figcaption class="blockquote-footer">add character limit.</figcaption>
        <button className="btn btn-primary">Click Me</button>
      </figure>
      <div className="flex form-row">
        <input class="form-control" type="text" placeholder="New Note" />
        <button class="btn btn-primary" type="submit">Submit form</button>
      </div>


      

      <div></div>
    </div>
  );
}

export default App;
