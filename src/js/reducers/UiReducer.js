const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA': {
      return state.data.concat([action.data]);
    }

    default: {
      return { ...state };
    }
  }
};
