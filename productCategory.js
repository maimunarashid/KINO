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
const categoryHeading = document.createElement("h1");
categoryHeading.innerText = "Makeup Products";
categoryHeading.classList.add("text-2xl", "font-bold", "mb-2", "ml-2", "text-[#E2725B]");
productCategories.appendChild(categoryHeading);


categories.forEach(category =>{
    const categoryContent = document.createElement("div");
    categoryContent.innerHTML = `<button id="category-based-product-${category.id}" onclick="loadCategoryBasedProduct(${category.id})" class="hover:bg-[#E2725B] hover:text-white pt-2 pb-4 mb-2 ml-2  rounded-lg w-[120px] text-left">${category.category_name}</button>`;

    productCategories.appendChild(categoryContent);
})

}
loadProductCategories();




// all make up products
const loadAllMakeupProducts = ()=>{
    fetch("allProducts.json")
    .then(response =>response.json())
    .then(data =>displayAllMakeupProducts(data.allMakeupProducts))
}

const displayAllMakeupProducts = (allProducts)=>{
const allMakeupProducts = document.getElementById("allMakeup-products");
allMakeupProducts.innerHTML = "";


allProducts.forEach(product =>{
    const productCard = document.createElement("div");
    productCard.innerHTML = `<div class="card bg-base-100 w-96 shadow-lg flex flex-col flex-grow h-full min-h-[400px] justify-between transition-transform duration-300 ease-in-out hover:-translate-y-5 hover:shadow-lg">
    <img class="h-[260px] pl-5 pr-5 pt-5" src="${product.image}">
  <div class="card-body mb-[10px]">
    <h2 class="card-title">${product.name}</h2>
    <p class="text-gray-400">${product.description}</p>
    <div class="flex justify-between">
    <button class="btn rounded-[10px]">৳${product.price}</button>

<button class="btn btn-secondary bg-[#E2725B] group">
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
  1: "eyesCategory.json",
  2: "FaceCategory.json",
  3: "lipsCategory.json",
  4: "nailsCategory.json",
  5: "toolsCategory.json"
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
    eyesCard.innerHTML = `<div class="card bg-base-100 w-96 shadow-lg flex flex-col flex-grow h-full min-h-[400px] justify-between transition-transform duration-300 ease-in-out hover:-translate-y-5 hover:shadow-lg">
    <img class="h-[260px] pl-5 pr-5 pt-5" src="${eyesProduct.image}">
  <div class="card-body mb-[10px]">
    <h2 class="card-title">${eyesProduct.name}</h2>
    <p class="text-gray-400">${eyesProduct.description}</p>
    <div class="flex justify-between">
    <button class="btn rounded-[10px]">৳${eyesProduct.price}</button>

<button class="btn btn-secondary bg-[#E2725B] group">
  <span class="group-hover:hidden">Add to Cart</span>
  <span class="hidden group-hover:block w-[74px]"><i class="fa-solid fa-cart-shopping"></i></span>
</button>
    </div>
  </div>
</div>`;

    allEyesProduct.appendChild(eyesCard);
})
}

