import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteMatch, matchList } from "../../actions/matchActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const Matches = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const matchesData = useSelector((state) => state.matchList);
  const { loading, error, matches } = matchesData;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const matchDelete = useSelector((state) => state.matchDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = matchDelete;

  const matchCreate = useSelector((state) => state.matchCreate);
  const { success: successCreate } = matchCreate;

  const matchUpdate = useSelector((state) => state.matchUpdate);
  const { success: successUpdate } = matchUpdate;

  useEffect(() => {
    dispatch(matchList());
    if (!userInfo) {
      navigate("/matches");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteMatch(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(matches)}
      <Link to="/createMatch">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Match
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {matches &&
        matches
          .filter((filteredMatch) =>
            filteredMatch.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((match) => (
            <Accordion key={match.id}>
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {match.title}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button href={`/match/${match.id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(match.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {match.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{match.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {match.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default Matches;