import React from "react";
import "./ListofNotes.scss";
import { NavLink } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import Note from "../../component/Note/Note";

const ListofNotes = ({ notesdata, hasSearchResults, onNotesDeleted }) => {
  return (
    <div className="notes fixed-container">
      <div className="notes__add">
        <div>
          <NavLink to="/addnote">
            <div className="notes__add-content">
              <Icon name="add" />
              <p className="notes__no-results">Add New Note</p>
            </div>
          </NavLink>
        </div>
      </div>
      {!hasSearchResults ? (
        <></>
      ) : (
        notesdata.map((e) => (
          <Note key={e.id} {...e} onNotesDeleted={onNotesDeleted} />
        ))
      )}
    </div>
  );
};

export default ListofNotes;
