<template>
  <div class="container">
    <div class="page-header text-center" style="margin-top: 20px">
      <h1>상품등록</h1>
    </div>
    <form @submit.prevent="itemCreate">
      <div class="form-group">
        <label for="name">상품명</label>
        <input type="text" v-model="name" class="form-control" />
      </div>
      <div class="form-group">
        <label for="name">카테고리</label>
        <input type="text" v-model="category" class="form-control" />
      </div>
      <div class="form-group">
        <label for="email">가격</label>
        <input type="number" v-model="price" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">재고수량</label>
        <input type="number" v-model="stockQuantity" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">상품이미지 : </label>
        <input
          type="file"
          class="form-control"
          accept="image/*"
          @change="fileUpload"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary mt-3">등록</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      price: null,
      stockQuantity: null,
      category: "",
      itemImage: null,
    };
  },
  methods: {
    fileUpload(event) {
      console.log(event);
      this.itemImage = event.target.files[0];
    },
    async itemCreate() {
      const registerData = new FormData();
      registerData.append("name", this.name);
      registerData.append("category", this.category);
      registerData.append("price", this.price);
      registerData.append("stockQuantity", this.stockQuantity);
      registerData.append("itemImage", this.itemImage);
      const token = localStorage.getItem("token");
      const headers = token
        ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        : { "Content-Type": "multipart/form-data" };
      await axios.post(
        `${process.env.VUE_APP_API_BASE_URL}/item/create`,
        registerData,
        { headers }
      );
      this.$router.push("itemes/manage");
      //   window.location.reload();
    },
  },
};
</script>
