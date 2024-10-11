// Selecting elements
let homeBtn = document.getElementById('homeBtn');
let cartBtn = document.getElementById('cartBtn');
let homePage = document.getElementById('homePage');
let cartPage = document.getElementById('cartPage');
let cartList = document.getElementById('cartList');
let totalPrice = document.getElementById('totalPrice');
let searchBar = document.getElementById('searchBar');
let searchBtn = document.getElementById('searchBtn');
let checkoutBtn = document.getElementById('checkoutBtn');
let clearCartBtn = document.getElementById('clearCartBtn');

let cart = []; // Start with an empty cart
let total = 0;

// Function to update the cart
function updateCart() {
  cartList.innerHTML = '';
  total = 0;
  cart.forEach(item => {
    let li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
    total += item.price;
  });
  totalPrice.textContent = total.toFixed(2);
  
  // Save cart to local storage (optional, since we're clearing on refresh)
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from local storage on page load (commented out to reset on refresh)
// window.onload = function() {
//   cart = JSON.parse(localStorage.getItem('cart')) || [];
//   updateCart();
// };

// Adding click event to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    let bookItem = this.parentElement;
    let name = bookItem.getAttribute('data-name');
    let price = parseFloat(bookItem.getAttribute('data-price'));
    cart.push({ name, price });
    updateCart();
    alert(`${name} added to the cart!`);
  });
});

// Toggle between Home and Cart pages
homeBtn.addEventListener('click', () => {
  homePage.style.display = 'block';
  cartPage.style.display = 'none';
});
cartBtn.addEventListener('click', () => {
  homePage.style.display = 'none';
  cartPage.style.display = 'block';
});

// Search functionality
searchBtn.addEventListener('click', () => {
  let searchTerm = searchBar.value.toLowerCase();
  let books = document.querySelectorAll('.book-item');
  let found = false;
  books.forEach(book => {
    let bookName = book.getAttribute('data-name').toLowerCase();
    if (bookName.includes(searchTerm)) {
      let name = book.getAttribute('data-name');
      let price = parseFloat(book.getAttribute('data-price'));
      cart.push({ name, price });
      updateCart();
      found = true;
    }
  });
  if (found) {
    alert(`Book added to cart!`);
  } else {
    alert(`Book not found!`);
  }
});
