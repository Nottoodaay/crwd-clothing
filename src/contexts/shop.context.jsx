import { createContext, useState } from "react";
import PRODUCTS from '../shop_data.json'

export const ProductContext = createContext({
    products: []
})

export const ProductsProvider = ({children}) =>{
    const [products, setProducts] = useState(PRODUCTS)
    const value = {products}
    return(
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}