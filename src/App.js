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
    setNotesTest([...notesTest, newNote]);
    setNewNote(""); // Reset the input field after adding a note
  };


  useEffect(() => {
    $('#exampleModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus');
    });
  }, []);


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

        {/* App Header */}
      <div class="jumbotron jumbotron-fluid mx-4 mt-5">
        <div class="container">
          <h1 class="display-4">React Notes App</h1>
          <p class="lead">A local storage & dynamic note app using Bootstrap</p>
        </div>
      </div>

        {/* TEST-input for adding note */}
        <form className="container mt-5 mx-5">
          <div className="row">
            <label htmlFor="exampleFormControlTextarea1">New note input</label>
            <div className="col-9">
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
      <ul class="list-group mt-5 mx-5">
        <li class="list-group-item">Sample Text 1</li>
        <li class="list-group-item">Sample Text 2</li>
        <li class="list-group-item">Sample Text 3</li>
        <li class="list-group-item">Sample Text 4</li>
        <li class="list-group-item">Sample Text 5</li>
        <li class="list-group-item">Sample Text 5</li>
      </ul>

        {/* map item list from array */}
      {/* notesItemList */}
      {/* <div>
      {notesItemList.map((input)=>(
        <li>{notesItemList}</li>
      ))}
      </div> */}

        {/* map test */}
      {notesTest.map((note, index) => (<li key={index}>{note}</li>))}

      <ul class="list-group mx-5 mt-5">
        <li class="list-group-item">text abc</li>
      </ul>

        {/* map item list - sample */}
      {/* List Items Generator */}
      {/* <ol className="list-decimal grid gap-2">
              {inputValues.map((input) => (
                <li
                  key={input.id}
                  className="flex flex-grow justify-between" //added
                >
                  <input
                    className={`${
                      input.value === "" ? "bg-slate-100/50" : "bg-slate-100/10"
                    } px-2 py-3 hover:bg-slate-100/80 rounded font-mono text-xs w-full`} //w-full mb-2
                    value={input.value}
                    onChange={(e) => handleInputChange(e, input.id)}
                    placeholder="to do?"
                    type="text"
                    style={{
                      textDecoration:
                        input.isChecked && input.value !== ""
                          ? "line-through"
                          : "none",
                    }}
                  />
                  <input
                    type="checkbox"
                    checked={input.isChecked}
                    onChange={(e) => handleCheckboxChange(e, input.id)}
                    className="ml-3 h-auto w-auto checked:accent-green-600 rounded" //h-[15px] w-[15px] remove
                    disabled={!input.value}
                  />
                </li>
              ))}
            </ol> */}

        {/* reset button  */}
      <div>
          {/* clear all button */}
        <button type="button" className="btn btn-primary mx-5 mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                <button type="button" className="btn btn-primary">Clear All</button>
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
