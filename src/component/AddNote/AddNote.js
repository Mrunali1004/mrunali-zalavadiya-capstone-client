import React, { useEffect, useState } from "react";
import "./AddNote.scss";
import { useForm } from "react-hook-form";
import { Container, Form, Header, Icon, Segment } from "semantic-ui-react";
import {
  createSingleNote,
  getCategories,
  getSingleNote,
  updateSingleNote,
} from "../../utils/data.service";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-toastify";
import EditCategoryModal from "../../component/EditCategoryModel/EditCategoryModal";

const AddNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const setData = async () => {
      try {
        if (!id) return;
        const response = await getSingleNote(id);
        const { title, categoryId, content } = response.data;
        setTimeout(() => {
          setValue("categoryId", `${categoryId}`, { shouldDirty: true });
          setContent(content);
          setValue("title", title, { shouldDirty: true });
        }, 100);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    setData();
  }, [id, setValue]);

  const onSubmit = async (e) => {
    try {
      !id
        ? await createSingleNote({ ...e, content })
        : await updateSingleNote(id, { ...e, content });

      toast.success(
        id ? "Note Edited Successfully.." : "Note added successfully.."
      );
      navigate("/", { replace: true });
    } catch (error) {
      console.log("Error", error);
      toast.error(e.message);
    }
  };

  const addCategory = () => {
    setShowModal(true);
  };

  const handleCloseModal = (updatedCategories) => {
    console.log("calling");
    console.log(updatedCategories)
    setCategories(updatedCategories);
    setShowModal(false);
  };

  if (searchParams.get("preview")) {
    return (
      <div className="container">
        <div className="container__div1">
          <div>
            <Icon
              name="long arrow alternate left "
              onClick={() => navigate(-1)}
            />
          </div>
          <div>
            <Icon name="edit" onClick={() => setSearchParams({})} />
          </div>
        </div>
        <div className="container__div2">
          <h1>{getValues("title")}</h1>
          <MDEditor.Markdown
            source={content}
            style={{ whiteSpace: "pre-wrap", backgroundColor: "transparent" }}
          />
        </div>
      </div>
    );
  }

  return (
    <section className="fixed-container">
      <div className="note-form">
        <div className="note-form__header">
          <div className="note-form__icon-container">
            <i
              className="long arrow alternate left icon"
              onClick={() => navigate(-1)}
            ></i>
          </div>
          <div>
            <Form onSubmit={handleSubmit(onSubmit)} className="formnote">
              <div className="formnote__con">
                <Form.Field className="wrap">
                  <label htmlFor="title" className="formnote__label">
                    Title
                  </label>
                  <input
                    className="formnote__input"
                    placeholder="Enter a Title"
                    type="text"
                    {...register("title", {
                      required: true,
                    })}
                  />
                </Form.Field>
                {errors.title && <p className="error">Please required Title</p>}
                <div className="note-form__category">
                  <div className="note-form__category-select">
                    <Form.Field>
                      <label htmlFor="categoryId" className="form-label">
                        Category
                      </label>
                      <select
                        className="note-form__category-input"
                        {...register("categoryId", {
                          required: true,
                        })}
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => {
                          return (
                            <option key={category.id} value={category.id}>
                              {category.categoryName}
                            </option>
                          );
                        })}
                      </select>
                      {errors.category && (
                        <p className="error">Please select a Category</p>
                      )}
                    </Form.Field>
                  </div>
                  <div className="note-form__category-add">
                    <button
                      type="button"
                      onClick={addCategory}
                      className="note-form__category-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="note-form__description">
                <MDEditor
                  height={400}
                  value={content}
                  onChange={setContent}
                  textareaProps={{
                    placeholder: "Please enter Markdown text",
                  }}
                />
                {errors.content && (
                  <p className="error">Please check the Content</p>
                )}
              </div>
              <div className="note-form__actions">
                <button type="submit" className="note-form__actions-btn">
                  {id ? "Save Note" : "Create Note"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <EditCategoryModal
        open={showModal}
        setOpen={setShowModal}
        onModalClose={handleCloseModal}
      />
    </section>
  );
};

export default AddNote;
