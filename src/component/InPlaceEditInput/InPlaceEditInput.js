import { useEffect, useState } from "react";
import { Button, Icon, Input } from "semantic-ui-react";
import "./InPlaceEditInput.scss";

export default function InPlaceEditInput({ onEditSuccessful, value }) {
  const [editMode, setEditMode] = useState();
  const [inputValue, setInputValue] = useState();
  const [inputError, setInputError] = useState();

  const onSave = () => {
    if (!inputValue) return setInputError(true);
    setEditMode(false);
    onEditSuccessful(inputValue);
  };

  const onChange = (e) => {
    setInputError(false);
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);
  return (
    <div className="categories-list">
      {editMode ? (
        <>
          <Input error={inputError} value={inputValue} onChange={onChange} />
          {inputError && <small>Field can not be blank</small>}
          <Button circular onClick={onSave} basic color="green" icon>
            <Icon name="save" />
          </Button>
        </>
      ) : (
        <>
          {inputValue}
          <button
            className="iconbutton"
            circular
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            icon
          >
            <Icon name="edit" />
          </button>
        </>
      )}
    </div>
  );
}
