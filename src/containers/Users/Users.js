import React from 'react';
import UsersForm from '../../components/UsersForm/UsersForm';
import UsersGrid from '../../components/UsersGrid/UsersGrid';

const users = (props) => {

    return (
        <>
            <UsersForm></UsersForm>
            <UsersGrid></UsersGrid>
        </>
    )
};

export default users;