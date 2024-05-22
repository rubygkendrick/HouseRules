import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { createChore } from "../managers/choreManager";


export default function CreateChore({ loggedInUser }) {
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [choreFrequencyDays, setChoreFrequencyDays] = useState(0);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newChore = {
            name: name,
            difficulty: parseInt(difficulty),
            choreFrequencyDays: parseInt(choreFrequencyDays)
        };

        createChore(newChore).then(() => {
            navigate("/chores");
        });
    };


    return (
        <>
            <h2>Create a New Chore</h2>
            <Form>
                <FormGroup>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Difficulty level: 1 - 10</Label>
                    <Input
                        type="text"
                        value= {difficulty}
                        onChange={(e) => {
                            setDifficulty(e.target.value);
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Frequency Days</Label>
                    <Input
                        type="text"
                        value= {choreFrequencyDays}
                        onChange={(e) => {
                            setChoreFrequencyDays(e.target.value);
                        }}
                    />
                </FormGroup>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </Form>
        </>
    );
}