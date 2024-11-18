import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import ProductItem from "../../components/productItem/ProductItem";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import { IProduct } from "../../types/Server";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import DiscountItem from "../../components/discountItem/DiscountItem";

function Store() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res));
  }, []);

  return (
    <div>
      <Container>
        <div className="flex flex-col">
          <div className="m-0">
            <DiscountItem />
          </div>
          <h1 className="my-5">Newest products :</h1>
          <div className="mb-8">
            {products.length > 0 && (
              <Swiper
                
                
                autoplay={{
                  delay: 1850,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  320: { slidesPerView: 2, spaceBetween: 25},
                  640: { slidesPerView: 3, spaceBetween: 25 },
                  768: { slidesPerView: 4, spaceBetween: 25 },
                  1024: { slidesPerView: 5, spaceBetween: 25 }
                }}
                navigation={true}
               
                slidesPerGroup={1}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {products.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Link to={`/product/${item.id}`}>
                      <ProductItem {...item} />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Store;
