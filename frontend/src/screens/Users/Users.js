import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useEffect, useState } from "react";
// import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users data from API or any other data source
        // Update the 'users' state with the fetched data
        // For example:
        // axios.get("/api/users").then((response) => {
        //     setUsers(response.data);
        // });

        // Mock data for testing
        const mockUsers = [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Smith" },
            { id: 3, name: "Mike Johnson" },
        ];
        setUsers(mockUsers);
    }, []);

    return (
        <MainScreen title="Welcome Back">
            <Link to="/createMatch">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="sm">
                    Create Match
                </Button>
            </Link>

            {users.map((user) => (
                <Card key={user.id} style={{ display: "flex" }}>
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
                        >
                            {user.name}
                        </span>
                        <div>
                            <Button>Edit</Button>
                            <Button variant="danger" className="mx-2">
                                Delete
                            </Button>
                        </div>
                    </Card.Header>
                </Card>
            ))}
        </MainScreen>
    );
};

export default Users;
