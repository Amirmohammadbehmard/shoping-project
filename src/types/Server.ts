
  
  export interface IProduct {
    id: string
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: IRating
    isOutOfStock:boolean
  }
  
  export interface IRating {
    rate: number
    count: number
  }
  export interface IshopingCartProvider {
    children: React.ReactNode;
  }
  export interface cartItem {
    id: number;
    qty: number;
  }
  export interface IShopingCartContext {
    cartItems: cartItem[];
    handlerIncreaseProductQty : (id:number)=> void;
    handlerDecreaseProductQty: (id:number)=> void;
    getProductQty:(id:number)=> number;
    handlerRemoveProduct:(id:number)=> void;
    cartQty:number;
    getTotalPrice: () => Promise<number>;
  }
  
export  interface ICartItem {
    id: number;
    qty: number;
  }
  export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
  

  