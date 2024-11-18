import { createContext, useContext } from "react";
import {
  cartItem,
  IShopingCartContext,
  IshopingCartProvider,
  
} from "../types/Server";
import { UseLocalStorage } from "../hooks/UseLocalStorage";

export const ShopingCartContext = createContext({} as IShopingCartContext);
export const useShopingCartContext = () => {
  return useContext(ShopingCartContext);
};

export function ShopingCartProvider({ children }: IshopingCartProvider) {
  const [cartItems, setCartItems] = UseLocalStorage<cartItem[]>(
    "cartItems",
    []
  );
  //const [cartItems1, setCartItems1] = UseLocalStorage<cartItem[]>("cartItems",[]);

  const handlerIncreaseProductQty = (id: number) => {
    setCartItems((currentItems) => {
      const selectedItem = currentItems.find((item) => item.id == id);
      if (selectedItem == null) {
        return [...currentItems, { id: id, qty: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id == id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const handlerDecreaseProductQty = (id: number) => {
    setCartItems((currentItems) => {
      const selectedItem = currentItems.find((item) => item.id == id);
      if (selectedItem?.qty === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id == id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const getProductQty = (id: number) => {
    return cartItems.find((item) => item.id == id)?.qty || 0;
  };
  const handlerRemoveProduct = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id != id)
    );
  };
  const getTotalPrice = async (): Promise<number> => {
    const requests = cartItems.map((item) =>
      fetch(`http://localhost:3000/products/${item.id}`).then((response) =>
        response.json()
      )
    );
    const products = await Promise.all(requests);
    let totalPrice = 0;
    products.forEach((product, index) => {
      totalPrice += product.price * cartItems[index].qty;
    });
    return totalPrice;
  };

  const cartQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);
  return (
    <ShopingCartContext.Provider
      value={{
        cartItems,
        handlerIncreaseProductQty,
        handlerDecreaseProductQty,
        getProductQty,
        handlerRemoveProduct,
        cartQty,
        getTotalPrice,
      }}
    >
      {children}
    </ShopingCartContext.Provider>
  );
}
