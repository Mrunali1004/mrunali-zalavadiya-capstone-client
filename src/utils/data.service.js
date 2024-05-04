import axios from "axios";

let service = axios.create({
  baseURL: "http://localhost:1010/",
});

const updateToken = () => {
  const token = sessionStorage.getItem("authToken");
  service.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const authLogin = async (email, password) => {
  return await service.post(`auth/login`, { email, password });
};

const authSignUp = async (username, email, password) => {
  return await service.post(`auth/signup`, { username, email, password });
};

const getCategories = async () => {
  updateToken();
  return await service.get(`category`);
};

const addSingleCategory = async (categoryName) => {
  updateToken();
  return await service.post(`category`, { categoryName });
};

const deleteCategory = async (id) => {
  updateToken();
  return await service.delete(`category/${id}`);
};

const getCategoryByKeyword = async (keyword) => {
  updateToken();
  return await service.get(`notes/search/${keyword}`);
};

const getSingleNote = async (noteId) => {
  updateToken();
  return await service.get(`notes/${noteId}`);
};

const updateSingleNote = async (noteId, data) => {
  updateToken();
  return await service.put(`notes/${noteId}`, data);
};

const deleteSingleNote = async (noteId) => {
  updateToken();
  return await service.delete(`notes/${noteId}`);
};

const createSingleNote = async (data) => {
  updateToken();
  return await service.post(`notes/`, data);
};

const getAllNotes = async () => {
  updateToken();
  return await service.get(`notes`);
};

const getAllNotesByCategoryId = async (categoryId) => {
  updateToken();
  return await service.get(`notes/category/${categoryId}`);
};

export {
  updateToken,
  authLogin,
  authSignUp,
  getCategories,
  deleteCategory,
  getCategoryByKeyword,
  getSingleNote,
  updateSingleNote,
  createSingleNote,
  getAllNotes,
  getAllNotesByCategoryId,
  deleteSingleNote,
  addSingleCategory,
};
