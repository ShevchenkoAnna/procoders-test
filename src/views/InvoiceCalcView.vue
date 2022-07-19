<template>
  <div class="app-container">

    <h1>Vue Invoice Calc</h1>

    <AddProductForm
        @addProductToList="addProductToList"
    ></AddProductForm>

    <section class="app-table-container">
      <table class="app-table">
        <thead>
        <tr>
          <th>
            <input
                type="checkbox"
                v-model="checkAll"
                @change="handleCheckAll"
                :disabled="isListEmpty"
            >
          </th>
          <th class="app-table__main-column">Product name</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Sum</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in productsList" :key="product.id">
          <td>
            <input
                type="checkbox"
                v-model="product.checked"
            >
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.price | usd }}</td>
          <td>{{ product.qty }}</td>
          <td>{{ product.sum | usd }}</td>
        </tr>
        <tr v-if="isListEmpty" class="app-table__no-data">
          <td colspan="5">No data</td>
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
  name: 'HomeView',
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
      return Boolean(this.productsList.filter(product => product.checked).length);
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
      this.productsList.forEach(product => product.checked = this.checkAll);
    },
    removeProducts(): void {
      this.productsList = this.productsList.filter(product => !product.checked);
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
  table-layout: fixed;

  thead {
    th {
      background: $color-table-header;
    }
  }

  th,
  td {
    padding: .625em;
    text-align: left;
    border-width: 0 3px;
    border-style: solid;
    border-color: $color-black;
  }

  tr:nth-child(odd) {
    background-color: $color-table-row-dark;
  }

  tr:nth-child(even) {
    background-color: $color-table-row-light;
  }

  th {
    font-size: .85em;
  }

  &__main-column {
    width: 40%;
  }

  &__no-data {
    border-top: 3px solid $color-black;

    td {
      text-align: center;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@media screen and (max-width: 600px) {

}
</style>
