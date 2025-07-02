//localStorage.removeItem('cart');


//Initialize the Cart from localStorage

export let cart = JSON.parse(localStorage.getItem('cart'));


//If there’s no cart saved yet (e.g. on first visit), then...
//This provides default items in the cart — useful for testing or starting values.

if (!cart) {
    cart = [{
        productId:
        '30d0cb8e-0e98-4a01-9c2c-cc097c878716',
        quantity: 2,
        deliveryOptionId: '1' // 👈 Comes from deliveryOptions.js
    }, {
        productId: '1e4713fd-fcef-400b-8a0d-b81ca3f2dfc5',
        quantity: 1,
        deliveryOptionId: '2'
    }];
}

//Anytime the cart changes (item added, removed, etc.), you call this function to save the latest cart state in localStorage.

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
} 

//If the product already exists in the cart → just increase the quantity.
//If it doesn’t → add it with quantity = 1 and default delivery.

export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    saveToStorage(); // ✅ Ensure storage is updated
}

//Removes the item by filtering out the product by ID.
//Updates the cart and saves it again.


export function removeFromCart(productId) {
    const newCart = cart.filter(cartItem => cartItem.productId !== productId); // ✅ More efficient filtering
    cart = newCart;
    saveToStorage(); // ✅ Ensure cart update is saved
}


//Finds the cart item by product ID.
//Updates its delivery option (for example, 1-day or 3-day shipping).
//Saves the updated cart.


export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId

    saveToStorage();
}
