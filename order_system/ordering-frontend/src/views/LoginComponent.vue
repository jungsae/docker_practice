<template>
  <div>
    <form @submit.prevent="doLogin">
      <div>
        <label for="email">이메일:</label>
        <input type="email" v-model="loginForm.email" required />
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input type="password" v-model="loginForm.password" required />
      </div>
      <br />
      <div>
        <button type="submit">로그인</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async doLogin() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/doLogin`,
          JSON.stringify(this.loginForm),
          {
            headers: { "Content-Type": `application/json` },
          }
        );
        const token = response.data.result.token;
        console.log(token);
        if (token) {
          localStorage.setItem("token", token);
          const decoded = jwtDecode(token);
          localStorage.setItem("role", decoded.role);
          this.$router.push("/");
          alert(`${decoded.sub}님 - ${decoded.role}`);
        } else {
          console.log("200 ok but invalid token");
          alert("Login Failed");
        }
      } catch (e) {
        const err_msg = e.response.data.error_message;
        if (err_msg) {
          console.log(err_msg);
          alert(err_msg);
        } else {
          console.log(e);
          alert("Login Failed");
        }
      }
    },
  },
};
</script>
<style>
body {
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
}

h1 {
  color: #333;
}

form {
  padding: 20px;
  text-align: left;
}

p {
  margin-bottom: 10px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
