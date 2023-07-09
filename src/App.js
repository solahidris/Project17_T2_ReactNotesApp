import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import $ from 'jquery';

import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

import { createClient } from '@supabase/supabase-js';

// WE ARE ON << NEXTJS-EXPERIMENT >> BRANCH

function App() {

  // Supabase configuration
  const supabase = createClient('https://pkipjwyckosuzkodgxks.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraXBqd3lja29zdXprb2RneGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4OTA5ODgsImV4cCI6MjAwNDQ2Njk4OH0.kb3cMjrGDVETChU0Ij2KHZ45uOCckIrapejAP4CTPZY');

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
    if (event) {
      event.preventDefault();
    }
    // event.preventDefault();
    if (newNote !== "") {
      setNotesTestWithLocalStorage([...notesData, newNote]);
      setNewNote(""); // Reset the input field after adding a note
    }
  };

  // SUPABASE stuff
  const [countries, setCountries] = useState([]);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
    console.log(data, "countries' data")
  }

  const { user } = useAuth0();

  /// USE EFFECT
  /// USE EFFECT
  /// USE EFFECT
  
  useEffect(() => {
    // Modal Clear All Button
    $('#exampleModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus');
    });
    localStorage.setItem('notesData', JSON.stringify(notesData));
    // Supabase
    getCountries();
    // eslint-disable-next-line
  }, [notesData]);
  
  /// USE EFFECT
  /// USE EFFECT
  /// USE EFFECT


  // another SUPABASE stuff
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

  const clearSearchHandler = () => {
    setSearchInput("");
  }
  
  const [openFeatures, setOpenFeatures] = useState(false);
  const openFeaturesHandler = () => {
    openFeatures === false ? setOpenFeatures(true) : setOpenFeatures(false)
  };

  // Auth0 Load & Error State
  const { isLoading, error } = useAuth0();

  return (
    <div className="App">

      {/* Auth0 Div */}
    <div>
      <h1>Auth0 Login</h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
      )}
    </div>

    {/* Supabase stuff */}
    {/* https://supabase.com/docs/guides/getting-started/quickstarts/reactjs */}
    {/* https://supabase.com/dashboard/project/pkipjwyckosuzkodgxks/editor/28543 */}
    {/* <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name} + {country.sub} - {country.id}</li>
        ))}
    </ul> */}

    {/* Filter map by SUB */}
    <div>
      {countries.map((item) =>
        item.sub === user?.sub && (
          <div key={item.id}>
            <h2>this is the new code</h2>
            <p>ID: {item.id}</p>
            <p>Name: {item.name}</p>
            <p>Sub: {item.sub}</p>
          </div>
        )
      )}
    </div>

    {/* {isAuthenticated && (
        <h2>{user?.sub}</h2>
    )} */}

    {/* <h1>{user?.sub}</h1> */}




      <div className="py-3"></div>
    
        {/* Features List */}
      <div class="mx-5 mb-2">
        <button onClick={openFeaturesHandler} class="btn btn-success btn-sm ">{openFeatures === false ? "Show Features" : "Hide Features"}</button>
      </div>
      { openFeatures === true ? ( // If button is not clicked, initial state false
        <>
        <div class="d-flex xl-align-items-center flex-column">
          <p class="fs-1 fw-semibold mx-5 my-0" style={{ paddingLeft: '20px' }}>Features / Tasks</p>
          <ol class="list-group list-group-flush list-group-numbered mx-5 pb-5 col-xl-4 col-8" style={{ fontSize: '10px', padding: '5px' }}>
            <li class="list-group-item">users can enter text to each note and ✏️</li>
            <li class="list-group-item">save it in local storage, useMemo 💾</li>
            <li class="list-group-item">delete an existing note, ❌</li>
            <li class="list-group-item">edit an existing note, 📝</li>
            <li class="list-group-item">clear all notes with a warning modal 🗑️☠️</li>
            <li class="list-group-item">dynamically search among the notes and 🔍</li>
            <li class="list-group-item">add character limit. 🚫</li>
          </ol>
        </div>
          {/* Placeholder Line */}
        <p class="placeholder-glow d-flex justify-content-center">
          <span class="placeholder placeholder-xs col-11 bg-secondary"></span>
        </p>
        </>)
      : (<></>) // if in shown and want to hide, render fragment
      }

        {/* App Header */}
      <div class="d-flex justify-content-center">
        <div class="jumbotron jumbotron-fluid mx-5 mt-3">
          <div class="container">
            <h1 class="display-4 fw-semibold">Notes App v2.0</h1>
            <span class="lead fw-lighter fs-6">A local storage via Bootstrap</span>
          </div>
        </div>
      </div>

          {/* New Note Submit */}
        <div class="py-4">
          <div class="d-flex justify-content-center mt-xl-4">
            <div class="form-floating col-6 col-xl-3">
                  <input class="form-control" type="text" id="newNoteLabel" value={newNote} placeholder="newNoteLabel" 
                  maxLength={30} onChange={(event) => setNewNote(event.target.value)} 
                  // onKeyDown - to enable press enter key to add note
                  onKeyDown={(event) => { if (event.keyCode === 13) {event.preventDefault(); addNotesTestHandler();}}}
                  />
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
        {notesData.length === 0 ? (
          <></>) : (
          <div class="d-flex justify-content-end flex-row mt-3 mx-5 mx-xl-0">
              {/* X button to clear search Input */}
            {searchInput !== "" ? <button type="button" onClick={clearSearchHandler} class="btn-close align-self-center btn btn-sm" aria-label="Close"></button> : <></>}
              {/* Search Filter + Icon */}
            <div class="col-4 col-xl-2 mx-1">
              <input type="text" value={searchInput} onChange={searchInputHandler} placeholder="Search" class="form-control form-control-sm"/>
            </div>
            <div class="col-auto ms-1 me-xl-4">
              <button type="button" class="btn btn-info btn-sm me-1">🔍</button>
            </div>
            <div class="col-xl-3"></div>
          </div>
        )}
        

         {/* Map Data Array */}
        { searchInput === "" ? ( // If not searching, show notes from database
          <div class="mt-3 mx-5 d-flex justify-content-center">

            {/* <ul class="list-group col-xl-6 col-12">
              {countries.map((item)=>(
                <li key={item.id} class="list-group-item">
                  <div class="d-flex flex-row">
                    <span class="badge fw-semibold text-bg-primary align-self-center">{item.id}</span>
                    <span class="align-self-center mx-3 flex-grow">{item.name}</span>
                  </div>
                </li>
              ))}
            </ul> */}

            <ul class="list-group col-xl-6 col-12">
              {countries
                .sort((a, b) => a.id - b.id) // Sort the array based on the 'id' property
                .filter((item) => item.sub === user?.sub)
                .map((item, index) => (
                  <li key={item.id} class="list-group-item">
                    <div class="d-flex flex-row">
                      <span class="badge fw-semibold text-bg-primary align-self-center">{index + 1}</span>
                      <span class="align-self-center mx-3 flex-grow">{item.name}</span>
                    </div>
                  </li>
                ))}
            </ul>


            {/* <div>
              {countries.map((item) =>
                item.sub === user?.sub && (
                  <div key={item.id}>
                    <h2>this is the new code</h2>
                    <p>ID: {item.id}</p>
                    <p>Name: {item.name}</p>
                    <p>Sub: {item.sub}</p>
                  </div>
                )
              )}
            </div> */}


            <ul class="list-group col-xl-6 col-12">
              {notesData.map((note, index) => (
                <li key={index} class="list-group-item">
                  <div class="d-flex justify-content-between">
                    {typeof note === 'string' ? (
                      <>
                        <div class="d-flex flex-row">
                          <span class="badge fw-semibold text-bg-primary align-self-center">{index+1}</span>
                          <span class="align-self-center mx-3 flex-grow">{note}</span>
                        </div>
                        <div class="d-flex">
                          <button type="button" onClick={() => handleEditNote(index, { value: note })} class="btn btn-light mx-1 btn-sm align-self-center">📝</button>
                          <button type="button" onClick={() => handleDeleteNote(index)} class="btn btn-warning btn-sm align-self-center">🗑️</button>              
                        </div>
                      </>
                    ) : ( // if editing, show as edit input
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
          ) : ( // If searching, show the filter results
          <>
            <div class="d-flex justify-content-start">
              {/* <span class="px-2"></span> */}
              <div class="col-xl-3 me-4"></div>
              <button type="button" class="btn btn-sm btn-success position-relative col-auto ms-xl-1 ms-4">
                Results
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill fw-medium text-bg-warning">
                  {filteredResults.length > 0 ? filteredResults.length.toString() : "0"}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </button>
            </div>
            <div class="mt-2 mx-5 d-flex justify-content-center">
              <ul class="list-group col-xl-6 col-12">
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, index) => (
                    <li key={index} class="list-group-item">
                      <div class="d-flex justify-content-between">
                        {result}
                      </div>
                    </li>
                  ))
                ) : (
                  <li class="list-group-item">
                    <div class="d-flex justify-content-between">
                      <span class="btn btn-warning">Nothing Found ⚠️</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </>
        )}

        {/* reset button  */}
      <div class="d-flex justify-content-start">
        <div class="col-xl-3"></div>
          {/* clear all button */}
        {filteredResults.length > 0 || notesData.length > 0 ? (<button type="button" className="col-auto btn btn-danger mx-xl-4 mx-5 mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Clear All</button>) : (<></>)}
          {/* modal stuff */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
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
