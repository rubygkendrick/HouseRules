import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { getChores } from "../managers/choreManager";


export default function ChoresList({ loggedInUser, setLoggedInUser, roles }) {
    const [chores, setChores] = useState([]);

    const getAndResetAllChores = () => {
        getChores().then(setChores);
    };

    useEffect(() => {
        getAndResetAllChores();
    }, []);
    return (
        <>
            <h1>Chores</h1>
            {chores.map((chore) => (
                <div
                    key={chore.id}
                    className=""
                >
                    <h4>{chore.name}</h4>
                    <p>Difficulty Level: {chore.difficulty}</p>
                    <p>Frequency Days: {chore.choreFrequencyDays}</p>
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
        </>
    );
}