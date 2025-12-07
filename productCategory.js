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
categoryHeading.innerText = "Product Categories";
categoryHeading.classList.add("text-2xl", "font-bold", "mb-2", "text-[#FF69B4]");
productCategories.appendChild(categoryHeading);


categories.forEach(category =>{
    const categoryContent = document.createElement("div");
    categoryContent.innerHTML = `<button id="category-based-product-${category.id}" onclick="loadCategoryBasedProduct(${category.id})" class="hover:bg-[#FF69B4] hover:text-white p-2 rounded-lg w-full text-left">${category.category_name}</button>`;

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
    <p>${product.description}</p>
    <div class="flex justify-between">
    <button class="btn rounded-[10px]">৳${product.price}</button>
      <button class="btn btn-secondary bg-[#FF69B4]">Add to Cart</button>
    </div>
  </div>
</div>`;

    allMakeupProducts.appendChild(productCard);
})
}
loadAllMakeupProducts();


// category based products
const loadCategoryBasedProduct = (id)=>{
    const url = `allProducts.json`
fetch()

}