import React, { createContext, useReducer } from 'react';
import users from '../data/User';

const initialState = { users };
const UsersContext = createContext({});

export const UsersProvider = (props) => {
    // console.warn(Object.keys(props.children.type));

    function reducer(state, action){
        // console.warn(action);
        if (action.type === 'deleteUser') {
            const user = action.payload;
            return {
                // ...state,
                users: state.users.filter(u => u.id !== user.id)
            }

        }
        if (action.type === 'createUser') {
            const user = action.payload;
            user.id = Math.random()

            return {
                ...state,
                users: [...state.users, user],
                
            }

        }
        if (action.type === 'updateUser') {
            

        }

        return state;
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        // <UsersContext.Provider value={{state: { users }}}>
        <UsersContext.Provider value={ { state, dispatch } }>
            {props.children}
        </UsersContext.Provider>

    );
}

export default UsersContext;