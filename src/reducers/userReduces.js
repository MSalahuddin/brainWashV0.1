const userReducer = (state = {}, action) => {
    switch(action.type) {
        case "UPDATE_USER": {
            return {user: action.user}
        }
        case "REMOVE_USER": {
            return {user: null}
        }
        default: {
            return state;
        }
    }
}

export default userReducer;