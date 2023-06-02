import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteMatch, updateMatch } from "../../actions/matchActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useParams } from "react-router-dom";


const SingleMatch = ({ match: propsMatch, history }) => {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { match } = useParams();

  const dispatch = useDispatch();

  const matchUpdate = useSelector((state) => state.matchUpdate);
  const { loading, error } = matchUpdate;

  const matchDelete = useSelector((state) => state.matchDelete);
  const { loading: loadingDelete, error: errorDelete } = matchDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteMatch(id));
    }
    history.push("/matches");
  };

  useEffect(() => {
    const fetchData = async () => {
  try {
    const { data } = await axios.get(`/api/matches/${match}`);
        setTeam1(data.team1);
        setTeam2(data.team2);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [match, match.params.id]);

  const resetHandler = () => {
    setTeam1("");
    setTeam2("");
    setStartTime("");
    setEndTime("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateMatch(match.params.id, team1, team2, startTime, endTime));
    if (!team1 || !team2 || !startTime || !endTime) return;

    resetHandler();
    history.push("/matches");
  };

  return (
    <MainScreen title="Edit Match">
      <Card>
        <Card.Header>Edit Match</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}

            <Form.Group controlId="team1">
              <Form.Label>Team 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Team 1"
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="team2">
              <Form.Label>Team 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Team 2"
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Match
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Match
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
};

export default SingleMatch;