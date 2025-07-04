// The file is responsible for rendering the "Your Cart" summary on the checkout page.

import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  // Loop through each item in the cart
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    // ✅ SAFEGUARD: Prevents crash if product ID isn't found
    if (!matchingProduct) {
      console.warn(`⚠️ Product not found for productId: ${productId}`);
      return; // Skip this item
    }

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>`;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
             data-product-id="${matchingProduct.id}"
             data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
                 class="delivery-option-input"
                 name="delivery-option-${matchingProduct.id}"
                 ${isChecked ? 'checked' : ''}>
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString}</div>
          </div>
        </div>`;
    });

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Delete handler
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      renderOrderSummary();
    });
  });

  // Delivery option handler
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
