<template>
  <div class="app-container">

    <h1>Vue Invoice Calc</h1>

    <AddProductForm
        @addProductToList="addProductToList"
    ></AddProductForm>

    <section class="app-table__container">
      <table class="app-table">
        <thead class="app-table__head">
        <tr class="app-table__head-row">
          <th class="app-table__head-cell">
            <input
                type="checkbox"
                v-model="checkAll"
                @change="handleCheckAll"
                :disabled="isListEmpty"
            >
          </th>
          <th class="app-table__head-cell app-table__main-column">Product name</th>
          <th class="app-table__head-cell">Price</th>
          <th class="app-table__head-cell">Qty</th>
          <th class="app-table__head-cell">Sum</th>
        </tr>
        </thead>
        <tbody>
        <tr class="app-table__body-row" v-for="product in productsList" :key="product.id">
          <td class="app-table__body-cell">
            <input
                type="checkbox"
                v-model="product.checked"
            >
          </td>
          <td class="app-table__body-cell">{{ product.name }}</td>
          <td class="app-table__body-cell">{{ product.price | usd }}</td>
          <td class="app-table__body-cell">{{ product.qty }}</td>
          <td class="app-table__body-cell">{{ product.sum | usd }}</td>
        </tr>
        <tr v-if="isListEmpty" class="app-table__body-row app-table__no-data">
          <td class="app-table__body-cell" colspan="5">No data</td>
        </tr>
        </tbody>
      </table>
    </section>

    <section class="app-table__footer">

      <AppButton
          @handleClick="removeProducts"
          :disabled="!isBtnDeleteActive"
      >Delete</AppButton>

      <div>Total: {{ totalSum | usd }}</div>

    </section>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AddProductForm from '@/components/AddProductForm.vue';
import { ProductItem} from '@/types/entities';

export default Vue.extend({
  name: 'InvoiceCalcView',
  components: {
    AddProductForm
  },
  data() {
    return {
      checkAll: false,
      productsList: [] as ProductItem[]
    }
  },
  computed: {
    totalSum(): number {
      let total = 0;
      if (!this.isListEmpty) {
        total = this.productsList.reduce((totalSum, product) => {
          return !isNaN(product.sum) ? totalSum + product.sum : totalSum;
        }, 0);
      }
      return total;
    },
    isListEmpty(): boolean {
      return this.productsList.length === 0;
    },
    isBtnDeleteActive(): boolean {
      return Boolean(this.productsList.filter((product: ProductItem) => product.checked).length);
    }
  },
  watch: {
    isListEmpty(val): void {
      if (val) {
        this.checkAll = false;
      }
    }
  },
  methods: {
    addProductToList(newProduct: ProductItem): void {
      this.productsList.push(newProduct);
      this.saveToLS();
    },
    handleCheckAll(): void {
      this.productsList.forEach((product: ProductItem) => product.checked = this.checkAll);
    },
    removeProducts(): void {
      this.productsList = this.productsList.filter((product: ProductItem) => !product.checked);
      this.saveToLS();
    },
    saveToLS(): void {
      localStorage.setItem('productsList', JSON.stringify(this.productsList));
    },
    setFromLS(): void {
      const productsListFromLS = localStorage.getItem('productsList');
      if (productsListFromLS) {
        this.productsList = JSON.parse(productsListFromLS);
      }
    }
  },
  mounted() {
    this.setFromLS();
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.app-table {
  border: 3px solid $color-black;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;

  &__container {
    overflow-x: auto;
  }

  &__head {
    &-cell {
      font-size: .85em;
      background: $color-table-header;
      min-width: 100px;
    }
  }

  &__head-cell,
  &__body-cell {
    padding: .625em;
    text-align: left;
    border-width: 0 3px;
    border-style: solid;
    border-color: $color-black;
  }

  &__body-row:nth-child(odd) {
    background-color: $color-table-row-dark;
  }

  &__body-row:nth-child(even) {
    background-color: $color-table-row-light;
  }

  &__main-column {
    width: 40%;
  }

  &__no-data {
    border-top: 3px solid $color-black;

    .app-table__body-cell {
      text-align: center;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
