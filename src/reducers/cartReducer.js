// import {
//   LOADING_CART_SUCCESS,
//   LOADING_CART,
//   LOADING_CART_FAILED,
//   } from '../actions/types';
  
//   const INITIAL_STATE = { loading: false, error: '', carts: [] }
  
//   export default(state = INITIAL_STATE, action) => {
//     switch(action.type) {
//       case LOADING_CART:
//         return { ...INITIAL_STATE, loading: true }
//       case LOADING_CART_SUCCESS:
//         return { ...INITIAL_STATE, loading: false, carts: action.carts}
//       case LOADING_CART_FAILED:
//         return { ...INITIAL_STATE, loading: false, error: action.error }
//       default:
//         return state;
//     }
//   }

let defaultState = {
  selectedItems: { items: [] },
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };

      if (action.payload.checkboxValue) {
        console.log("ADD TO CART");

        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          // restaurantName: action.payload.restaurantName,
        };
      } else {
        console.log("REMOVE FROM CART");
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title !== action.payload.title
            ),
          ],
          // restaurantName: action.payload.restaurantName,
        };
      }
      console.log(newState, "👉");
      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer;