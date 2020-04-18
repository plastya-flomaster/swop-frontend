
const initialState = {
    concat: ([]) => []
};

const itemsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'GET_ITEMS':
            return state.concat([action.data]);
    
        default:
            return state;
    }

}