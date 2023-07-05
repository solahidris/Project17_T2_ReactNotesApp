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

  const searchInputHandler = (event) => {
    const searchData = event.target.value;
    setSearchInput(searchData);
  
    const filteredResults = notesData.filter((item) =>
      item.toLowerCase().includes(searchData.toLowerCase())
    );
  
    setFilteredResults(filteredResults);
    console.log(filteredResults, "filteredResults");
  };
  
  const [openWorkflow, setOpenWorkflow] = useState(false);
  const openWorkflowHandler = () => {
    openWorkflow === false ? setOpenWorkflow(true) : setOpenWorkflow(false)
  };


  return (
    <div className="App">
      <div className="py-3"></div>
    
        {/* Workflow List */}
      <div class="mx-5 mb-2">
        <button onClick={openWorkflowHandler} class="btn btn-primary btn-sm ">{openWorkflow === false ? "Show Workflow" : "Hide Workflow"}
</button>
      </div>
      { openWorkflow === true ? (
        <>
        <div class="d-flex xl-align-items-center flex-column">
          <p class="fs-1 fw-semibold mx-5 my-0" style={{ paddingLeft: '20px' }}>Workflow</p>
          <ol class="list-group list-group-flush list-group-numbered mx-5 pb-5 col-xl-4 col-8" style={{ fontSize: '10px', padding: '5px' }}>
            <li class="list-group-item">users can enter text to each note and</li>
            <li class="list-group-item">save it in local storage, useMemo</li>
            <li class="list-group-item">delete an existing note,</li>
            <li class="list-group-item">dynamically search among the notes and</li>
            <li class="list-group-item">add character limit.</li>
          </ol>
        </div>
          {/* Placeholder Line */}
        <p class="placeholder-glow d-flex justify-content-center">
          <span class="placeholder placeholder-xs col-11 bg-secondary"></span>
        </p>
        </>)
      : (<></>)
      }

        {/* App Header */}
      <div class="jumbotron jumbotron-fluid mx-5 mt-3">
        <div class="container">
          <h1 class="display-4 fw-semibold">React Notes App</h1>
          <p class="lead">A local storage & dynamic note app using Bootstrap</p>
        </div>
      </div>

          {/* New Note Submit */}
        <div class="py-4">
          <div class="d-flex justify-content-center">
            <div class="form-floating col-6 col-xl-4">
                  <input class="form-control" type="text" id="newNoteLabel" value={newNote} placeholder="newNoteLabel" maxLength={30}  onChange={(event) => setNewNote(event.target.value)}/>
                  <label for="newNoteLabel">New Note</label>
            </div>
            <div class="d-flex align-items-end">
              <button type="submit" onClick={addNotesTestHandler} className="btn btn-primary btn-sm mx-2">Submit</button>
            </div>
          </div>
            {/* If character > 30 ? show warning */}
          {newNote.length !== 30 ? (<></>) : (
          <div class="d-flex justify-content-center mx-4 mx-xl-5">
            <small className="col-8 col-xl-5 mt-1 text-danger fw-bold">⚠️ Character Limit!</small>
          </div>)}
        </div>

          {/* Dynamic Search Button */}
        {/* <div class="row d-flex justify-content-end mx-5 mt-5"> */}
        <div class="d-flex justify-content-end flex-row mx-5 mt-3">
          <div class="col-4 mx-2">
            <input type="text" value={searchInput} onChange={searchInputHandler} placeholder="Search" class="form-control form-control-sm"/>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-info btn-sm">🔍</button>
          </div>
        </div>

         {/* Map Data Array */}
        { searchInput === "" ? ( // If not searching, show notes from database
          <div class="mt-2 mx-5">
            <ul class="list-group">
              {notesData.map((note, index) => (
                <li key={index} class="list-group-item">
                  <div class="d-flex justify-content-between">
                    {typeof note === 'string' ? (
                      <>
                        <div class="d-flex flex-row">
                          <div class="spinner-border spinner-border-sm align-self-center text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                          <span class="align-self-center mx-3 flex-grow">{note}</span>
                        </div>
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
          ) : ( // If Search if not empty, show the filter results
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
          <div className="modal-dialog modal-dialog-centered mx-5" role="document">
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
      {/* <div class="py-5"><p>.</p></div>
      <div class="py-5"><p>.</p></div> */}
    

      <div></div>
    </div>
  );
}

export default App;
