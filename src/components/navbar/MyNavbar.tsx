import { Link } from "react-router-dom";
import Container from "../container/Container";

import { useShopingCartContext } from "../../context/ShopingCartContext";
import { SlBasket } from "react-icons/sl";
import Button from "../button/Button";
import { useLoginContext } from "../../context/LoginContext";
function MyNavbar() {
  const { cartQty } = useShopingCartContext();
  const { handlerLogOut, isLogin } = useLoginContext();
  return (
    <div className="bg-gray-400 fixed top-0 left-0 w-full z-50">
      <Container>
        <div className="h-14 flex items-center justify-between flex-row-reverse ">
          <ul className="flex items-center gap-x-4">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/store"}>Store</Link>
            </li>
            <li>
              <Link to={"/cart"}>Cart</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
          <div></div>
          <div className="flex items-center space-x-4">
            <Link className="relative" to={"/cart"}>
              <SlBasket size={"35px"} />
              {cartQty !== 0 ? (
                <span className="absolute -top-2 -right-7 p-2 w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full ">
                  {cartQty !== 0 ? cartQty : ""}
                </span>
              ) : (
                ""
              )}
            </Link>
            <div>
              {isLogin ? (
                <Button
                  className=" ml-4 bg-red-600 w-16 h-10 rounded-xl"
                  onClick={handlerLogOut}
                >
                  LogOut
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default MyNavbar;
