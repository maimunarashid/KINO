//MakeUP section - product Categories
const loadProductCategories = ()=>{
    fetch("productCategory.json")
    .then(response => response.json())
    .then(data => displayProductCategories(data.categories))
}

const displayProductCategories = (categories) =>{
const productCategories = document.getElementById("product-categories");
productCategories.innerHTML = "";

// Category Heading create
// const categoryHeading = document.createElement("h1");
// categoryHeading.innerText = "Makeup Products";
// categoryHeading.classList.add("text-2xl", "font-bold", "mb-2", "ml-2", "text-[#E2725B]");
// productCategories.appendChild(categoryHeading);


categories.forEach(category =>{
    const categoryContent = document.createElement("div");
    categoryContent.innerHTML = `<button id="category-based-product-${category.id}" onclick="loadCategoryBasedProduct(${category.id})" class="bg-purple-100 hover:bg-pink-900 hover:text-white pt-2 pb-4  mb-1 ml-2  rounded-lg w-[150px] border border-gray-300 hover:cursor-pointer hover:underline">${category.category_name}</button>`;

    productCategories.appendChild(categoryContent);
})

}
loadProductCategories();




// all make up products
const loadAllMakeupProducts = ()=>{
    fetch("allProducts.json")
    .then(response =>response.json())
    .then(data =>displayAllMakeupProducts(data.product))
}

const displayAllMakeupProducts = (allProducts)=>{
const allMakeupProducts = document.getElementById("allMakeup-products");
allMakeupProducts.innerHTML = "";


allProducts.forEach(product =>{
    const productCard = document.createElement("div");
    productCard.innerHTML = `<div class="mb-6 card bg-base-100 w-85 shadow-lg h-full min-h-[350px] justify-between transition-transform duration-300 ease-in-out hover:-translate-y-5 hover:shadow-lg gap-6">
    <img class="transition-transform duration-500 ease-in-out hover:scale-103 h-[250px] pl-5 pr-5 pt-5" src="${product.image}">
  <div class="card-body mb-[5px]">
    <h2 class="card-title">${product.name}</h2>
    <p class="text-gray-400">${product.description}</p>
    <div class="flex justify-between">
    <button class="btn rounded-[10px]">৳${product.price}</button>

<button class="btn btn-secondary bg-pink-900 border border-gray-100 group add-to-cart" data-id="${product.id}" data-price="${product.price}" data-name="${product.name}" data-stock="${product.stock}" data-image="${product.image}">
  <span class="group-hover:hidden">Add to Cart</span>
  <span class="hidden group-hover:block w-[74px]"><i class="fa-solid fa-cart-shopping"></i></span>
</button>
    </div>
  </div>
</div>`;

    allMakeupProducts.appendChild(productCard);
})
}
loadAllMakeupProducts();


// category based products eyes
const categoryFiles = {
  1: "allProducts.json",
  2: "eyesCategory.json",
  3: "FaceCategory.json",
  4: "lipsCategory.json",
  5: "nailsCategory.json",
  6: "toolsCategory.json"
};

const loadCategoryBasedProduct = (id) => {
  const fileName = categoryFiles[id]; 
  fetch(fileName)
    .then(res => res.json())
    .then(data => displayAllCategory(data.product));
};



const displayAllCategory = (eyesProducts)=>{
const allEyesProduct= document.getElementById("allMakeup-products");
allEyesProduct.innerHTML = "";


eyesProducts.forEach(eyesProduct =>{
    const eyesCard = document.createElement("div");
    eyesCard.innerHTML = `<div class="mb-6 card bg-base-100 w-85 shadow-lg flex flex-col flex-grow h-full min-h-[350px] justify-between transition-transform duration-300 ease-in-out hover:-translate-y-5 hover:shadow-lg" >
    <img class="transition-transform duration-500 ease-in-out hover:scale-103 h-[250px] pl-5 pr-5 pt-5" src="${eyesProduct.image}">
  <div class="card-body mb-[5px]">
    <h2 class="card-title">${eyesProduct.name}</h2>
    <p class="text-gray-400">${eyesProduct.description}</p>
    <div class="flex justify-between">
    <button class="btn rounded-[10px]">৳${eyesProduct.price}</button>

<button class="btn btn-secondary bg-pink-900 border border-gray-100 group add-to-cart" data-id="${eyesProduct.id}" data-price="${eyesProduct.price}" data-name="${eyesProduct.name}" data-stock="${eyesProduct.stock}" data-image="${eyesProduct.image}" >
  <span class="group-hover:hidden">Add to Cart</span>
  <span class="hidden group-hover:block w-[74px]"><i class="fa-solid fa-cart-shopping"></i></span>
</button>
    </div>
  </div>
</div>`;

    allEyesProduct.appendChild(eyesCard);
})
}


// cart functionality
// ---------------- CART LOGIC ----------------
let cart = [];

// Event delegation: handle Add to Cart clicks
document.getElementById("allMakeup-products").addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart");
  if (btn) {
    const productId = btn.getAttribute("data-id");
    const productPrice = parseFloat(btn.getAttribute("data-price"));
    const productName = btn.getAttribute("data-name");
    const productImage = btn.getAttribute("data-image");
    const productStock = parseInt(btn.getAttribute("data-stock"));

    let existing = cart.find(p => p.id === productId);

    if (!existing) {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1,
        stock: productStock
      });
    } else {
      // if already in cart, just increase quantity if stock allows
      if (existing.quantity < existing.stock) {
        existing.quantity++;
      } else {
        alert("Max quantity per order limit reached!");
      }
    }

    updateCartSummary();
    renderCartDetail();
  }
});

// Update small cart section (count + total)
function updateCartSummary() {
  document.getElementById("item-count").innerText = cart.length;
  const total = cart.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  document.getElementById("total-amount").innerText = total;
}



// Toggle cart detail when clicking the cart section
document.getElementById("cart-button").addEventListener("click", () => {
  document.getElementById("cart-detail").classList.toggle("hidden");
  renderCartDetail();
});

document.addEventListener("click", (e) => {
  const detail = document.getElementById("cart-detail");
  const cartBtn = document.getElementById("cart-button");
  if (!detail.contains(e.target) && !cartBtn.contains(e.target)) {
    detail.classList.add("hidden");
  }
});


// Render cart detail with + / – buttons
function renderCartDetail() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  cart.forEach(product => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("border", "border-gray-300", "p-2", "rounded", "bg-gray-100");

    itemDiv.innerHTML = `
      <div class="flex gap-3 items-center">
        <img src="${product.image}" class="w-16 h-16 object-cover rounded" />
        <div class="flex-grow">
          <p class="font-semibold">${product.name}</p>
          <p>৳${product.price} × ${product.quantity} = ৳${product.price * product.quantity}</p>
          <div class="flex gap-2 mt-1">
            <button class="px-2 bg-pink-700 text-white rounded decrease" data-id="${product.id}">–</button>
            <span>${product.quantity}</span>
            <button class="px-2 bg-pink-700 text-white rounded increase" data-id="${product.id}">+</button>
          </div>
        </div>
      </div>
    `;

    cartItems.appendChild(itemDiv);
  });

  // Add listeners for + / –
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const product = cart.find(p => p.id === id);
      if (product.quantity < product.stock) {
        product.quantity++;
      } else {
        alert("Max quantity per order limit reached!");
      }
      updateCartSummary();
      renderCartDetail();
    });
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const product = cart.find(p => p.id === id);
      if (product.quantity > 1) {
        product.quantity--;
      }
      updateCartSummary();
      renderCartDetail();
    });
  });

  // Update total in detail panel
  const total = cart.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  document.getElementById("cart-total").innerText = total;
}



