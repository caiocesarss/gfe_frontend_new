const INITIAL_STATE = {selected: '', visible: ''}

export default (state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case 'TABLE_SELECTED':
            return {...state, selected: action.payload}
        case 'TABLE_SHOWED':
            return {...state, visible:action.payload}
        default:
            return state;
    }
}