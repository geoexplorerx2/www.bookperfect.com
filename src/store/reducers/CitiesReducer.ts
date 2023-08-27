import TYPES from "../../types/store";
const initialState: any = [];

const CitiesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TYPES.AVUXI:
            return action.payload
        default:
            return state
    }
}
export default CitiesReducer;