import TYPES from "../../types/store"




const initialState: any = [{
    transferActiveTab: 'roundTrip',
    flightsFormHeight: 0,
    guestsInputPopoverHeight: 0,
    transfersSearchFormHeight: 0,
    hotelsCardWidth: null,
}]


const DynamicStyles = (state = initialState, action: any) => {

    switch (action.type) {
        case TYPES.HOTELS_FORM_HEIGHT:
            return { ...state, hotelsFormHeight: action.payload }
        case TYPES.TRANSFERS_FORM_HEIGHT:
            return { ...state, transferActiveTab: action.payload }
        case TYPES.FLIGHTS_FORM_HEIGHT:
            return { ...state, flightsFormHeight: action.payload }
        case TYPES.GUESTS_INPUT_POPOVER_HEIGHT:
            return { ...state, guestsInputPopoverHeight: action.payload }
        case TYPES.TRANSFERS_SEARCH_FORM_HEIGHT:
            return { ...state, transfersSearchFormHeight: action.payload }
        case TYPES.MULTISTOP_HIGHT:
            return { ...state, flightsSearchFormHeight: action.payload }
        case TYPES.HOTELS_CARD_WIDTH:
            return { ...state, hotelsCardWidth: action.payload }
        default:
            return state
    }
}
export default DynamicStyles