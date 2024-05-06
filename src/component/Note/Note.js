import MDEditor from "@uiw/react-md-editor";
import { NavLink } from "react-router-dom";
import { Icon, Label, Segment } from "semantic-ui-react";
import { deleteSingleNote } from "../../utils/data.service";
import { toast } from "react-toastify";
import "./Note.scss";

export default function Note({
  id,
  title,
  content,
  categoryId,
  categoryName,
  created_at,
  modified_at,
  onNotesDeleted,
}) {
  const btndelete = async (id) => {
    try {
      await deleteSingleNote(id);
      toast.success("Notes Deleted");
      onNotesDeleted(id);
    } catch (error) {
      toast.error("Error:", error.message);
    }
  };
  return (
    <Segment raised padded={false} className="custom-segment">
      <div className="card-container" key={id}>
        <div className="card">
          <div>
            <h3 className="title">
              <NavLink to={`/edit/${id}?preview=true`}>{title}</NavLink>
            </h3>
            <span className="small">
              Modified on: {new Date(modified_at).toLocaleDateString()}
            </span>
            <hr />
          </div>

          <div className="editor">
            <MDEditor.Markdown
              source={content}
              style={{ whiteSpace: "pre-wrap", backgroundColor: "transparent" }}
            />
          </div>
          <div className="division">
            <div>
              <NavLink to={`/edit/${id}`}>
                <Icon color="black" name="edit" />
              </NavLink>
            </div>
            <div className="delete">
              <Icon color="red" name="trash" onClick={() => btndelete(id)} />
            </div>
          </div>
        </div>
      </div>
      <Label attached="bottom left" className="category-label">
        {categoryName}
      </Label>
    </Segment>
  );
}
