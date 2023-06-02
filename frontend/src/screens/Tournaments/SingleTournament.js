import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteTournament, updateTournament } from "../../actions/tournamentActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useParams, useNavigate } from "react-router-dom";

const SingleTournament = () => {
const { id } = useParams(); 
const [name, setName] = useState("");
const [location, setLocation] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

const dispatch = useDispatch();
const navigate = useNavigate(); 

const tournamentUpdate = useSelector((state) => state.tournamentUpdate);
const { loading, error } = tournamentUpdate;

const tournamentDelete = useSelector((state) => state.tournamentDelete);
const { loading: loadingDelete, error: errorDelete } = tournamentDelete;

const deleteHandler = (id) => {
if (window.confirm("Are you sure?")) {
dispatch(deleteTournament(id));
}
navigate("/tournaments");
};

useEffect(() => {
const fetchData = async () => {
try {
const { data } = await axios.get(/api/tournaments/${id});
setName(data.name);
setLocation(data.location);
setStartDate(data.startDate);
setEndDate(data.endDate);
} catch (error) {
console.error(error);
}
};

scss
Copy code
fetchData();
}, [id]);

const resetHandler = () => {
setName("");
setLocation("");
setStartDate("");
setEndDate("");
};

const updateHandler = (e) => {
e.preventDefault();
dispatch(updateTournament(id, name, location, startDate, endDate));
if (!name || !location || !startDate || !endDate) return;

scss
Copy code
resetHandler();
navigate("/tournaments");
};

return (
<MainScreen title="Edit Tournament">
<Card>
<Card.Header>Edit Tournament</Card.Header>
<Card.Body>
<Form onSubmit={updateHandler}>
{loadingDelete && <Loading />}
{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
{errorDelete && (
<ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
)}

php
Copy code
        <Form.Group controlId="name">
          <Form.Label>Tournament Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Tournament Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>

        {loading && <Loading size={50} />}
        <Button variant="primary" type="submit">
          Update Tournament
        </Button>
        <Button
          className="mx-2"
          variant="danger"
          onClick={() => deleteHandler(id)}
        >
          Delete Tournament
        </Button>
      </Form>
    </Card.Body>
  </Card>
</MainScreen>
);
};

export default SingleTournament;