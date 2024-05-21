import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { getUserById } from "../managers/userManager";


export default function UserProfileDetails() {
    const [user, setUser] = useState([]);
    const { id } = useParams();

    const getAndResetUser = () => {
        getUserById(id).then(setUser);
    };

    useEffect(() => {
        getAndResetUser();
    }, []);

    return (
        <>
            <h1>User Details</h1>

            <div
                key={user.id}
                className=""
            >
                <h4>Full Name:</h4>
                <p>{user.firstName} {user.lastName}</p>
                <h4>Email:</h4>
                <p>{user.email}</p>
                <h4>User Name:</h4>
                <p>{user.userName}</p>
                <h4>Address:</h4>
                <p>{user.address}</p>
                <h4>Currently Assigned Chores:</h4>
                <div>
                    {user.assignedChores?.map((chore) => (
                        <div key={chore.id}>{chore.name}</div>
                    ))}
                </div>
                <h4>Completed Chores:</h4>
                <div>
                    {user.completedChores?.map((chore) => (
                        <div key={chore.id}>
                            {chore.name}
                            <div>
                                {chore.choreCompletions.map((completion) => (
                                    <div key={completion.id}>
                                        Completed on: {new Date(completion.completedOn).toLocaleString()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>


            </div>

        </>
    );
}