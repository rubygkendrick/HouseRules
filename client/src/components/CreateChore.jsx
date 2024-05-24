import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { createChore } from "../managers/choreManager";


export default function CreateChore({ loggedInUser }) {
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [choreFrequencyDays, setChoreFrequencyDays] = useState(0);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newChore = {
            name: name,
            difficulty: parseInt(difficulty),
            choreFrequencyDays: parseInt(choreFrequencyDays)
        };

        createChore(newChore).then((res) => {
            if (res.errors) {
                setErrors(res.errors);
            } else {
                navigate("/chores/create");
            }
        })
    };

    return (
        <>
            <div style={{ color: "red" }}>
                {errors && Object.keys(errors).map((key) => (
                    <p key={key}>
                        {key}: {errors[key].join(",")}
                    </p>
                ))}
            </div>
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
                        value={difficulty}
                        onChange={(e) => {
                            setDifficulty(e.target.value);
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Frequency Days</Label>
                    <Input
                        type="number"
                        list="frequencyOptions"
                        value={choreFrequencyDays}
                        onChange={(e) => setChoreFrequencyDays(e.target.value)}
                    />
                    <datalist id="frequencyOptions">
                        <option value="1" />
                        <option value="3" />
                        <option value="7" />
                        <option value="10" />
                        <option value="14" />
                    </datalist>
                </FormGroup>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </Form>


        </>
    );
}