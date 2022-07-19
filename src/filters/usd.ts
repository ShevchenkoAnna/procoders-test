import Vue from 'vue';

Vue.filter('usd', function ( value: number): string {
  return `$ ${value}`;
})
