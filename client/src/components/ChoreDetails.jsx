import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { assignChore, getChoreById, unassignChore } from "../managers/choreManager";
import { getUserProfiles } from "../managers/userManager";

//need to get all of the users and display them in checkboxes
//hold state of the current assignees
//hold state of the new assignees
//on the change we want to update the database with the choreassignments 
//need access to the choreAssignments table

export default function ChoreDetails() {
    const [chore, setChore] = useState([]);
    const { id } = useParams();
    const [users, setUsers] = useState([]);
   

    const getAndResetChore = () => {
        getChoreById(id).then(setChore);
    };

    const getAndSetUsers = () => {
        getUserProfiles().then(setUsers)
    }

    const handleCheckboxChange = (event, userId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            assignChore(chore.id,userId).then(() => getAndResetChore());
        } else {
            unassignChore(chore.id,userId).then(() => getAndResetChore());
        }
    };

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
                <p>{chore.name}</p>
                <h4>Difficulty Level:</h4>
                <p>{chore.difficulty}</p>

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
                <h4>Most Recent Completion:</h4>
                <div>
                    {mostRecentCompletion ? (
                        <div>{new Date(mostRecentCompletion.completedOn).toLocaleString()}</div>
                    ) : (
                        <div>No completions yet</div>
                    )}
                </div>
            </div>

        </>
    );
}