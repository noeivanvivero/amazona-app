import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_SIGNOUT, CART_EMPTY} from "../constants/cartConstants";

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
        case CART_REMOVE_ITEM:
            return {...state,cartItems : state.cartItems.filter(item=>item.product !== action.payload)};
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload};
        case CART_SAVE_PAYMENT_METHOD:
            return {...state,paymentMethod: action.payload};
        case CART_SIGNOUT:
            return {...state,shippingAddress: {}};
        case CART_EMPTY:
            return {...state,cartItems: []};
        default:
            return state;
    }
}