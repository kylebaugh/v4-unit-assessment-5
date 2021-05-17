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
            // console.log(state, action.payload)
            return {...state, username: action.payload.username, profile_pic: action.payload.profile_pic}
        case LOGOUT_USER:
            return initialState
        default:
            return {...state}

    }
}

