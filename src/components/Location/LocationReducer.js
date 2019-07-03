const INITIAL_STATE = {
    cityList : [],
    UFList : []
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "CITIES_FETCHED":
            return { ...state, cityList: action.payload.data }
        case "UF_FETCHED":
            return { ...state, UFList: action.payload.data }
        default:
            return state
    }
}