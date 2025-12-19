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
    categoryContent.innerHTML = `<button id="category-based-product-${category.id}" onclick="loadCategoryBasedProduct(${category.id})" class="bg-purple-100 hover:bg-pink-900 hover:text-white pt-2 pb-4  mb-1 ml-2  rounded-lg w-[150px] border border-gray-300">${category.category_name}</button>`;

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

<button class="btn btn-secondary bg-pink-900 border border-gray-100 group add-to-cart" data-id="${product.id}">
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

<button class="btn btn-secondary bg-pink-900 border border-gray-100 group add-to-cart" data-id="${eyesProduct.id}">
  <span class="group-hover:hidden">Add to Cart</span>
  <span class="hidden group-hover:block w-[74px]"><i class="fa-solid fa-cart-shopping"></i></span>
</button>
    </div>
  </div>
</div>`;

    allEyesProduct.appendChild(eyesCard);
})
}


// add to cart item count update
let items = [];
let itemCount = document.getElementById("item-count");

document.getElementById("allMakeup-products").addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart"); 
  if (btn) 
    { 
      const productId = btn.getAttribute("data-id");
    if (!items.includes(productId))
       { 
        items.push(productId); 
      } 
     itemCount.innerText = items.length;}
});


