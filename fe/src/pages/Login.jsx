//import loginImg from "../assets/Images/login.png"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Chào mừng bạn"
      description="Hãy nhập đầy đủ thông tin"
      //image={loginImg}
      formType="login"
    />
  )
}

export default Login