import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeam, updateTeam } from "../../actions/teamActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

const SingleTeam = () => {
const { id } = useParams(); // Use useParams to access the "id" parameter
const [name, setName] = useState("");
const [country, setCountry] = useState("");
const [city, setCity] = useState("");
const [dateCreated, setDateCreated] = useState("");

const dispatch = useDispatch();
const navigate = useNavigate(); // Initialize useNavigate

const teamUpdate = useSelector((state) => state.teamUpdate);
const { loading, error } = teamUpdate;

const teamDelete = useSelector((state) => state.teamDelete);
const { loading: loadingDelete, error: errorDelete } = teamDelete;

const deleteHandler = (id) => {
if (window.confirm("Are you sure?")) {
dispatch(deleteTeam(id));
}
navigate("/teams");
};

useEffect(() => {
const fetchData = async () => {
try {
const { data } = await axios.get(/api/teams/${id});
setName(data.name);
setCountry(data.country);
setCity(data.city);
setDateCreated(data.dateCreated);
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
setCountry("");
setCity("");
setDateCreated("");
};

const updateHandler = (e) => {
e.preventDefault();
dispatch(updateTeam(id, name, country, city, dateCreated));
if (!name || !country || !city || !dateCreated) return;

scss
Copy code
resetHandler();
navigate("/teams");
};

return (
<MainScreen title="Edit Team">
<Card>
<Card.Header>Edit Team</Card.Header>
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
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Team Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="dateCreated">
          <Form.Label>Date Created</Form.Label>
          <Form.Control
            type="date"
            value={dateCreated}
            onChange={(e) => setDateCreated(e.target.value)}
          />
        </Form.Group>

        {loading && <Loading size={50} />}
        <Button variant="primary" type="submit">
          Update Team
        </Button>
        <Button
          className="mx-2"
          variant="danger"
          onClick={() => deleteHandler(id)}
        >
          Delete Team
        </Button>
      </Form>
    </Card.Body>
  </Card>
</MainScreen>
);
};

export default SingleTeam;