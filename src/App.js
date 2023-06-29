import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useState } from "react";

import React, { useEffect } from 'react';
import $ from 'jquery';


function App() {

  const [notesItemList,setNotesItemList] = useState("a text sample");

  // const [notesTest, setNotesTest] = useState(["string 1", "string 2"]);

  // const addNotesTestHandler = (event) => {
  //   setNotesTest(event.target.value);
  // };

  const [notesTest, setNotesTest] = useState(["string 1", "string 2"]);
  const [newNote, setNewNote] = useState("");

  const addNotesTestHandler = (event) => {
    event.preventDefault();
    if (newNote !== "") {
    setNotesTest([...notesTest, newNote]);
    setNewNote(""); // Reset the input field after adding a note
    }
  };


  useEffect(() => {
    $('#exampleModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus');
    });
  }, []);

  const clearAllHandler = () => {
    setNotesTest([]);
  };


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
      <div className="py-3"></div>

      <p class="fs-3 fw-semibold mx-5">A React Notes App</p>
      <ol class="list-group list-group-numbered mx-5 pb-5">
        <li class="list-group-item">users can enter text to each note and</li>
        <li class="list-group-item">save it in local storage,</li>
        <li class="list-group-item">delete an existing note,</li>
        <li class="list-group-item">dynamically search among the notes and</li>
        <li class="list-group-item">add character limit.</li>
      </ol>

        {/* Just a line */}
      <div class="d-flex justify-content-center">
        <p class="text-body-tertiary">------------------------------------------------------------</p>
      </div>

        {/* App Header */}
      <div class="jumbotron jumbotron-fluid mx-4 mt-5">
        <div class="container">
          <h1 class="display-4 fw-semibold">React Notes App</h1>
          <p class="lead">A local storage & dynamic note app using Bootstrap</p>
        </div>
      </div>

        {/* TEST-input for adding note */}
        <form className="container mt-5 mx-5">
          <div className="row">
            <label htmlFor="exampleFormControlTextarea1">New note input</label>
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Write here"
                value={newNote}
                onChange={(event) => setNewNote(event.target.value)}
              />
            </div>
            <div className="col gx-0">
              <button type="submit" onClick={addNotesTestHandler} className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>

        {/* basic notes text */}
        {/* map test */}
      <div class="mt-5">
        {notesTest.map((note, index) => (
          <ul class="list-group">
            <li key={index} class="list-group-item mx-5">
              {note}
            </li>
          </ul>
        ))}
      </div>

        {/* reset button  */}
      <div>
          {/* clear all button */}
        <button type="button" className="btn btn-danger mx-5 mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Clear All - Modal
        </button>
          {/* modal stuff */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Clearing All Notes</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you sure you want to clear all your notes?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={clearAllHandler} type="button" className="btn btn-danger" data-bs-dismiss="modal">Clear All</button>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* just gaps - delete later */}
      <div class="py-5"><p>.</p></div>
      <div class="py-5"><p>.</p></div>
      <div class="py-5"><p>.</p></div>
    

      <div></div>
    </div>
  );
}

export default App;
