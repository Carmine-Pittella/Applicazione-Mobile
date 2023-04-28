const menuButton = document.querySelector('.menu-button');
const menuSidebar = document.querySelector('.menu-sidebar');

menuButton.addEventListener('click', () => {
  menuSidebar.style.left = '0';
});

menuSidebar.addEventListener('click', () => {
  menuSidebar.style.left = '-250px';
});