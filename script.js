// VOLTEN storefront interactions — pre-launch cart preview.
document.getElementById('year').textContent = new Date().getFullYear();
const filterButtons = document.querySelectorAll('.filter-button');
const productCards = document.querySelectorAll('.product-card');
filterButtons.forEach((button) => button.addEventListener('click', () => {
  filterButtons.forEach((item) => item.classList.remove('active')); button.classList.add('active');
  const selected = button.dataset.filter; productCards.forEach((card) => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
}));
const products = {
  'v-series-fender': { id: 'v-series-fender', name: 'V-Series Front Fender', price: null },
  'stealth-graphics-kit': { id: 'stealth-graphics-kit', name: 'Stealth Graphics Kit', price: null },
  'mono-front-fender': { id: 'mono-front-fender', name: 'Mono Front Fender', price: null }
};
const cart = new Map(); const drawer = document.getElementById('cart-drawer'); const backdrop = document.getElementById('cart-backdrop');
const cartCount = document.getElementById('cart-count'); const headingCount = document.getElementById('cart-heading-count');
const itemsContainer = document.getElementById('cart-items'); const subtotal = document.getElementById('cart-subtotal');
function openCart(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');backdrop.hidden=false;document.querySelector('.cart-toggle').setAttribute('aria-expanded','true');}
function closeCart(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');backdrop.hidden=true;document.querySelector('.cart-toggle').setAttribute('aria-expanded','false');}
document.querySelector('.cart-toggle').addEventListener('click',openCart);document.getElementById('cart-close').addEventListener('click',closeCart);backdrop.addEventListener('click',closeCart);
document.addEventListener('keydown',(event)=>{if(event.key==='Escape')closeCart();});
document.querySelectorAll('.add-to-cart').forEach((button)=>button.addEventListener('click',()=>{const product=products[button.dataset.id];if(!product)return;const current=cart.get(product.id);cart.set(product.id,{...product,quantity:current?current.quantity+1:1});renderCart();openCart();}));
function updateQuantity(id,change){const item=cart.get(id);if(!item)return;item.quantity+=change;if(item.quantity<=0)cart.delete(id);renderCart();}
function renderCart(){const count=[...cart.values()].reduce((sum,item)=>sum+item.quantity,0);cartCount.textContent=count;headingCount.textContent=`(${count})`;
 if(cart.size===0){itemsContainer.innerHTML='<p class="cart-empty">Your cart is empty. Explore the collection to add something.</p>';}else{itemsContainer.innerHTML=[...cart.values()].map((item)=>`<article class="cart-item"><div><h3>${item.name}</h3><p>Pre-launch concept · Price to be announced</p><div class="cart-item-controls"><button type="button" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button><span class="cart-qty">${item.quantity}</span><button type="button" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button><button type="button" class="remove-item" data-action="remove" data-id="${item.id}">Remove</button></div></div><span class="cart-item-price">PRICE TBA</span></article>`).join('');}
 subtotal.textContent='Pricing not set';}
itemsContainer.addEventListener('click',(event)=>{const button=event.target.closest('button[data-action]');if(!button)return;const {action,id}=button.dataset;if(action==='increase')updateQuantity(id,1);if(action==='decrease')updateQuantity(id,-1);if(action==='remove'){cart.delete(id);renderCart();}});
renderCart();
