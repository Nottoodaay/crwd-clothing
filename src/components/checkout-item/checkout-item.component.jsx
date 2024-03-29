import { useDispatch, useSelector } from 'react-redux'

import { selectCartItems } from '../../store/cart/cart.selector'
import { clearItemFromCart, addItemToCart, removeItemFromCart } from '../../store/cart/cart.action'

import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) =>{
    const {name, imageUrl, price, quantity} = cartItem

    const dispatch = useDispatch()

    const cartItems = useSelector(selectCartItems)

    const clearItemHandler = () =>  dispatch(clearItemFromCart( cartItems, cartItem)) 
    const addItemHandler = () => dispatch(addItemToCart( cartItems ,cartItem)) 
    const removeItemHandler = () => dispatch( removeItemFromCart( cartItems ,cartItem))
    
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>-</div>
                <span>{quantity}</span>
                <div className='arrow'onClick={addItemHandler}>+</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>Remove</div>
        </div>
    )
}

export default CheckoutItem