import { createStore } from "vuex";

function initState() {
  return {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    totalQuantity: localStorage.getItem("totalQuantity") || 0,
  };
}

function updataLocalStorage(cartItems, totalQuantity) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
}

// initState, updateLcalStorage와 같은 함수는 스토어 정의 바깥에 위치
// 책임과 권한을 분리하는 개념적인 의도도 있지만, 다른 스토어나 다른 상황에서
// 재사용성을 높이기위한 아키텍처
export default createStore({
  state: initState,
  mutations: {
    //   외부 컴포넌트(또는 action)에서 호출될 예정
    addToCart(state, item) {
      const existItem = state.cartItems.find((i) => i.itemId == item.itemId);
      if (existItem) {
        existItem.count += item.count;
      } else {
        state.cartItems.push(item);
      }
      state.totalQuantity = parseInt(state.totalQuantity) + item.count;
      updataLocalStorage(state.cartItems, state.totalQuantity);
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      updataLocalStorage([], 0);
    },
  },
  actions: {
    addToCart(context, item) {
      context.commit("addToCart", item);
    },
    clearCart(context) {
      context.commit("clearCart");
    },
  },
  getters: {
    cartItems: (state) => state.cartItems,
    getTotalQuantity: (state) => state.totalQuantity,
  },
});
