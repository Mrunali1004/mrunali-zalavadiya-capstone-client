import React from "react";
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
} from "semantic-ui-react";
import "./ListofNotes.scss";

const ListofNotes = ({ notesdata }) => {
  return (
    <>
      {notesdata.map((e) => {
        const timestamp = e.created_at;
        const date = new Date(timestamp).toLocaleDateString();

        return (
          <Card key={e.id} className="card">
            <CardContent>
              <CardHeader>Category : {e.categoryName}</CardHeader>
              <CardMeta>Title : {e.title}</CardMeta>
              <CardDescription>{e.content}</CardDescription>
            </CardContent>
            <CardContent extra>
              <CardMeta>Created Date: {date}</CardMeta>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default ListofNotes;
