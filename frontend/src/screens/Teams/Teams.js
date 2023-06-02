import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeam, teamList } from "../../actions/teamActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const Teams = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teamsData = useSelector((state) => state.teamList);
  const { loading, error, teams } = teamsData;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const teamDelete = useSelector((state) => state.teamDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = teamDelete;

  useEffect(() => {
    dispatch(teamList());
    if (!userInfo) {
      navigate("/teams");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTeam(id));
    }
  };

  return (
    <MainScreen title={userInfo ? `Welcome Back ${userInfo.name}..` : 'Welcome to the Teams Page'}>
      {console.log(teams)}
      <Link to="/createTeam">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Team
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {teams &&
        teams
          .filter((filteredTeam) =>
            filteredTeam.name.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((team) => (
            <Accordion key={team.id}>
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
                      {team.name}
                    </Accordion.Toggle>
                  </span>

                  <div>
                    <Button href={`/team/${team.id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(team.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Country - {team.country}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>
                        City: <strong>{team.city}</strong>
                      </p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {team.dateCreated.substring(0, 10)}
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
};

export default Teams;
