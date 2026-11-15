// VOLTEN site interactions — plain JavaScript, no framework required.
document.getElementById('year').textContent = new Date().getFullYear();

const filterButtons = document.querySelectorAll('.filter-button');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const selected = button.dataset.filter;
    productCards.forEach((card) => {
      card.hidden = selected !== 'all' && card.dataset.category !== selected;
    });
  });
});

const dialog = document.getElementById('notify-dialog');
const dialogTitle = document.getElementById('dialog-title');

document.querySelectorAll('.notify-button').forEach((button) => {
  button.addEventListener('click', () => {
    dialogTitle.textContent = button.dataset.product.toUpperCase();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      alert('This is a preview site. Product notifications are not connected yet.');
    }
  });
});

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
