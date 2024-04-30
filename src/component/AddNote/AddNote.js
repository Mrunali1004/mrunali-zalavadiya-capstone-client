import React, { useEffect, useState } from "react";
import "./AddNote.scss";
// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";

const AddNote = () => {
  //   const navigate = useNavigate();
  const [getcategory, setGetCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (token) {
          const response = await axios.get(`http://localhost:1010/category`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setGetCategory(response.data);
        } else {
          console.error("Access token not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchData();
  }, []);

  console.log(getcategory);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    try {
      const token = sessionStorage.getItem("authToken");

      if (token) {
        const addcategory = await axios.post(
          `http://localhost:1010/category`,
          {
            categoryName: e.category,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(addcategory.data);

        const categoryIdnew = addcategory.data.category?.id;

        if (!categoryIdnew) {
          throw new Error("Category not added successfully");
        }

        const noteResponse = await axios.post(
          `http://localhost:1010/notes`,
          {
            categoryId: categoryIdnew,
            title: e.title,
            content: e.content,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(noteResponse.data);
      } else {
        console.error("Access token not found in localStorage");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <section className="fixed-container">
      <div className="addnote">
        <Form onSubmit={handleSubmit(onSubmit)} className="form">
          <Form.Field>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              placeholder="Enter a Title"
              type="text"
              {...register("title", {
                required: true,
              })}
            />
          </Form.Field>
          {errors.title && <p>Please check the Title</p>}
          <Form.Field>
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              {...register("category", {
                required: true,
              })}
            >
              <option value="">Select a category</option>
              {getcategory.map((category) => {
                return (
                  <option key={category.id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                );
              })}
            </select>
            {errors.category && <p>Please select a Category</p>}
          </Form.Field>
          <Form.Field>
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              placeholder="Enter Content"
              {...register("content", {
                required: true,
              })}
            />
            {errors.content && <p>Please check the Content</p>}
          </Form.Field>
          <div className="form-button">
            <Button type="submit" className="form-button__btn">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default AddNote;
