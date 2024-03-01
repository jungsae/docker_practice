<template>
  <ItemListComponent pageTitle="상품관리" :isAdmin="true" />
</template>
<script>
import ItemListComponent from "@/components/ItemListComponent.vue";
export default {
  components: {
    ItemListComponent,
  },
};
</script>
