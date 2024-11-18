import { useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import { getProduct } from "../../services/api";
import { useEffect, useState } from "react";
import { IProduct } from "../../types/Server";
import { useShopingCartContext } from "../../context/ShopingCartContext";
import { FaTrashAlt } from "react-icons/fa";
import "./Product.css";

function Product() {
  const [product, setProduct] = useState<IProduct>();
  const param = useParams<{ id: string }>().id;
  const {
    handlerIncreaseProductQty,
    handlerDecreaseProductQty,
    getProductQty,
    cartItems,
    handlerRemoveProduct,
  } = useShopingCartContext();

  useEffect(() => {
    getProduct(param as string).then((res) => setProduct(res));
  }, [param]);

  console.log(cartItems);

  return (
    <div>
      <Container>
        <div className="h shadow mt-4 grid md:grid-cols-10 grid-cols-2">
          <div className="col-span-2 p-4 flex flex-col">
            <img className="rounded h-52" src={product?.image} alt="" />
            <div className="mt-4 flex flex-col">
              {!product?.isOutOfStock ? (
                <>
                  <div className="flex justify-center space-x-3">
                    {getProductQty(parseInt(param as string)) !== 0 ? (
                      <Button
                        onClick={() =>
                          handlerIncreaseProductQty(parseInt(param as string))
                        }
                        variant="primary"
                      >
                        +
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          handlerIncreaseProductQty(parseInt(param as string))
                        }
                        variant="primary"
                      >
                        Add to cart
                      </Button>
                    )}
                    {getProductQty(parseInt(param as string)) !== 0 ? (
                      <span className="rounded-md px-8 py-2 my-1 text-lg text-center">
                        {getProductQty(parseInt(param as string))}
                      </span>
                    ) : (
                      ""
                    )}

                    {getProductQty(parseInt(param as string)) !== 0 ? (
                      <Button
                        onClick={() =>
                          handlerDecreaseProductQty(parseInt(param as string))
                        }
                        variant="warning"
                      >
                        <span className="text-white font-bold">-</span>
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text-center">
                    {getProductQty(parseInt(param as string)) !== 0 ? (
                      <Button
                        onClick={() =>
                          handlerRemoveProduct(parseInt(param as string))
                        }
                        variant="danger"
                      >
                        <FaTrashAlt className="m-auto h-6 w-28" />
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center text-red-500">
                  This product is out of stock.
                </div>
              )}
            </div>
          </div>
          <div className="col-span-8 md:py-0 py-28">
            <div className="grid grid-cols-12">
              <h1 className="col-span-6 py-4 px-8">{product?.title}</h1>
              <p className="col-span-6 text-right py-4 px-8">
                Price: {product?.price}$
              </p>
            </div>
            <div className="p-4">
              <p className="text-justify">{product?.description}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Product;
