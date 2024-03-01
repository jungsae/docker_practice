<template>
  <div class="page-header"><h1>회원 목록</h1></div>
  <table class="table">
    <thead>
      <tr>
        <th>id</th>
        <th>이름</th>
        <th>이메일</th>
        <th>주문 수량</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="member in memberList" :key="member.id">
        <td>{{ member.id }}</td>
        <td>{{ member.name }}</td>
        <td>{{ member.email }}</td>
        <td>
          <a :href="`/member/${member.id}/orders`">
            {{ member.orderCount }}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      memberList: [],
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${process.env.VUE_APP_API_BASE_URL}/members`,
        config
      );
      this.memberList = response.data;
      console.log(this.memberList);
    } catch (e) {
      console.error("에러:", e.message);
    }
  },
};
</script>

<style lang="scss" scoped></style>
