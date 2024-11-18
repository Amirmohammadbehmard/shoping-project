import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { login } from "../services/api";

interface Ichildren {
  children: ReactNode;
}

interface ILoginContext {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  handlerLogin: (username:string,password:string) => void;
  handlerLogOut:() => void;
}

const defaultLoginContext: ILoginContext = {
  isLogin: false,
  setIsLogin: () => {},
  handlerLogin: () => {},
  handlerLogOut:() => {},
};

export const LoginContext = createContext<ILoginContext>(defaultLoginContext);

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
};

function LoginProvider({ children }: Ichildren) {
  const [isLogin, setIsLogin] = useState(false);
  const navigate =useNavigate()

  const handlerLogin = (username:string,password:string) => {
    login(username,password).finally(()=>{
      const token ="N2IxYjUzMzQtMDkwYi00ODE0LWIzZWQtOWI4YWRkMDlkOGI4OjY0YWNmYTc4LWJmMzEtNDQ1Zi04NDI3LTgzOGJiYjEyMWRkMg==";
      localStorage.setItem("token",token)
      setIsLogin(true)
      navigate('/cart')
    })
    
   
  };
  const handlerLogOut = () => {
   
    setIsLogin(false);
    navigate('/login')
    localStorage.removeItem("token")
  };
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      setIsLogin(true)
    }
  }, [])
  

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, handlerLogin,handlerLogOut }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
