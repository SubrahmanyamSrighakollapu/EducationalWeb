import { createContext, useContext, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])

  const addToCart = (course) => {
    setCart(prev => prev.find(c => c.id === course.id) ? prev : [...prev, course])
  }
  const removeFromCart = (id) => setCart(prev => prev.filter(c => c.id !== id))
  const isInCart = (id) => cart.some(c => c.id === id)

  const addToWishlist = (course) => {
    setWishlist(prev => prev.find(c => c.id === course.id) ? prev : [...prev, course])
  }
  const removeFromWishlist = (id) => setWishlist(prev => prev.filter(c => c.id !== id))
  const toggleWishlist = (course) => {
    setWishlist(prev =>
      prev.find(c => c.id === course.id)
        ? prev.filter(c => c.id !== course.id)
        : [...prev, course]
    )
  }
  const isInWishlist = (id) => wishlist.some(c => c.id === id)

  const cartTotal = cart.reduce((sum, c) => sum + c.price, 0)
  const cartOriginalTotal = cart.reduce((sum, c) => sum + c.original, 0)
  const cartSavings = cartOriginalTotal - cartTotal

  return (
    <StoreContext.Provider value={{
      cart, wishlist,
      addToCart, removeFromCart, isInCart,
      addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist,
      cartTotal, cartOriginalTotal, cartSavings,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
