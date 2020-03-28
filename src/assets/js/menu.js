(function () {
	let icon = document.getElementById('icon-menu');
	let menu = document.getElementById('menu');

	icon.addEventListener('click', (event) => {
		event.preventDefault();
		icon.classList.toggle('active');
		menu.classList.toggle('open');
		menu.parentElement.classList.toggle('open');
	});

})();