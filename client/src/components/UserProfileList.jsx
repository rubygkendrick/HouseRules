import { useState, useEffect } from "react";
import { getUserProfiles } from "../managers/userManager";
import { Link } from "react-router-dom";


export default function UserProfileList() {
    const [users, setUsers] = useState([]);

    const getAndResetAllUsers = () => {
        getUserProfiles().then(setUsers);
    };

    useEffect(() => {
        getAndResetAllUsers();
    }, []);
    return (
        <>
            <h1>User Profiles</h1>
            {users.map((user) => (
                <div
                    key={user.id}
                    className=""
                >
                    <Link to={`/userprofiles/${user.id}`}>
                        <h3>{user.firstName} {user.lastName}</h3>
                    </Link>

                </div>
            ))}
        </>
    );
}