import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Mainscreen from "../../components/mainscreen";
import "./MyNotes.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("are you sure")) {
      console.log(id);
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <Mainscreen title={`welcome back ${userInfo.name}..`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          create New Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}

      {notes
        ?.reverse()
        .filter((filteredNote) => {
          return filteredNote.title
            .toLowerCase()
            .includes(search.toLowerCase());
        })
        .map((note) => (
          <Accordion defaultActiveKey="0" key={note._id} flush>
            <Accordion.Item eventKey="1">
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: "1",
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: "38",
                    }}
                  >
                    <Accordion.Header>{note.title}</Accordion.Header>
                  </span>
                  <div>
                    <Button href={`/note/${note._id}`} className="mx-2">
                      <AiOutlineEdit size="1.2em" title="Edit"/>
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-1"
                      onClick={() => deleteHandler(note._id)}
                    >
                      <AiFillDelete size="1.2em" title="Delete" />
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Body>
                  <Card.Body>
                    <h4>
                      <Badge bg="success">category-{note.category}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          </Accordion>
        ))}
    </Mainscreen>
  );
};

export default MyNotes;
