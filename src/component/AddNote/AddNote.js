import React, { useEffect, useState } from "react";
import "./AddNote.scss";
import { useForm } from "react-hook-form";
import { Form, Modal } from "semantic-ui-react";
import {
  addSingleCategory,
  createSingleNote,
  getCategories,
  getSingleNote,
  updateSingleNote,
} from "../../utils/data.service";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-toastify";

const AddNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [getcategory, setGetCategory] = useState([]);
  const [newCategoryAdded, setNewCategoryAdded] = useState(true);
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        setGetCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    newCategoryAdded && fetchData();
  }, [newCategoryAdded]);

  useEffect(() => {
    (async () => {
      try {
        if (!id) return;
        const response = await getSingleNote(id);
        const { title, categoryId, content } = response.data;
        setValue("title", title, { shouldValidate: true });
        setValue("categoryId", categoryId, { shouldValidate: true });
        setContent(content);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, [id, setValue]);

  const onSubmit = async (e) => {
    try {
      (await !id)
        ? createSingleNote({ ...e, content })
        : updateSingleNote(id, { ...e, content });

        toast("Added");
        navigate("/");
  
    } catch (error) {
      console.log("Error", error);
    }
  };

  const addCategory = async () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const categoryName = e.target.categoryName.value;
    setNewCategoryAdded(false);
    await addSingleCategory(categoryName);
    setNewCategoryAdded(true);
    setShowModal(false);
  };

  // const deleteCategory = async (id) => {
  //   try {
  //     const response = await deleteCategory(id);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const submit = () => {
  //   setTimeout(() => {
  //     toast("Added");
  //     navigate("/");
  //   }, 5);
  // };

  return (
    <section className="fixed-container">
      <div className="newdiv">
        <div className="addnote">
          <div className="addnote-div1">
            <i
              className="long arrow alternate left icon"
              onClick={() => navigate(-1)}
            ></i>
          </div>
          <div className="addnote-div2">
            <Form onSubmit={handleSubmit(onSubmit)} className="abc">
              <Form.Field>
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  className="form-input"
                  placeholder="Enter a Title"
                  type="text"
                  {...register("title", {
                    required: true,
                  })}
                />
              </Form.Field>
              {errors.title && <p className="error">Please required Title</p>}
              <div className="form-add">
                <div className="form-add__one">
                  <Form.Field>
                    <label htmlFor="categoryId" className="form-label">
                      Category
                    </label>
                    <select
                      {...register("categoryId", {
                        required: true,
                      })}
                    >
                      <option value="">Select a category</option>
                      {getcategory.map((category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.categoryName}
                          </option>
                        );
                      })}
                    </select>
                    {errors.category && <p>Please select a Category</p>}
                  </Form.Field>
                </div>
                <div className="form-add__two">
                  <button onClick={addCategory} className="btn">
                    +
                  </button>
                </div>
                {/* <div className="form-add__two">
                  <button onClick={() => deleteCategory(id)} className="btn">
                    -
                  </button>
                </div> */}
              </div>

              <div>
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <MDEditor
                  value={content}
                  onChange={setContent}
                  textareaProps={{
                    placeholder: "Please enter Markdown text",
                  }}
                />
                {errors.content && <p>Please check the Content</p>}
              </div>
              <div className="form-button">
                <button
                  type="submit"
                  className="form-button__btn"
                  // onClick={submit}
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <Modal open={showModal} onClose={handleCloseModal}>
        <Modal.Header>Add Category</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleAddCategory}>
            <Form.Field>
              <label>New Category Name</label>
              <input name="categoryName" placeholder="New Category" />
            </Form.Field>
            <Modal.Actions>
              <button className="btn" type="button" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="btn" type="submit">
                Add Category
              </button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    </section>
  );
};

export default AddNote;
