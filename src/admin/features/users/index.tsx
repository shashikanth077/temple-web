import React, { useEffect } from 'react';
import Users from './users';
import { adminUserActions } from './userSlice';
import { useRedux } from 'hooks';

const UsersMain = () => {
    const { dispatch } = useRedux();

    useEffect(() => {
        dispatch(adminUserActions.getUsers());
    }, [dispatch]);

    return (
        <Users />
    );
};

export default UsersMain;
