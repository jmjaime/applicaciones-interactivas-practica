import { createContext, useReducer, ReactNode } from "react";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    total: number;
}

type CartAction =
    | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
    | { type: "REMOVE_ITEM"; payload: number }
    | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
    | { type: "CLEAR_CART" };

interface CartContextType {
    state: CartState;
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                const updatedItems = state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return {
                    items: updatedItems,
                    total: calculateTotal(updatedItems),
                };
            }

            const newItems = [...state.items, { ...action.payload, quantity: 1 }];
            return {
                items: newItems,
                total: calculateTotal(newItems),
            };
        }

        case "REMOVE_ITEM": {
            const filteredItems = state.items.filter(
                (item) => item.id !== action.payload
            );
            return {
                items: filteredItems,
                total: calculateTotal(filteredItems),
            };
        }

        case "UPDATE_QUANTITY": {
            const updatedItems = state.items
                .map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
                .filter((item) => item.quantity > 0);
            return {
                items: updatedItems,
                total: calculateTotal(updatedItems),
            };
        }

        case "CLEAR_CART":
            return {
                items: [],
                total: 0,
            };

        default:
            return state;
    }
}

function calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export const CartContext = createContext<CartContextType>({
    state: { items: [], total: 0 },
    addItem: () => { },
    removeItem: () => { },
    updateQuantity: () => { },
    clearCart: () => { },
});

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        total: 0,
    });

    const addItem = (item: Omit<CartItem, "quantity">) => {
        dispatch({ type: "ADD_ITEM", payload: item });
    };

    const removeItem = (id: number) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    const updateQuantity = (id: number, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    return (
        <CartContext
            value={{
                state,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext>
    );
}

