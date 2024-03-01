<!-- <template>
  <nav
    class="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <div>
        <router-link to="/">
          <h1
            class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900"
          >
            <span class="emoji-pulse">&#128204;</span>
            java shop
          </h1>
        </router-link>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white"
        >
          <li v-if="isAdmin">
            <router-link
              to="/login"
              class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
              aria-current="page"
              >회원관리</router-link
            >
          </li>
          <li>
            <router-link
              to="/author/create"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >회원가입</router-link
            >
          </li>
          <li>
            <router-link
              to="/posts"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >상품목록</router-link
            >
          </li>
          <li v-if="isAdmin">
            <router-link
              to="/posts"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >상품관리</router-link
            >
          </li>
          <li v-if="!loggedIn">
            <router-link
              to="/author/login-page"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >로그인</router-link
            >
          </li>
          <li v-if="loggedIn">
            <router-link
              to="/doLogout"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >로그아웃</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  setup() {},
};
</script>
<style lang=""></style> -->
<template>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
    <div class="navbar-collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul class="navbar-nav mr-auto" v-if="userRole === 'ADMIN'">
        <li class="nav-item">
          <a class="nav-link" href="/members">회원관리</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/items/manage">상품관리</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/orders">주문관리</a>
        </li>
      </ul>
    </div>
    <div class="mx-auto order-0">
      <a class="navbar-brand mx-auto" href="/">java shop</a>
    </div>
    <div class="navbar-collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/cart">장바구니({{ getTotalQuantity }})</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/items">상품목록</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/mypage">마이페이지</a>
        </li>
        <li v-if="!isLogin" class="nav-item">
          <a class="nav-link" href="/member/create">회원가입</a>
        </li>
        <li v-if="!isLogin" class="nav-item">
          <a class="nav-link" href="/login">로그인</a>
        </li>
        <li v-if="isLogin" class="nav-item">
          <a class="nav-link" href="#" @click="doLogout">로그아웃</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getTotalQuantity"]),
    // getTotalQuantity: () => {
    //   return this.$store.getTotalQuantity;
    // }
  },
  data() {
    return {
      isLogin: false,
      userRole: null,
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.userRole = localStorage.getItem("role");
    }
  },
  methods: {
    doLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.reload();
    },
  },
};
</script>
