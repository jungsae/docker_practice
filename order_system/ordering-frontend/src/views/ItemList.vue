<template>
  <ItemListComponent pageTitle="상품목록" :isAdmin="false" />
</template>
<script>
import ItemListComponent from "@/components/ItemListComponent.vue";
export default {
  components: {
    ItemListComponent,
  },
};
</script>
