<template>
  <div class="loading">
    <img src="@/assets/gifs/loading.gif" width="200px" alt="loading" />
  </div>
</template>

<script>
export default {
  name: "loadingValidation",
};
</script>

<style>
.loading {
  grid-area: content;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>