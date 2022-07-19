<template>
  <div class="app-field" :class="{'error-field': error}">
    <input
        class="app-field__input"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="updateValue"
    >
    <div class="app-field__extra">
      <span v-if="error" class="app-field__error">Invalid value</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppInput',
  props: {
    type: {
      default: 'text',
      type: String
    },
    name: {
      required: true,
      type: String
    },
    placeholder: String,
    value: [String, Number],
    error: Boolean
  },
  methods: {
    updateValue(event: Event): void {
      this.$emit('input', (event.target as HTMLInputElement).value);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.app-field {
  width: 100%;

  &__input {
    box-sizing: border-box;
    width: 100%;
    padding: 12px;
    border: 3px solid $color-black;
    color: $color-black;
    font-weight: 700;
    transition: all .3s;
    outline: none;
  }

  &__extra {
    min-height: 15px;
    text-align: left;
  }

  &__error {
    color: $color-error;
    font-size: .75rem;
  }

  &.error-field {
    .app-field__input {
      border-color: $color-error;
    }
  }
}

</style>
