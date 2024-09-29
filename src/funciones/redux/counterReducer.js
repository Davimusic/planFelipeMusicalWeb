const initialState = {
  refs: {},
  objectInEdition: {},
  multipurpose: {}//loggingStatus(boleano)
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
    case 'UPDATE_MULTIPURPOSE':
      return {
        ...state,
        multipurpose: action.payload, 
      };                                                           
    default:
      return state;
  }
};

export default counterReducer;
