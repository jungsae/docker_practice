<template>
  <div class="page-header" style="text-align: center">
    <h1>회원정보</h1>
  </div>
  <table class="table" style="text-align: center">
    <tr>
      <td>이름</td>
      <td>{{ userInfo.name }}</td>
    </tr>
    <tr>
      <td>이메일</td>
      <td>{{ userInfo.email }}</td>
    </tr>
    <tr>
      <td>상세주소</td>
      <td>{{ userInfo.city }} {{ userInfo.street }}</td>
    </tr>
    <tr>
      <td>우편정보</td>
      <td>{{ userInfo.zipcode }}</td>
    </tr>
  </table>
  <OrderListComponent
    :isAdmin="false"
    apiUrl="/member/orders"
  ></OrderListComponent>
</template>

<script>
import axios from "axios";
import OrderListComponent from "@/components/OrderListComponent.vue";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/member/myInfo`,
          {
            headers,
          }
        );
        this.userInfo = response.data;
        console.log(this.userInfo);
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  components: {
    OrderListComponent,
  },
};
</script>
