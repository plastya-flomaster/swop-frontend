
const initialState = {
    concat: ([]) => []
};

const itemsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'GET_ITEMS':
            return state.concat([action.data]);
        case 'CREATE_ITEM':
            return state;
        default:
            return state;
    }

};
export default itemsReducer;