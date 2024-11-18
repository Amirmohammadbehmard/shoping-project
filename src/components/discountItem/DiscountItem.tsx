import { useEffect, useState } from "react";
import { useShopingCartContext } from "../../context/ShopingCartContext";
import { IProduct } from "../../types/Server";
import Button from "../button/Button";
import { getProduct } from "../../services/api";
import "./DiscountItem.css";
import Container from "../container/Container";
import ReactPaginate from "react-paginate";

function DiscountItem() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { handlerIncreaseProductQty } = useShopingCartContext();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1;

  useEffect(() => {
    const productIds = ["1", "2", "3", "4", "5", "6", "7", "8"];
    Promise.all(productIds.map((id) => getProduct(id))).then((res) =>
      setProducts(res)
    );
  }, []);

  const indexOfLastProduct = (currentPage + 1) * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <div>
      <Container>
        <div>
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="h-auto grid grid-cols-12 items-center justify-center space-x-6 relative mt-4"
            >
              <div className="md:col-span-6 col-span-12 flex flex-col  justify-center order-2 md:order-1">
                <h3 className="my-4">{product.title}</h3>
                <p className="my-4 h-24 line-clamp-3 overflow-hidden">
                  {product.description}
                </p>
                <div className="my-2">
                  <span className="discount-badge font-bold">٪20</span>
                  <span className="line-through text-red-500 ml-5">
                    {product.price + 50}$
                  </span>
                  <span className="relative top-6 right-16 my-4 font-bold">
                    {product.price}$
                  </span>
                </div>
                <Button
                  onClick={() =>
                    handlerIncreaseProductQty(parseInt(product.id as string))
                  }
                  className="w-28 h-10 my-5 rounded-xl"
                  variant="primary"
                >
                  Add to cart
                </Button>
              </div>
              <div className="md:col-span-6 col-span-12 flex items-center justify-center order-1 md:order-2 md:pt-0 pt-5">
                <img
                  className="w-auto h-56"
                  src={product.image}
                  alt={product.title}
                />
              </div>
            </div>
          ))}
          <div className="w-full flex items-center justify-center mb-2">
            <ReactPaginate
              className="pagination [&_li:is(:first-child,:last-child)]:hidden"
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(products.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default DiscountItem;
