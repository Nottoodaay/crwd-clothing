import { createContext,  useReducer} from "react";

import { createAction } from "../utils/reducer/reducer.utils";


const addCartItem = (cartItems, productToAdd) =>{
    const existingCartItem = cartItems.find((cartItem) => cartItem.id == productToAdd.id)

    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id == productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    return[...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemsToRemove) =>{
    const existingCartItem = cartItems.find((cartItem) => cartItem.id == cartItemsToRemove.id)

    if(existingCartItem.quantity == 1){
        return cartItems.filter(cartItem => cartItem.id != cartItemsToRemove.id)
    }

      return cartItems.map((cartItem) => cartItem.id == cartItemsToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        )
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id != cartItemToClear.id)


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: () =>{},
    cartCount: 0,
    cartTotal: 0
}) 

const INITIAL_STATE = {
    isCartOpen: true,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) =>{
    const {type, payload} = action

    switch(type){
        case 'SET_CART_ITEMS':
            return{
                ...state,
                ...payload
            }
        case 'SET_IS_CART_OPEN':
            return{
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer `)
    }
}


export const CartProvider = ({children}) =>{

    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
     useReducer(cartReducer, INITIAL_STATE)

    

    const updateCartItemsReducer = (newCartItems) =>{

        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0)

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        
        dispatch(
            createAction('SET_CART_ITEMS',
            { 
              cartItems: newCartItems,
              cartTotal: newCartTotal, 
              cartCount: newCartCount 
            }))

    }

    const addItemToCart = (productToAdd) =>{
        const newCartItems = (addCartItem(cartItems, productToAdd))
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (productToRemove) =>{
        const newCartItems = (removeCartItem(cartItems, productToRemove))
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (cartItemToClear) =>{
        const newCartItems = (clearCartItem(cartItems, cartItemToClear))
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) =>{
        dispatch(createAction('SET_IS_CART_OPEN', bool))
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemFromCart, 
        clearItemFromCart,
        cartTotal
    }

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    ) 
}