import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { choreCompleted, getChores } from "../managers/choreManager";
import { Button } from "reactstrap";


export default function ChoresList({ loggedInUser, setLoggedInUser, roles }) {
    const [chores, setChores] = useState([]);
    const navigate = useNavigate();

    const getAndResetAllChores = () => {
        getChores().then(setChores);
    };

    useEffect(() => {
        getAndResetAllChores();
    }, []);

    const handleCreateClick = () => {
        navigate("/chores/create")
    }

   
    return (
        <>
            <h1>Chores</h1>
            {chores.map((chore) => (
                <div
                    key={chore.id}
                    className=""
                >
                    <h4 style={{ color: chore.overdue ? "red" : "black" }}>{chore.name}</h4>
                    <p>Difficulty Level: {chore.difficulty}</p>
                    <p>Frequency Days: {chore.choreFrequencyDays}</p>
                    <Button color="success" onClick={() => choreCompleted(chore.id, loggedInUser.id).then(navigate("/"))}>Complete Chore</Button>
                    {loggedInUser?.roles?.includes("Admin") ? (
                        <Link to={`/chores/${chore.id}`}>
                            <h5>Chore Details</h5>
                        </Link>
                    ) : null}

                    {loggedInUser?.roles?.includes("Admin") ? (
                        <button>Delete</button>
                    ) : null}

                </div>
            ))}
            {loggedInUser?.roles?.includes("Admin") ? (
                <Button color="danger"
                onClick={handleCreateClick}
                >Create Chore</Button>
            ) : null}
        </>
    );
}