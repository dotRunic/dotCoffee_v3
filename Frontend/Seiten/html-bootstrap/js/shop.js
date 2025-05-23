const host = 'http://localhost:8080'


let products = [];
let categories = [];
let cartProducts = [];

const getAllProducts = async () => {
    try {
        let response = await fetch(host.concat('/product'));
        if (response.ok) {
            products = await response.json();
        }
    } catch (e) {
        console.log(e);
    }
    return products;
}

const createProductCard = (product) => {
    const productCard = $(`
      <div class="card" style="width: 20rem;margin: 10px; padding: 10px;">
        <img class="card-img-top" src="${product.imagePath}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${product.titel}</h5>
          <p class="card-text">${product.description.substring(0, 20)}...</p>
          <a class="btn btn-primary" style="margin-right: 10px;" id="add-to-cart" type="button" pid="${product.id}">In den Warenkorb</a>
        </div>
      </div>
    `);
    return productCard;
};

const populateProducts = async () => {
    const products = await getAllProducts();
    const productCards = products.map((product) => createProductCard(product));
    $('#products').append(productCards);
};

// on ready click listener to add to cart button
$(document).on('click', '#add-to-cart', function () {
    const pid = $(this).attr('pid');
    const product = products.find((product) => product.id == pid);
    addToCart(product);
});



const getAllCategories = async () => {
    try {
        let response = await fetch(host.concat('/category'));
        if (response.ok) {
            categories = await response.json();
        }
    } catch (e) {
        console.log(e);
    }
    return categories;
}

const createCategoryCard = (category) => {
    const categoryCard = $(`
      <div class="card" style="width: 10rem;margin: 10px; padding: 10px;cursor: pointer;" id="category-card" pid="${category.name}">
        <img class="card-img-top" src="${category.imagePath}" alt="Category Image" height="100px" width="100px" style="object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${category.name}</h5>
          <!-- Add more details or actions for categories if needed -->
        </div>
      </div>
    `);
    return categoryCard;
};

const populateCategories = async () => {
    const categories = await getAllCategories();
    // also add category "all" to show all products
    // add image that says "all" or something
    categories.push({ name: 'All', imagePath: 'https://img.freepik.com/free-vector/coffee-types_23-2148558571.jpg' });
    const categoryCards = categories.map((category) => createCategoryCard(category));
    $('#categories').append(categoryCards);
};

// <!-- Product cards will be inserted here using JavaScript -->
const createCartProductCard = (product) => {
    const productCard = $(`
      <div class="card" style="width: 20rem;margin: 10px; padding: 10px;">
        <img class="card-img-top" src="${product.imagePath}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${product.titel}</h5>
          <p class="card-text">${product.description.substring(0, 20)}...</p>
        <a class="btn btn-danger" style="margin-right: 10px;" id="remove-from-cart" type="button" pid="${product.id}">Entfernen</a>
        </div>
      </div>
    `);
    return productCard;
};

const addToCart = (product) => {
    let cart = getCart();
    // if already in cart, show error message
    if (cart.find((p) => p.id == product.id)) {
        showErrorMessage('Dieses Produkt ist bereits im Warenkorb!');
        return;
    }
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    showSuccessMessage('Produkt wurde zum Warenkorb hinzugefügt!');
}

const removeFromCart = (product) => {
    let cart = getCart();
    // if not in cart, show error message
    if (!cart.find((p) => p.id == product.id)) {
        showErrorMessage('Dieses Produkt ist nicht im Warenkorb!');
        return;
    }
    cart = cart.filter((p) => p.id != product.id);
    localStorage.setItem('cart', JSON.stringify(cart));
    showSuccessMessage('Produkt wurde aus dem Warenkorb entfernt!');
}

// on ready click listener to remove from cart button
$(document).on('click', '#remove-from-cart', function () {
    const pid = $(this).attr('pid');
    const product = products.find((product) => product.id == pid);
    removeFromCart(product);
    location.reload();
});

const getCart = () => {
    let cart = localStorage.getItem('cart');
    if (cart === null) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }
    return cart;
}

const populateCartProducts = async () => {
    const products = getCart();
    if (products.length === 0) {
        $('#cartProducts').append('<h4>Keine Produkte im Warenkorb!</h4>');
        return;
    }
    const productCards = products.map((product) => createCartProductCard(product));
    $('#cartProducts').append(productCards);
}

const showSuccessMessage = (message) => {
    const alert = $(`
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `);
    $('#alert_placeholder').append(alert);
}

const showErrorMessage = (message) => {
    const alert = $(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `);
    $('#alert_placeholder').append(alert);
}


// when clicked on category card, it will filter the products
$(document).on('click', '#category-card', function () {
    // reset background color of all cards
    $('#categories').children().each(function () {
        $(this).css('background-color', 'white');
        $(this).css('color', 'black');
    }
    );
    // set background color of clicked card
    $(this).css('background-color', '#b15602');
    $(this).css('color', '#fff');
    
    const categoryName = $(this).attr('pid');
    if (categoryName === 'All') {
        $('#products').empty();
        populateProducts();
        $('#productTitle').text('Alle Produkte');
        return;
    }
    // filter products by category
    const filteredProducts = products.filter((product) => product.category.name === categoryName);
    $('#products').empty();
    const productCards = filteredProducts.map((product) => createProductCard(product));
    $('#products').append(productCards);
    $('#productTitle').text(categoryName + ' Produkte');
});


populateCategories();
populateProducts();
populateCartProducts();
