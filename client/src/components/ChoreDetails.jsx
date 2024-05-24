import { useState, useEffect } from "react";
import {Button} from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import { assignChore, getChoreById, unassignChore, updateChore } from "../managers/choreManager";
import { getUserProfiles } from "../managers/userManager";


export default function ChoreDetails() {
    const [chore, setChore] = useState([]);
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [choreName, setChoreName] = useState("");
    const [choreDifficulty, setChoreDifficulty] = useState(0);
    const [choreFrequency, setChoreFrequecy] = useState(0);
    const navigate = useNavigate();

    const getAndResetChore = () => {
        getChoreById(id).then(setChore);
    };

    const getAndSetUsers = () => {
        getUserProfiles().then(setUsers)
    }

    const handleCheckboxChange = (event, userId) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            assignChore(chore.id, userId).then(() => getAndResetChore());
        } else {
            unassignChore(chore.id, userId).then(() => getAndResetChore());
        }
    };

    const handleUpdateChore = () => {
        const updatedChore = {
            id: chore.id,
            name: choreName,
            difficulty: choreDifficulty,
            choreFrequencyDays: choreFrequency
        }
        updateChore(updatedChore).then(() => navigate("/chores"))
    }

    useEffect(() => {
        getAndResetChore();
        getAndSetUsers();
    }, []);

    const mostRecentCompletion =
        chore.choreCompletions?.sort((a, b) => new Date(b.completedOn) - new Date(a.completedOn))[0];

    return (
        <>
            <h1>Chore Details</h1>

            <div
                key={chore.id}
                className=""
            >
                <h4>Name:</h4>
                <fieldset>
                    <div className="form-group">
                        <div className="form-radio">

                            <label key={chore.id} >
                                <input className="checkbox"
                                    type="text"
                                    placeholder={chore.name}
                                    onChange={(event) => {
                                        setChoreName(event.target.value)
                                    }}
                                >
                                </input>
                            </label>
                        </div>

                    </div>
                </fieldset>
                <h4>Difficulty Level:</h4>
                <fieldset>
                    <div className="form-group">
                        <div className="form-radio">
                            <label key={chore.id} >
                                <input className="checkbox"
                                    type="number"
                                    placeholder={chore.difficulty}
                                    onChange={(event) => {   
                                        setChoreDifficulty(parseInt(event.target.value))
                                    }}
                                >
                                </input>
                            </label>
                        </div>
                    </div>
                </fieldset>
                <h4>Current Assignees:</h4>
                <fieldset>
                    <div className="form-group">
                        <div className="form-radio">
                            {users.map(user => (
                                <label key={user.id} >
                                    <input className="checkbox"
                                        type="checkbox"
                                        value={user.id}
                                        defaultChecked={chore.choreAssignments?.some(ca => ca.userProfile.id === user.id)}
                                        onChange={(event) => handleCheckboxChange(event, user.id)}
                                    >
                                    </input>
                                    {user.firstName}
                                </label>
                            ))}
                        </div>
                    </div>
                </fieldset>
                <h4>Chore Frequency:</h4>
                <fieldset>
                    <div className="form-group">
                        <div className="form-radio">
                            <label key={chore.id} >
                                <input className="checkbox"
                                    type="text"
                                    placeholder={chore.choreFrequencyDays}
                                    onChange={(event) => {
                                        setChoreFrequecy(parseInt(event.target.value))
                                    }}
                                >
                                </input>
                            </label>
                        </div>

                    </div>
                </fieldset>
                <h4>Most Recent Completion:</h4>
                <div>
                    {mostRecentCompletion ? (
                        <div>{new Date(mostRecentCompletion.completedOn).toLocaleString()}</div>
                    ) : (
                        <div>No completions yet</div>
                    )}
                </div>
            </div>
            <div>
                <Button color={"danger"}
                onClick={handleUpdateChore}
                >Update Chore</Button>
            </div>

        </>
    );
}