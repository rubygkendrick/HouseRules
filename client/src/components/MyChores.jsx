//Create a page that is visible to all authenticated users that shows the user their assigned chores, 
//allowing them to mark their chores as complete. 
//If the chore does not currently need to be completed, do not display it. 
//You will need to make use of the calculated property you made for the previous task.

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "reactstrap";
import { choreCompleted, getChores, } from "../managers/choreManager";
import { getUserById } from "../managers/userManager";


export default function MyChores({ loggedInUser, setLoggedInUser, roles }) {
    const [user, setUser] = useState({})
    const [allChores, setAllChores] = useState([])
    const navigate = useNavigate();
    const { id } = useParams();

    const getAndResetUser = () => {
        getUserById(id).then(setUser);
    };

    const getAndSetAllChores = () => {
        getChores().then(setAllChores)
    }

    useEffect(() => {
        getAndResetUser();
        getAndSetAllChores();
    }, []);

    const choresToPrint = allChores.filter(chore => chore.choreAssignments?.some(ca => ca.userProfileId == user.id));
   

    return (
        <>
            <h1>My Chores</h1>
            {choresToPrint ? (
                choresToPrint
                    .filter((chore) => chore.overdue)
                    .map((chore) => (
                        <div key={chore.id} className="">
                            <h4>{chore.name}</h4>
                            <p>Overdue: {chore.overdue ? 'Yes' : 'No'}</p>
                            <Button color="success" onClick={() => choreCompleted(chore.id, loggedInUser.id).then(() => navigate("/"))}>
                                Complete Chore
                            </Button>
                        </div>
                    ))
            ) : (
                <p>No assigned Chores</p>
            )}

        </>
    );
}