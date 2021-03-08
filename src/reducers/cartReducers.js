import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const exist = state.cartItems.find(element => element.product === item.product);
            if(exist){ 
                return {...state,
                    cartItems: state.cartItems.map(current=>current.product===exist.product? item : current),
                };
            }else{
                return {...state,cartItems: [...state.cartItems,item]};
            }
        default:
            return state;
    }
}