<template>
  <div :class="check?'icon-container check':'icon-container'">
    <a-icon :type="check?'check':'cross'" />
  </div>
</template>

<script>
export default {
  name: "FooterToolBar",
  props: {
    check: {
      type: Boolean,
      default: false
    }
  }
};
</script>
