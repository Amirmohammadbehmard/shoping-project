import { useEffect, useState } from "react";
import CartItem from "../../components/cartItem/CartItem";
import Container from "../../components/container/Container";
import { useShopingCartContext } from "../../context/ShopingCartContext";
import { Product } from "../../types/Server";
import { getProducts } from "../../services/api";

const Cart = () => {
  const { cartItems } = useShopingCartContext();
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    getProducts().then((result) => setProducts(result));
  }, []);
  const totalItemsInCart = cartItems.reduce((total, cartItem) => {
    return total + cartItem.qty;
  }, 0);

  return (
    <Container>
      {cartItems.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <div className="bg-gray-200 text-right p-4 my-3">
        <p>Total item in cart : {totalItemsInCart}</p>
        <p>
          Total price :
          {cartItems
            .reduce((total, cartItem) => {
              const item = products?.find(
                (product) => parseInt(product.id as string) === cartItem.id
              );

              return total + (item?.price || 0) * cartItem.qty;
            }, 0)
            .toLocaleString()}
          $
        </p>
      </div>
      <button className="bg-green-500 w-20 h-10 rounded-md"> Check out</button>
    </Container>
  );
};
export default Cart;
