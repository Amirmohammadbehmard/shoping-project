import { useEffect, useState } from "react";
import Button from "../button/Button";
import { FaTrashAlt } from "react-icons/fa";
import { ICartItem, IProduct } from "../../types/Server";
import { getProduct } from "../../services/api";
import { useShopingCartContext } from "../../context/ShopingCartContext";
import { Link } from "react-router-dom";

function CartItem({ id, qty }: ICartItem) {
  const [product, setProduct] = useState<IProduct>();
  const {
    handlerDecreaseProductQty,
    handlerIncreaseProductQty,
    handlerRemoveProduct,
  } = useShopingCartContext();
  useEffect(() => {
    getProduct(id).then((res) => setProduct(res));
  }, []);
  return (
    <div className="px-4 py-4 my-4  grid grid-cols-12 ">
      <div className="col-span-2 flex items-center justify-center mr-2">
        <Link to={`/product/${id}`}>
          <img className="rounded-full h-40 w-40" src={product?.image} alt="" />
        </Link>
      </div>
      <div className="flex items-center col-span-5">
        <h3>{product?.title}</h3>
      </div>
      <div className="flex items-center col-span-2 justify-end">
        <h3 className="">{qty}</h3>
      </div>
      <div className="flex items-center pr-48 flex-col col-span-3">
        <Button
          onClick={() => handlerIncreaseProductQty(id)}
          className="w-9 h-9 my-2 rounded-full"
          variant="primary"
        >
          +
        </Button>
        <Button
          onClick={() => handlerDecreaseProductQty(id)}
          className="w-9 h-9 my-2 rounded-full"
          variant="danger"
        >
          -
        </Button>
        <Button
          onClick={() => handlerRemoveProduct(id)}
          className="w-9 h-9 my-2  rounded-full"
          variant="danger"
        >
          <FaTrashAlt className="mx-auto" />
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
