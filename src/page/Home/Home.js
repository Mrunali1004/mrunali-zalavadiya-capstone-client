import React, { useEffect, useState } from "react";
import ListofNotes from "../../component/ListofNotes/ListofNotes";
import "./Home.scss";
import { Input } from "semantic-ui-react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllNotes, getCategoryByKeyword } from "../../utils/data.service";

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
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
    }

    fetchData((notes) => {setNotes(notes); setSearchResults(notes)});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(notes);

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
      setSearchResults([])
      console.error("Error:", error);
    }
  };

  console.log(searchResults);

  return (
    <section className="fixed-container">
      <div className="homepage">
        <div className="homepage__container">
          <div>
            <Input
              className="homepage__commonn"
              icon="search"
              placeholder="Search..."
              onChange={(e) => searchItems(e)}
            />
          </div>
          <div>
            <NavLink to="/addnote">
              <p>Add Note</p>
            </NavLink>
          </div>
        </div>
        <div className="homepage__notes">
          <ListofNotes
            notesdata={searchResults.length > 0 ? searchResults : notes}
            onNotesDeleted={() => fetchData(setNotes)}
            hasSearchResults={searchResults.length > 0}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
