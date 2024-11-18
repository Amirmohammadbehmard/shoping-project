import { useState } from "react";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import { useLoginContext } from "../../context/LoginContext";

function Login() {
  const { handlerLogin } = useLoginContext();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  function handlerchange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  return (
    <div>
      <Container>
        <div className="bg-slate-300 p-12 rounded">
          <input
            onChange={handlerchange}
            type="text"
            placeholder="username"
            name="username"
            value={user.username}
          />
          <input
            onChange={handlerchange}
            type="text"
            placeholder="password"
            name="password"
            value={user.password}
          />
          <Button
            variant="danger"
            onClick={() => handlerLogin(user.username, user.password)}
          >
            Login
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Login;
