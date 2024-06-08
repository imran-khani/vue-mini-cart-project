console.clear();

const app = Vue.createApp({
  data() {
    return {
      products: [],
      cart: [],
    };
  },
  methods: {
    async getProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        this.products = data;
      } catch (error) {
        throw new Error(error);
      }
    },
    openCart() {
      document.querySelector(".cart").classList.add("active");
    },
    closeCart() {
      document.querySelector(".cart").classList.remove("active");
    },
    addToCart(product) {
      this.cart.push(product);
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((product) => product.id !== id);
    },
  },
  mounted() {
    this.getProducts();
  },
});

app.mount("#app");
