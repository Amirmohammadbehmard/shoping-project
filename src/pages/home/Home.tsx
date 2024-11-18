import { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import "./Home.css";
import { FcOk } from "react-icons/fc";
import { IProduct } from "../../types/Server";
import { getProducts } from "../../services/api";
import ProductItem from "../../components/productItem/ProductItem";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    getProducts().then((res) => setProducts(res));
  }, []);

  const filterProducts = (
    query: string,
    availableOnly: boolean,
    productList: IProduct[]
  ) => {
    return productList.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) &&
        (!availableOnly || !item.isOutOfStock)
    );
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filteredResults = filterProducts(
      searchQuery,
      showAvailableOnly,
      products
    );
    setSearchResults(filteredResults);
    setShowNoResults(filteredResults.length === 0);
  };

  const handleCheckboxChange = () => {
    setShowAvailableOnly((prev) => {
      const newValue = !prev;
      const filteredResults = filterProducts(searchQuery, newValue, products);
      setSearchResults(filteredResults);
      return newValue;
    });
  };

  const finalDisplayProducts =
    searchResults.length > 0 ? searchResults : products;

  return (
    <div>
      <Container>
        <div className="grid grid-cols-12 mt-8">
          <div className="md:col-span-9 col-span-12">
            {showNoResults ? (
              <div className="text-center text-red-500 h-10 flex items-center justify-center">
                The desired product was not found!
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 grid-cols-2 gap-10">
                {finalDisplayProducts.map((item) => (
                  <div key={item.id}>
                    <Link to={`/product/${item.id}`}>
                      <ProductItem {...item} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="md:col-span-3 col-span-0 md:flex hidden flex-col">
            <div className="flex mx-4">
              <input
                onChange={handleSearchInputChange}
                value={searchQuery}
                type="text"
                placeholder="Search something"
                className="w-3/4 h-10 border-4 p-2 outline-none"
                style={{ borderColor: "#9CA3AF" }}
              />
              <button
                onClick={handleSearch}
                style={{ backgroundColor: "#4CAF50" }}
                className="w-1/4"
              >
                <FcOk
                  style={{ backgroundColor: "#4CAF50" }}
                  className="bg-white size-10 m-auto"
                />
              </button>
            </div>
            <div className="flex justify-end">
              <div
                style={{ backgroundColor: "#9BA2AE" }}
                className="h-10 w-40 mx-4 mt-2 flex items-center justify-end space-x-2 rounded-2xl px-2"
              >
                <label>Only available</label>
                <input
                  onChange={handleCheckboxChange}
                  checked={showAvailableOnly}
                  className="w-6 h-6"
                  type="checkbox"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
