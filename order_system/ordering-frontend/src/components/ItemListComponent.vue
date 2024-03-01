<template>
  <div class="container">
    <div class="page-header">
      <h1 style="text-align: center">{{ pageTitle }}</h1>
    </div>
    <div class="justify-content=between" style="margin-top: 20px">
      <form @submit.prevent="loadItems">
        <select
          v-model="searchType"
          class="form-control"
          style="display: inline-block; width: auto; margin-right: 5px"
        >
          <option value="optional" selected>선택</option>
          <option value="name">상품명</option>
          <option value="category">카테고리</option>
        </select>
        <input v-model="searchValue" type="text" />
        <button class="submit" @click.prevent="searchItems">검색</button>
      </form>
      <div v-if="!isAdmin" style="text-align: right">
        <button @click="addCart" class="btn btn-secondary">장바구니</button>
        <button @click="placeOrder" class="btn btn-success">주문하기</button>
      </div>
      <div v-if="isAdmin" style="text-align: right">
        <a href="/item/new">
          <button class="btn btn-success">상품등록</button>
        </a>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th v-if="!isAdmin"></th>
          <th>제품사진</th>
          <th>제품명</th>
          <th>수량</th>
          <th>재고수량</th>
          <th v-if="!isAdmin">주문수량</th>
          <th v-if="!isAdmin">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in itemList" :key="item.id">
          <td v-if="!isAdmin">
            <input type="checkbox" v-model="selectedItems[item.id]" />
          </td>
          <td>
            <img
              :src="getImage(item.id)"
              alt="이미지 준비중"
              style="height: 100px; width: auto"
            />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.stockQuantity }}</td>
          <td>
            <input
              v-if="!isAdmin"
              v-model="item.quantity"
              type="number"
              min="1"
              style="width: 2.5rem"
            />
          </td>
          <td v-if="isAdmin">
            <button class="btn-danger" @click="deleteItem(item.id)">
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  props: { pageTitle: String, isAdmin: Boolean },
  data() {
    return {
      selectedItems: {},
      itemList: [],
      pageSize: 10,
      currentPage: 0,
      searchType: "name",
      searchValue: "",
      isLastPage: false,
      isLoading: false,
    };
  },
  created() {
    this.loadItems();
  },
  mounted() {
    window.addEventListener("scroll", this.scrollPagenation);
  },
  // computed: {
  //   ...mapGetters(["cartItems", "getTotalQuantity"]),
  // },

  methods: {
    ...mapActions(["addToCart"]),
    addCart() {
      const orderItems = Object.keys(this.selectedItems)
        .filter((key) => this.selectedItems[key] === true)
        .map((key) => {
          const item = this.itemList.find((item) => item.id == key);
          return {
            itemId: item.id,
            name: item.name,
            count: item.quantity,
          };
        });

      if (orderItems.length < 1) {
        alert("장바구니가 비어있습니다");
        return;
      }
      // orderItems.forEach((item) => this.$store.commit("addToCart", item));
      orderItems.forEach((item) => this.$store.dispatch("addToCart", item));
    },
    async deleteItem(itemId) {
      if (confirm("정말로 삭제하시겠습니까?")) {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        await axios
          .delete(`${process.env.VUE_APP_API_BASE_URL}/item/${itemId}/delete`, {
            headers,
          })
          .then(window.location.reload());
      }
    },
    async placeOrder() {
      const orderItems = Object.keys(this.selectedItems)
        .filter((key) => this.selectedItems[key] === true)
        .map((key) => {
          const item = this.itemList.find((item) => item.id == key);
          return {
            itemId: item.id,
            count: item.quantity,
          };
        });
      if (orderItems.length < 1) {
        alert("상품을 선택해주세요");
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
        if (
          confirm(
            `${[
              orderItems.map((el) => {
                el.itemId;
              }),
            ]} 주문하시겠습니까?`
          )
        )
          alert(`주문번호: ${response.data.result} 주문완료!`);
        window.location.reload();
      } catch (error) {
        alert("주문실패");
        console.log(error);
      }
    },
    scrollPagenation() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
      if (nearBottom && !this.isLastPage && !this.isLoading) {
        this.currentPage += 1;
        this.loadItems();
      }
    },
    searchItems() {
      this.itemList = [];
      this.currentPage = 0;
      this.loadItems();
      this.selectedItems = [];
      this.isLastPage = false;
    },
    async loadItems() {
      try {
        this.isLoading = true;
        const params = {
          page: this.currentPage,
          size: this.pageSize,
          // [this.searchType]: this.searchValue,
        };
        if (this.searchType === "name") {
          params.name = this.searchValue;
        } else if (this.searchType === "category") {
          params.category = this.searchValue;
        }

        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}/items`,
          { params }
        );
        const addItemList = response.data.map((item) => ({
          ...item,
          quantity: 1,
        }));
        if (addItemList.length < this.pageSize) {
          this.isLastPage = true;
        }
        // this.itemList += addItemList;
        this.itemList = [...this.itemList, ...addItemList];
      } catch (e) {
        console.error("에러:", e.message);
      }
      this.isLoading = false;
    },
    getImage(itemId) {
      return `${process.env.VUE_APP_API_BASE_URL}/item/${itemId}/image`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
