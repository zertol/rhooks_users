import React, { useState, useEffect, useCallback, useMemo, useReducer } from 'react';
import Card from '../../UI/Card/Card';
import TextFilter from '../GridFilter/TextFilter';
import './UsersGrid.css';

const usersReducer = (currentUsers, action) => {
    switch (action.type) {
        case 'SET':
            return action.users;
        //       case 'ADD':
        //         console.log(currentIngs);
        //         return { ingredients: [...currentIngs.ingredients, action.ingredient] };
        //       case 'DELETE':
        //         return { ingredients: currentIngs.ingredients.filter(ing => ing.id !== action.id) };
        case 'FILTER':
            const initList = action.initList;
            const filterValue = action.filterValue;
            const filterField = action.filterField;
            //   console.log(filterVal);
            return initList.filter(user => user[filterField].toString().toLowerCase().includes(filterValue));
        // return action.filteredUsers;
        default:
            throw new Error('bla');
    }
}

const UsersGrid = React.memo((props) => {

    const [usersList, dispatchUser] = useReducer(usersReducer, []);

    const [initList, setInitList] = useState([]);

    // const [filterValue, setFilterValue] = useState('');

    // const filterValueRef = useRef();



    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (filterValue === filterValueRef.current.value) {
    //             setUsersList(initList.filter(user => user.name.toLowerCase().includes(filterValue.toLowerCase())
    //                 || user.age.toString().toLowerCase().includes(filterValue.toLowerCase())
    //                 || user.gender.toLowerCase().includes(filterValue.toLowerCase())
    //             ));
    //         }
    //         return () => {
    //             clearTimeout(timer);
    //         }
    //     }, 500);

    // }, [filterValue, initList, filterValueRef]);



    useEffect(() => {
        fetch('https://url.firebaseio.com/users.json').then(response => {

            return response.json();

        }).then(responseData => {

            const loadedUsers = [];

            for (const key in responseData) {
                const element = responseData[key];

                loadedUsers.push({
                    id: key,
                    ...element
                });
            }
            // setUsersList(loadedUsers);
            dispatchUser({ type: 'SET', users: loadedUsers });
            setInitList(loadedUsers);


        });
    }, []);

    /************** with usecallback due to useEffect in Search Component **************** */
    // const filteredListHandler = useCallback((filterValue, filterField) => {
    //     // console.log(filterValue);
    //     // console.log(filterField);
    //     dispatchUser({ type: 'FILTER', initList: initList, filterValue: filterValue, filterField: filterField });
    // },[initList]);


    const searchListHandler = (filterValue, filterField) => {
        // console.log(filterValue);
        // console.log(filterField);
        dispatchUser({ type: 'FILTER', initList: initList, filterValue: filterValue, filterField: filterField });
    };

    // let users = null;


    // users = <>
    //     {usersList.map(user => {
    //     return (
    //         <tr key={user.name}>
    //             <td>{user.name}</td>
    //             <td>{user.age}</td>
    //             <td>{user.gender}</td>
    //         </tr>
    //     );
    // })}
    // </>


    const users = useMemo(() => {
        return (
            <>
                {usersList.map(user => {
                    return (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.gender}</td>
                        </tr>
                    );
                })}
            </>
        )
    }, [usersList])


    // const users = () => {
    //   return  usersList.map(user => {
    //         return (
    //             <tr key={user.name}>
    //                 <td>{user.name}</td>
    //                 <td>{user.age}</td>
    //                 <td>{user.gender}</td>
    //             </tr>
    //         );
    //     })
    // }

    return (
        <section className="users-grid">
            <Card>
                <table>
                    <caption>Users</caption>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                        </tr>
                        <tr>
                            {/* <td><TextFilter onLoadedList={filteredListHandler} filterField="name" /></td>
                            <td><TextFilter onLoadedList={filteredListHandler} filterField="age" /></td>
                            <td><TextFilter onLoadedList={filteredListHandler} filterField="gender" /></td> */}
                            <td><TextFilter onLoadedList={searchListHandler} filterField="name" /></td>
                            <td><TextFilter onLoadedList={searchListHandler} filterField="age" /></td>
                            <td><TextFilter onLoadedList={searchListHandler} filterField="gender" /></td>
                        </tr>

                    </thead>
                    <tbody>
                        {users}
                    </tbody>

                </table>
            </Card>
        </section>
    )
});

export default UsersGrid;