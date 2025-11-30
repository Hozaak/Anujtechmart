import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for the cart
const initialCartState = {
  cartItems: [],
  totalPrice: 0,
};

// Reducer function to handle cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      // Used to load the cart from local storage
      return action.payload;

    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === product.id);
      
      let updatedItems;
      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        updatedItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // New item, add to cart
        // Ensure price is treated as a number
        updatedItems = [...state.cartItems, { ...product, quantity, price: Number(product.price) }];
      }
      
      // Recalculate total price
      const newTotalPrice = updatedItems.reduce((total, item) => 
        total + (Number(item.price) * item.quantity), 0);

      return {
        cartItems: updatedItems,
        totalPrice: newTotalPrice,
      };
    }

    case 'REMOVE_ITEM': {
      const { id } = action.payload;
      const updatedItems = state.cartItems.filter(item => item.id !== id);
      
      const newTotalPrice = updatedItems.reduce((total, item) => 
        total + (Number(item.price) * item.quantity), 0);
        
      return {
        cartItems: updatedItems,
        totalPrice: newTotalPrice,
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      // Ensure quantity is not less than 1
      const safeQuantity = Math.max(1, quantity);

      const updatedItems = state.cartItems.map(item =>
        item.id === id ? { ...item, quantity: safeQuantity } : item
      );

      const newTotalPrice = updatedItems.reduce((total, item) => 
        total + (Number(item.price) * item.quantity), 0);

      return {
        cartItems: updatedItems,
        totalPrice: newTotalPrice,
      };
    }

    case 'CLEAR_CART':
      return initialCartState;

    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  
  // 1. Load cart from local storage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('ecomCart');
    if (storedCart) {
        try {
            const parsedCart = JSON.parse(storedCart);
            // Check if cart is valid before loading
            if (Array.isArray(parsedCart.cartItems) && typeof parsedCart.totalPrice === 'number') {
                dispatch({ type: 'LOAD_CART', payload: parsedCart });
            }
        } catch (e) {
            console.error("Failed to parse cart from storage:", e);
        }
    }
  }, []);

  // 2. Sync cart to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('ecomCart', JSON.stringify({
        cartItems: state.cartItems,
        totalPrice: state.totalPrice,
    }));
  }, [state.cartItems, state.totalPrice]);

  // Actions exposed to components
  const addItem = (product, quantity) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };
  
  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  // Combine state and actions into the context value
  const value = {
    cartItems: state.cartItems,
    totalPrice: state.totalPrice,
    // Calculate total count of items for the header badge
    cartCount: state.cartItems.reduce((total, item) => total + item.quantity, 0),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context easily
export const useCart = () => {
  return useContext(CartContext);
};
