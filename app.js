console.clear();

const app = Vue.createApp({
  data() {
    return {
      products: [],
      cart: [],
      toastMessage: "",
      toastType: "",
    };
  },
  methods: {
    async getProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        this.products = data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
        this.showToast("Failed to load products", "error");
      }
    },
    openCart() {
      document.querySelector(".cart").classList.add("active");
    },
    closeCart() {
      document.querySelector(".cart").classList.remove("active");
    },
    addToCart(product) {
      if (product) {
        this.cart.push(product);
        this.showToast("Item added to cart", "success");
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((product) => product.id !== id);
      this.showToast("Item removed from cart", "delete");
    },
    showToast(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      let toast = document.querySelector(".toast");
      toast.innerHTML = `<span>
            <i style="color: ${
              type === "success" ? "green" : "red"
            };" class="fas fa-${type === "success" ? "check" : "times"}"></i>
            ${message}</span>`;
      toast.style.transform = "translateY(0)";
      toast.style.top = "20px";
      setTimeout(() => {
        toast.style.transform = "translateY(-100%)";
        toast.style.top = "-20px";
      }, 2000);
    },
  },
  mounted() {
    this.getProducts();
  },
});

app.mount("#app");
