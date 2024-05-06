import { useEffect, useState } from "react";
import {
  Button,
  Header,
  Icon,
  Input,
  List,
  Modal,
  ModalActions,
  ModalContent,
} from "semantic-ui-react";
import {
  addSingleCategory,
  editSingleCategory,
  getCategories,
} from "../../utils/data.service.js";
import { toast } from "react-toastify";
import InPlaceEditInput from "../../component/InPlaceEditInput/InPlaceEditInput";
import "./EditCategoryModal.scss";

export default function EditCategoryModal({ open, setOpen, onModalClose }) {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (e) {
        toast.error(e.message);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryEdit = async (id, newValue) => {
    try {
      const response = await editSingleCategory(id, newValue);
      toast.success(response.data.message);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleAddNewCategory = async () => {
    try {
      const response = await addSingleCategory(newCategoryName);
      const { categoryName, id, userId } = response.data.category;
      setCategories([...categories, { categoryName, id, userId }]);
      toast.success(response.data.message);
      setNewCategoryName("");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
    >
      <Header icon>Edit Categories</Header>
      <ModalContent>
        <div>
          <List
            items={categories.map(({ categoryName, id }) => (
              <InPlaceEditInput
                key={id}
                value={categoryName}
                onEditSuccessful={(newValue) =>
                  handleCategoryEdit(id, newValue)
                }
              />
            ))}
          />
        </div>
        <div className="edit-category">
          <input
          className="edit-category__inputdata"
            name="categoryName"
            placeholder="New Category"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />

          <button className="edit-category__addbtn" onClick={handleAddNewCategory}>
            Add
          </button>
        </div>
      </ModalContent>
      <ModalActions>
        <Button color="green" inverted onClick={() => onModalClose(categories)}>
          <Icon name="checkmark" /> Save and Close
        </Button>
      </ModalActions>
    </Modal>
  );
}
