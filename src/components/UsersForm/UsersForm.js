import React, { useState } from 'react';
import Card from '../../UI/Card/Card';
import Loader from '../../UI/Loader/Loader';
import './UsersForm.css';

const usersForm = React.memo((props) => {

    const [nameValue, setNameValue] = useState('');
    const [ageValue, setAgeValue] = useState('');
    const [genderValue, setGenderValue] = useState('male');
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        let user = {
            name :nameValue,
            age: ageValue,
            gender: genderValue
        }

        setIsLoading(true);

        fetch('https://url.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {

            return response.json();

        }).then(responseData => {

            setNameValue('');
            setAgeValue('');
            setGenderValue('male');
            setIsLoading(false);

            // setUserIngredients(prevIngredients => [
            //     ...prevIngredients,
            //     { id: responseData.name, ...ingredient }
            // ]);
        });
    };

    return (
        <section className="users-form">
            <Card>
                <form onSubmit={submitHandler}>
                    <div className="form-control">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={nameValue} onChange={(event) => setNameValue(event.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="age">Age</label>
                        <input type="text" id="age" value={ageValue} onChange={(event) => setAgeValue(event.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" value={genderValue} onChange={(event) => setGenderValue(event.target.value)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="users-form-actions">
                        <button type="submit">Add User</button>
                        {isLoading && <Loader/>}
                    </div>
                </form>
            </Card>
        </section>
    )

});

export default usersForm;