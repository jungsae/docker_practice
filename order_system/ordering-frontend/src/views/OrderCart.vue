<template>
  <h1 style="text-align: center">장바구니 목록</h1>
  <div class="d-flex justify-content-between">
    <button class="btn btn-danger" @click="clearCart">장바구니 비우기</button>
    <button class="btn btn-info" @click="placeOrder">주문하기</button>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>제품id</th>
        <th>제품명</th>
        <th>주문 수량</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in cartItems" :key="item.itemId">
        <td>{{ item.itemId }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.count }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["cartItems", "getTotalQuantity"]),
  },
  methods: {
    ...mapActions(["clearCart"]),

    clearCart() {
      this.$store.dispatch("clearCart");
    },
    async placeOrder() {
      const orderItems = this.cartItems.map((item) => {
        return { itemId: item.itemId, count: item.count };
      });
      if (this.getTotalQuantity < 1) {
        alert("장바구니가 비어있습니다");
        return;
      }
      if (!confirm(`${this.getTotalQuantity}개의 상품을 주문하시겠습니까?`)) {
        console.log("주문 취소");
        return;
      }
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/order/create`,
          orderItems,
          { headers }
        );
        alert(`주문번호: ${response.data.result} 주문완료!`);
        this.clearCart();
      } catch (error) {
        alert("주문실패");
        console.log(error);
      }
    },
  },
};
</script>
