<template>
  <button class="app-button" @click="handleClick" :disabled="disabled" type="button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppButton',
  props: {
    title: String,
    disabled: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    handleClick(): void {
      this.$emit('handleClick');
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.app-button {
  height: fit-content;
  padding: 12px 50px;
  border: 3px solid $color-black;
  color: $color-black;
  text-decoration: none;
  text-transform: capitalize;
  font-family: inherit;
  font-weight: 700;
  transition: all .3s;

  &:hover:not(:disabled) {
    border: 3px solid $color-black;
    background: $color-black;
    color: $color-white;
    cursor: pointer;
  }

  &:active:not(:disabled) {
    transform: translateY(5px);
  }

  &:disabled {
    pointer-events: none;
    border-color: $color-disable;
    color: $color-disable;
  }
}

</style>
