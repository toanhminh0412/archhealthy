import {CART_ADD_ITEM,
        CART_REMOVE_ITEM 
        } from "../constants/cartConstants";

export const cartReducer = (state={cartItems:[]}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem) {
                console.log('found an existing item')
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? item : x
                        )
                }

            } else {
                console.log('new item')
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                } 
            }

        case CART_REMOVE_ITEM:
            const remove_item = action.payload
            let remove_item_id = remove_item.product
            console.log(remove_item_id);
            state.cartItems = state.cartItems.filter(x => x.product !== remove_item_id)
            return {
                cartItems: [...state.cartItems]
            }

        default:
            return state
    }
}