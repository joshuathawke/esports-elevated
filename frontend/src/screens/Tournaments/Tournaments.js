import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [expandedTournaments, setExpandedTournaments] = useState([]);

  useEffect(() => {
    // Fetch tournaments data from API or any other data source
    // Update the 'tournaments' state with the fetched data
    // For example:
    // axios.get("/api/tournaments").then((response) => {
    //     setTournaments(response.data);
    // });

    // Mock data for testing
    const mockTournaments = [
      {
        id: 1,
        name: "Tournament A",
        description: "Description A",
        game_title: "Game A",
        start_date: "2023-01-01",
        end_date: "2023-01-10",
        matches: ["Match A", "Match B"],
      },
      {
        id: 2,
        name: "Tournament B",
        description: "Description B",
        game_title: "Game B",
        start_date: "2023-02-01",
        end_date: "2023-02-10",
        matches: ["Match C", "Match D"],
      },
      {
        id: 3,
        name: "Tournament C",
        description: "Description C",
        game_title: "Game C",
        start_date: "2023-03-01",
        end_date: "2023-03-10",
        matches: ["Match E", "Match F"],
      },
    ];
    setTournaments(mockTournaments);
  }, []);

  const toggleExpandTournament = (tournamentId) => {
    if (expandedTournaments.includes(tournamentId)) {
      setExpandedTournaments((prevExpandedTournaments) =>
        prevExpandedTournaments.filter((id) => id !== tournamentId)
      );
    } else {
      setExpandedTournaments((prevExpandedTournaments) => [
        ...prevExpandedTournaments,
        tournamentId,
      ]);
    }
  };

  return (
    <MainScreen title="Tournaments">
      <Link to="/createMatch">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="sm">
          Create Tournament
        </Button>
      </Link>

      {tournaments.map((tournament) => (
        <Card key={tournament.id} style={{ display: "flex" }}>
          <Card.Header style={{ display: "flex" }}>
            <span
              style={{
                color: "black",
                flex: 1,
                cursor: "pointer",
                alignSelf: "center",
                fontSize: 20,
                textDecoration: "none",
              }}
              onClick={() => toggleExpandTournament(tournament.id)}
            >
              {tournament.name}
            </span>
            <div>
              <Button>Edit</Button>
              <Button variant="danger" className="mx-2">
                Delete
              </Button>
            </div>
          </Card.Header>
          {expandedTournaments.includes(tournament.id) && (
            <Card.Body>
              <Card.Text>
                <strong>Description:</strong> {tournament.description}
              </Card.Text>
              <Card.Text>
                <strong>Game Title:</strong> {tournament.game_title}
              </Card.Text>
              <Card.Text>
                <strong>Start Date:</strong> {tournament.start_date}
              </Card.Text>
              <Card.Text>
                <strong>End Date:</strong> {tournament.end_date}
              </Card.Text>
              <Card.Text>
                <strong>Matches:</strong> {tournament.matches.join(", ")}
              </Card.Text>
            </Card.Body>
          )}
        </Card>
      ))}
    </MainScreen>
  );
};

export default Tournaments;
