import MDEditor from "@uiw/react-md-editor";
import { NavLink } from "react-router-dom";
import { Icon, Label, Segment } from "semantic-ui-react";
import { deleteSingleNote } from "../../utils/data.service";
import { toast } from "react-toastify";

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

            <hr />
          </div>

          <div className="editor">
            <MDEditor.Markdown
              source={content}
              style={{ whiteSpace: "pre-wrap", backgroundColor: "transparent" }}
            />
          </div>
          <div className="division">
            <span className="small">
              Modified on: {new Date(modified_at).toLocaleDateString()}
            </span>
            <div>
              <NavLink to={`/edit/${id}`}>
                <Icon color="black" name="edit" />
              </NavLink>
            </div>
            <div>
              <Icon color="red" name="trash" onClick={() => btndelete(id)} />
            </div>
          </div>
        </div>
      </div>
      <Label color="teal" attached="bottom left">
        {categoryName}
      </Label>
    </Segment>
  );
}
