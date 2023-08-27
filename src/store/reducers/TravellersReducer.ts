import React from 'react'
import TYPES from "../../types/store";
const initialState: any = []
const TravellersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TYPES.TRAVELLERS:
            return action.payload
        default:
            return state
    }
}

export default TravellersReducer
