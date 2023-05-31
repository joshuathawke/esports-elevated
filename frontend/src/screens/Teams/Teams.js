import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [expandedTeams, setExpandedTeams] = useState([]);

  useEffect(() => {
    // Fetch teams data from API or any other data source
    // Update the 'teams' state with the fetched data
    // For example:
    // axios.get("/api/teams").then((response) => {
    //     setTeams(response.data);
    // });

    // Mock data for testing
    const mockTeams = [
      {
        id: 1,
        name: "Team A",
        city: "City A",
        country: "Country A",
        dateCreated: "2023-01-01",
        tournaments: ["Tournament A", "Tournament B"],
      },
      {
        id: 2,
        name: "Team B",
        city: "City B",
        country: "Country B",
        dateCreated: "2023-02-01",
        tournaments: ["Tournament C", "Tournament D"],
      },
      {
        id: 3,
        name: "Team C",
        city: "City C",
        country: "Country C",
        dateCreated: "2023-03-01",
        tournaments: ["Tournament E", "Tournament F"],
      },
    ];
    setTeams(mockTeams);
  }, []);

  const toggleExpandTeam = (teamId) => {
    if (expandedTeams.includes(teamId)) {
      setExpandedTeams((prevExpandedTeams) =>
        prevExpandedTeams.filter((id) => id !== teamId)
      );
    } else {
      setExpandedTeams((prevExpandedTeams) => [...prevExpandedTeams, teamId]);
    }
  };

  return (
    <MainScreen title="Teams">
      <Link to="/createMatch">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="sm">
          Create Team
        </Button>
      </Link>

      {teams.map((team) => (
        <Card key={team.id} style={{ display: "flex" }}>
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
              onClick={() => toggleExpandTeam(team.id)}
            >
              {team.name}
            </span>
            <div>
              <Button>Edit</Button>
              <Button variant="danger" className="mx-2">
                Delete
              </Button>
            </div>
          </Card.Header>
          {expandedTeams.includes(team.id) && (
            <Card.Body>
              <Card.Text>
                <strong>City:</strong> {team.city}
              </Card.Text>
              <Card.Text>
                <strong>Country:</strong> {team.country}
              </Card.Text>
              <Card.Text>
                <strong>Date Created:</strong> {team.dateCreated}
              </Card.Text>
              <Card.Text>
                <strong>Tournaments:</strong>{" "}
                {team.tournaments.join(", ")}
              </Card.Text>
            </Card.Body>
          )}
        </Card>
      ))}
    </MainScreen>
  );
};

export default Teams;
