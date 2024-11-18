import { Navigate, Outlet } from "react-router-dom"
import { useLoginContext } from "../../context/LoginContext"


function PrivateRoute() {
 const {isLogin} = useLoginContext()
 
  return (
    <>
    {isLogin ? <Outlet/> : <Navigate to={'/login'} />}
    </>
  )
}

export default PrivateRoute