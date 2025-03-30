export let cart = JSON.parse(localStorage.getItem('cart'));


if (!cart) {
    cart = [{
        productId:
        '30d0cb8e-0e98-4a01-9c2c-cc097c878716',
        quantity: 2,
    }, {
        productId: '1e4713fd-fcef-400b-8a0d-b81ca3f2dfc5',
        quantity: 1,
    }];
}
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
} // ✅ Added missing closing brace

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
            quantity: 1
        });
    }

    saveToStorage(); // ✅ Ensure storage is updated
}

export function removeFromCart(productId) {
    const newCart = cart.filter(cartItem => cartItem.productId !== productId); // ✅ More efficient filtering
    cart = newCart;
    saveToStorage(); // ✅ Ensure cart update is saved
}
