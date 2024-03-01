<template>
  <h1>{{ mylang }}</h1>
  <div class="input-box">
    <input type="text" name="" value="입력" placeholder="입력" />
    <!-- v-bind 단방향 데이터 바인딩  -->
    <input type="text" v-model="inputValue1" />
    <!-- v-model  양방향 데이터 바인딩-->
    <input type="text" :value="inputValue2" />
  </div>

  <button @click="toggle" id="button">클릭</button>
  <div>
    <h2>{{ count }}</h2>
    <button @click="increment">increment</button>
    <h2>{{ doubleCount }}</h2>
    <button @click="increment">increment</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      mylang: "python",
      inputValue1: "파이썬2",
      inputValue2: "파이썬3",
      timeout: 1000,
    };
  },
  created() {
    this.mylang = "java";
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    },
  },
  methods: {
    increment() {
      this.count++;
    },
    toggle() {
      this.inputValue2 != this.inputValue1
        ? (this.inputValue2 = this.inputValue1)
        : (this.inputValue1 = this.inputValue2);
    },
  },
};
</script>
<style>
h1 {
  text-align: center;
  margin: 50px;
}
.input-box {
  display: flex;
  justify-content: space-evenly;
}
#button {
  justify-content: center;
  border: rgb(77, 130, 236) 2px solid;
}
</style>
