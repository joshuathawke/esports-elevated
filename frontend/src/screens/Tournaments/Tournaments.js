import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTournament, tournamentList } from "../../actions/tournamentActions";
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const Tournaments = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tournamentsData = useSelector((state) => state.tournamentList);
  const { loading, error, tournaments } = tournamentsData;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tournamentDelete = useSelector((state) => state.tournamentDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = tournamentDelete;

  useEffect(() => {
    dispatch(tournamentList());
    if (!userInfo) {
      navigate("/tournaments");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTournament(id));
    }
  };

  return (
    <MainScreen title={userInfo ? `Welcome Back ${userInfo.name}..` : 'Welcome to the Tournaments Page'}>
      <Link to="/createTournament">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Tournament
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {tournaments &&
        tournaments
          .filter((filteredTournament) =>
            filteredTournament.name.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((tournament) => (
            <Card key={tournament.id} className="my-3 p-3 rounded">
              <Card.Body>
                <Link to={`/tournament/${tournament.id}`}>
                  <Card.Title as="div">
                    <strong>{tournament.name}</strong>
                  </Card.Title>
                </Link>
                <Card.Text as="div">
                  <strong>Location: </strong>
                  {tournament.location}
                </Card.Text>
                <Card.Text as="div">
                  <strong>Start Date: </strong>
                  {tournament.startDate.substring(0, 10)}
                </Card.Text>
                <Card.Text as="div">
                  <strong>End Date: </strong>
                  {tournament.endDate.substring(0, 10)}
                </Card.Text>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(tournament.id)}
                >
                  Delete Tournament
                </Button>
              </Card.Body>
            </Card>
          ))}
    </MainScreen>
  );
};

export default Tournaments;
