<template>
  <form class="app-form">

    <AppInput
        placeholder="Product name"
        name="product-name"
        v-model.trim="productItem.name"
        :error="$v.productItem.name.$error"
    ></AppInput>

    <AppInput
        placeholder="Price"
        name="price"
        type="number"
        v-model.number="productItem.price"
        :error="$v.productItem.price.$error"
    ></AppInput>

    <AppInput
        placeholder="Qty"
        name="qty"
        type="number"
        v-model.number="productItem.qty"
        :error="$v.productItem.qty.$error"
    ></AppInput>

    <AppButton @handleClick="createProduct">
      Add
    </AppButton>

  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { ProductItem} from '@/types/entities';
import { validationMixin } from 'vuelidate';
import { required, minValue } from 'vuelidate/lib/validators';

export default Vue.extend({
  name: 'AddProductForm',
  mixins: [validationMixin],
  data() {
    return {
      productItem: {
        name: null,
        price: null,
        qty: null
      }
    }
  },
  validations: {
    productItem: {
      name: {
        required
      },
      price: {
        required,
        minValue: minValue(0)
      },
      qty: {
        required,
        minValue: minValue(0)
      }
    },
  },
  methods: {
    createProduct(): void {
      this.$v.productItem.$touch();
      if (!this.$v.$invalid) {
        this.$emit('addProductToList', this.getNewProduct());
        this.clearProductForm();
        this.$v.$reset();
      }
    },
    getNewProduct(): ProductItem {
      const newProduct = {
        id: new Date().getTime(),
        checked: false,
        name: this.productItem.name,
        price: this.productItem.price,
        qty: this.productItem.qty,
        sum: 0
      };
      const productSum = parseFloat(this.productItem.price) * parseFloat(this.productItem.qty);

      if (!isNaN(productSum)) {
        newProduct.sum = parseFloat(productSum.toFixed(2));
      }

      return newProduct;
    },
    clearProductForm(): void {
      this.productItem.name = null;
      this.productItem.price = null;
      this.productItem.qty = null;
    }
  }
});
</script>

<style lang="scss" scoped>

.app-form {
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 15px;
  }
}

</style>
