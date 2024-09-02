const initialState = {
  refs: {},
  objectInEdition: {}
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_REFS':
      return {
        ...state,
        refs: action.payload, 
      };   
    case 'UPDATE_OBJECT_IN_EDITION':
      return {
        ...state,
        objectInEdition: action.payload, 
      };                                                         
    default:
      return state;
  }
};

export default counterReducer;
