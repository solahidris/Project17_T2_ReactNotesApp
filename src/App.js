import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';
import { useEffect, useState, useMemo } from 'react';

import $ from 'jquery';


function App() {
  const [newNote, setNewNote] = useState("");
  
  const [notesData, setNotesData] = useState(() => {
    const localStorageData = localStorage.getItem('notesData');
    console.log(localStorageData, "localstorage @ notesData");
    return localStorageData ? JSON.parse(localStorageData) : [];
  });

  const setNotesTestWithLocalStorage = useMemo(() => {
    return (newNotes) => {
      setNotesData(newNotes);
      localStorage.setItem('notesData', JSON.stringify(newNotes));
    };
  }, []);

  const addNotesTestHandler = (event) => {
    event.preventDefault();
    if (newNote !== "") {
      setNotesTestWithLocalStorage([...notesData, newNote]);
      setNewNote(""); // Reset the input field after adding a note
    }
  };

  useEffect(() => {
    // Modal Clear All Button
    $('#exampleModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus');
    });
    localStorage.setItem('notesData', JSON.stringify(notesData));
  }, [notesData]);

  const clearAllHandler = () => {
    setNotesTestWithLocalStorage([]);
  };

  const handleEditNote = (index, newValue) => {
    const updatedNotes = [...notesData];
    updatedNotes[index] = newValue;
    setNotesData(updatedNotes);
  };

  const handleDoneEditNote = (index) => {
    const updatedNotes = [...notesData];
    const note = updatedNotes[index];
    if (typeof note !== 'string') {
      note.isEditing = false;
      note.value = note.editValue;
    }
    setNotesData(updatedNotes);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notesData];
    updatedNotes.splice(index, 1);
    setNotesData(updatedNotes);
  };

  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  // const searchInputHandler = (event) => {
  //   const searchData = event.target.value;
  //   setSearchInput(searchData);
  //   // console.log(searchInput)
  //   const filteredResults = notesData.filter((item)=>{
  //     item.toLowerCase().includes(searchData.toLowerCase())
  //   });
  //   setFilteredResults(filteredResults);
  //   console.log(filteredResults, "filteredResults");
  // };

  const searchInputHandler = (event) => {
    const searchData = event.target.value;
    setSearchInput(searchData);
  
    const filteredResults = notesData.filter((item) =>
      item.toLowerCase().includes(searchData.toLowerCase())
    );
  
    setFilteredResults(filteredResults);
    console.log(filteredResults, "filteredResults");
  };
  



  return (
    <div className="App">
      <div className="py-3"></div>
    
      <p class="fs-3 fw-semibold mx-5">A React Notes App</p>
      <ol class="list-group list-group-numbered mx-5 pb-5">
        <li class="list-group-item text-decoration-line-through">users can enter text to each note and</li>
        <li class="list-group-item text-decoration-line-through">save it in local storage, useMemo</li>
        <li class="list-group-item text-decoration-line-through">delete an existing note,</li>
        <li class="list-group-item">dynamically search among the notes and</li>
        <li class="list-group-item">add character limit.</li>
      </ol>

        {/* Just a line */}
      <div class="d-flex justify-content-center">
        <p class="text-body-tertiary">------------------------------------------------------------</p>
      </div>

        {/* App Header */}
      <div class="jumbotron jumbotron-fluid mx-5 mt-5">
        <div class="container">
          <h1 class="display-4 fw-semibold">React Notes App</h1>
          <p class="lead">A local storage & dynamic note app using Bootstrap</p>
        </div>
      </div>

        {/* TEST-input for adding note */}
        <form className="container mt-5 d-flex justify-content-center">
          <div className="row">
            <label htmlFor="exampleFormControlTextarea1">New Note</label>
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                placeholder="Hmmmmm...."
                value={newNote}
                onChange={(event) => setNewNote(event.target.value)}
              />
            </div>
            <div className="col-4 gx-0">
              <button type="submit" onClick={addNotesTestHandler} className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>

          {/* Dynamic Search Button */}
        {/* <div class="row d-flex justify-content-end mx-5 mt-5"> */}
        <div class="d-flex justify-content-end flex-row mx-5 mt-5">
          <div class="col-4 mx-2">
            <input type="text" value={searchInput} onChange={searchInputHandler} placeholder="Search" class="form-control form-control-sm"/>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-info btn-sm">🔍</button>
          </div>
        </div>

         {/* Map Data Array */}
        { searchInput === "" ? (
        <div class="mt-2 mx-5">
          <ul class="list-group">
            {notesData.map((note, index) => (
              <li key={index} class="list-group-item">
                <div class="d-flex justify-content-between">
                  {typeof note === 'string' ? (
                    <>
                      <span class="align-self-center">{note}</span>
                      <div class="d-flex">
                        <button type="button" onClick={() => handleEditNote(index, { value: note })} class="btn btn-secondary mx-1 btn-sm align-self-center">📝</button>
                        <button type="button" onClick={() => handleDeleteNote(index)} class="btn btn-warning btn-sm align-self-center">🗑️</button>              
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        defaultValue={note.value}
                        onBlur={(event) => handleEditNote(index, event.target.value)}
                        class="btn btn-light btn-sm"
                        className="form-control"
                      />
                      <div class="d-flex">
                        {note.isEditing ? (
                          <>
                            <button type="button" onClick={() => handleDoneEditNote(index)} class="btn btn-primary mx-1 btn-sm align-self-center">Edit</button>
                          </>
                        ) : (
                          <>
                            <button type="button" onClick={() => handleDoneEditNote(index)} class="btn btn-success mx-1 btn-sm fw-bold align-self-center">✓</button>
                          </>
                        )}
                        <button type="button" onClick={() => handleDeleteNote(index)} class="btn btn-warning btn-sm align-self-center">🗑️</button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        ) : (
        <div class="mt-2 mx-5">
          <ul class="list-group">
            {filteredResults.map((result, index) => (
              <li key={index} class="list-group-item">
                <div class="d-flex justify-content-between">
                  {result}
                </div>
              </li>
            ))}
          </ul>
        </div>
        )}

        {/* reset button  */}
      <div>
          {/* clear all button */}
        <button type="button" className="btn btn-danger mx-5 mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Clear All
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
