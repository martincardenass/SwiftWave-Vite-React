import { useContext } from 'react'
import { CartContext } from '../components/context/cart'

export const useCart = () => {
    const context = useContext(CartContext)
    return context
}