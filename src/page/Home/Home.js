import React, { useEffect, useState } from "react";
import ListofNotes from "../../component/ListofNotes/ListofNotes";
import axios from "axios";
import "./Home.scss";
import { Button, Input } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        console.log("object", token);
        if (token) {
          const response = await axios.get(`http://localhost:1010/notes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setNotes(response.data);
        } else {
          console.error("Access token not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchData();
  }, []);

  console.log(notes);

  const searchItems = () => {};

  return (
    <section className="fixed-container">
      <div className="homepage">
        <div className="homepage__container">
          <div>
            <Input
              className="homepage__common"
              icon="search"
              placeholder="Search..."
              onChange={() => searchItems()}
            />
          </div>
          <div>
            <Button
              className="homepage__common"
              onClick={() => navigate("/addnote")}
            >
              Add Note
            </Button>
          </div>
        </div>
        <div className="homepage__notes">
          <ListofNotes notesdata={notes} />
        </div>
      </div>
    </section>
  );
};

export default Home;
