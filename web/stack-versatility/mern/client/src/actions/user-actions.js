import types from './user-types'

export function signIn(user){
    return { type: types.SIGNUP, user }
}

export function signOut(){
    return { type: types.SIGNIN, user }
}

export function signUp(user){
    return { type: SIGNUP_REQUEST, user }
}

