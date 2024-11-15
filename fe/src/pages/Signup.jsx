import signupImg from "../assets/Images/signup.png"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Hãy tham gia khóa học của chúng tôi"
      description="Hãy nhập đầy đủ thông tin"
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup