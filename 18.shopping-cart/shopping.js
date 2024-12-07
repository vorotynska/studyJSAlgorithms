const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

const products = [
    {
        id: 1,
        name: "Vanilla Cupcakes (6 Pack)",
        price: 12.99,
        category: "Cupcake",
      },
      {
        id: 2,
        name: "French Macaron",
        price: 3.99,
        category: "Macaron",
      },
      {
        id: 3,
        name: "Pumpkin Cupcake",
        price: 3.99,
        category: "Cupcake",
      },
      {
        id: 4,
        name: "Chocolate Cupcake",
        price: 5.99,
        category: "Cupcake",
      },
      {
        id: 5,
        name: "Chocolate Pretzels (4 Pack)",
        price: 10.99,
        category: "Pretzel",
      },
      {
        id: 6,
        name: "Strawberry Ice Cream",
        price: 2.99,
        category: "Ice Cream",
      },
      {
        id: 7,
        name: "Chocolate Macarons (4 Pack)",
        price: 9.99,
        category: "Macaron",
      },
      {
        id: 8,
        name: "Strawberry Pretzel",
        price: 4.99,
        category: "Pretzel",
      },
      {
        id: 9,
        name: "Butter Pecan Ice Cream",
        price: 2.99,
        category: "Ice Cream",
      },
      {
        id: 10,
        name: "Rocky Road Ice Cream",
        price: 2.99,
        category: "Ice Cream",
      },
      {
        id: 11,
        name: "Vanilla Macarons (5 Pack)",
        price: 11.99,
        category: "Macaron",
      },
      {
        id: 12,
        name: "Lemon Cupcakes (4 Pack)",
        price: 12.99,
        category: "Cupcake",
      },
];
//to insert list of products into the HTML.
products.forEach(({ name, id, price, category }) => {
    dessertCards.innerHTML += `
    <div class="dessert-card">
      <h2>${name}</h2>
      <p class="dessert-price">$${price}</p>
      <p class="product-category">Category: ${category}</p>
      <button id="${id}" class="btn add-to-cart-btn">Add to cart</button>
    </div>
    `;
});

class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.taxRate = 8.25;
    }
    addItem(id, products) {
      const product = products.find((item) => item.id === id);
      const {name, price} = product;
      this.items.push(product);

      const totalCountPerProduct = {};
      this.items.forEach((dessert) => {
        totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
      })

      const currentProductCount = totalCountPerProduct[product.id];
      const currentProductCountSpan = document.getElementById(`product-count-for-id${product.id}`);
      currentProductCount > 1 ? 
      currentProductCountSpan.textContent = `${currentProductCount}`
      : productsContainer.innerHTML += `
      <div class="product" id="dessert${id}">
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>
          ${name}
        </p>
        <p>${price}</p>
      </div>
      `;
    }
    getCounts() {
      return this.items.length;
    }

    clearCart() {
          // Проверяем, пуст ли массив items
          if (!this.items.length) {
            // Показываем сообщение пользователю
            alert("Your shopping cart is already empty");
            // Прекращаем выполнение функции
            return;
          }
        
          // Спрашиваем у пользователя подтверждение
          const isCartCleared = confirm("Are you sure you want to clear all items from your shopping cart?");
          
          // Если пользователь подтвердил
          if (isCartCleared) {
            // Очищаем массив items
            this.items = [];
            // Сбрасываем сумму
            this.total = 0;
            productsContainer.innerHTML = '';
            totalNumberOfItems.textContent = 0;
            cartSubTotal.textContent = 0;
            cartTaxes.textContent = 0;
            cartTotal.textContent = 0;
      }
    }
    
    calculateTaxes(amount) {
      return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
    }
  
    calculateTotal() {
      const subTotal = this.items.reduce((total, item) => total + item.price, 0);
      const tax = this.calculateTaxes(subTotal);
      this.total = subTotal + tax;
      cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
      cartTaxes.textContent = `$${tax.toFixed(2)}`;
      cartTotal.textContent = `$${this.total.toFixed(2)}`;
      return this.total;
    }
  };

//need to be able to test the code you have currently written.
const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
//Use the spread operator on the addToCartBtns variable to convert it into an array
[...addToCartBtns].forEach(
  (btn) => {
    btn.addEventListener("click", (event) => {
      cart.addItem(Number(event.target.id), products);
      //assign the value of your cart object's .getCounts() method to the textContent property of the totalNumberOfItems variable.
      totalNumberOfItems.textContent = cart.getCounts();
      //Now call your .calculateTotal() method inside your forEach loop.
      cart.calculateTotal();
    })
  }
);

cartBtn.addEventListener("click", () => {
  //can use the logical not operator ! to invert the value of a boolean.
  isCartShowing =!isCartShowing;
 //showHideCartSpan.textContent = isCartShowing? "Hide Cart" : "Show Cart";
   showHideCartSpan.textContent = isCartShowing ? "Hide"
   : "Show";
   cartContainer.style.display = isCartShowing? "block" : "none";
});

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));
