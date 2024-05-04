import React from "react";
import "./ListofNotes.scss";
import MDEditor from "@uiw/react-md-editor";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { deleteSingleNote } from "../../utils/data.service";
import { toast } from "react-toastify";

const ListofNotes = ({ notesdata, hasSearchResults, onNotesDeleted }) => {
  const btndelete = async (id) => {
    try {
      const token = sessionStorage.getItem("authToken");

      if (token) {
        await deleteSingleNote(id);
        toast("Notes Deleted");
        onNotesDeleted(id);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="Listofnotes">
      <div>
        <h1 className="listh1">Notes</h1>
      </div>
      <div className="listitem">
        {! hasSearchResults? (
          <p>No notes found for the search keyword.</p>
        ) : (
          notesdata.map((e) => {
            const timestamp = e.created_at;
            const date = new Date(timestamp).toLocaleDateString();

            return (
              <div className="card-container" key={e.id}>
                <div className="card">
                  <div>
                    <h4>Title: {e.title}</h4>
                    <p>Created Date: {date}</p>
                  </div>
                  <div className="editor">
                    <p>Description: </p>
                    <MDEditor.Markdown
                      source={e.content}
                      style={{ whiteSpace: "pre-wrap" }}
                    />
                  </div>
                  <div>
                    <Link to="/category">
                      <p className="category">Category: {e.categoryName}</p>
                    </Link>
                  </div>
                  <div className="division">
                    <div>
                      <NavLink to={`/edit/${e.id}`}>
                        <Icon name="edit" />
                      </NavLink>
                    </div>
                    <div>
                      <Icon name="delete" onClick={() => btndelete(e.id)} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListofNotes;
