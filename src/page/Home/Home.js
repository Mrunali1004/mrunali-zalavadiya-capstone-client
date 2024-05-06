import React, { useEffect, useState } from "react";
import ListofNotes from "../../component/ListofNotes/ListofNotes";
import "./Home.scss";
// import { Input } from "semantic-ui-react";
import { getAllNotes, getCategoryByKeyword } from "../../utils/data.service";
import { toast } from "react-toastify";

const fetchData = async (setNotes) => {
  try {
    const response = await getAllNotes();
    setNotes(response.data);
  } catch (error) {
    if (error.response.status === 404) {
      setNotes([]);
      return;
    }
    console.error("Error fetching notes:", error);
  }
};

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllNotes();
        setNotes(response.data);
        setSearchResults(response.data);
      } catch (error) {
        if (error.response.status === 404) {
          setNotes([]);
          return;
        }
        console.error("Error fetching notes:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const searchItems = async (e) => {
    const keyword = e.target.value.trim();
    if (keyword === "") {
      setSearchResults(notes);
      return;
    }
    try {
      const response = await getCategoryByKeyword(keyword);

      setSearchResults(response.data);
    } catch (error) {
      setSearchResults([]);
      toast.error(error.message);
    }
  };

  console.log(searchResults);

  return (
    <section className="fixed-container">
      <div className="notes-search">
        <div className="notes-search__input">
          <div>
            <input
              className="notes-search__input-field"
              icon="search"
              placeholder="Search..."
              onChange={(e) => searchItems(e)}
            />
          </div>
        </div>
        <div className="notes-search__notes-list">
          <ListofNotes
            notesdata={searchResults.length > 0 ? searchResults : notes}
            onNotesDeleted={() =>
              fetchData((notes) => {
                setNotes(notes);
                setSearchResults(notes);
              })
            }
            hasSearchResults={searchResults.length > 0}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
