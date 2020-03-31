<template>
  <div class="box">
    <span class="box__figure">{{ detail }}</span>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    description: String,
    detail: null,
  },
}
</script>