// import { connect } from "react-redux"

const initialState = {
    username: null,
    profile_pic: null
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function updateUser(user){
    console.log(user)
    return{
        type:UPDATE_USER,
        payload: user 
    }
}

export function logoutUser(){
    return{
        type:LOGOUT_USER,
        payload:null
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USER:
            return {...state, user: action.payload}
        case LOGOUT_USER:
            return {...state, users: action.payload}
        default:
            return {...state}

    }
}

