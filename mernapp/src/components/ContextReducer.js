import React from 'react'
import { createContext,useReducer,useContext}  from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state,action) => {
    switch(action.type){
        case "ADD":
            return [...state,{id:action.id,name:action.name,
                price:action.price,qty:action.qty,
                brand:action.brand,img:action.img}]
            default:
                console.log("Error in CartReducer") 
    }



}

export const CartProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,[]);
    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart =() => useContext(CartDispatchContext);