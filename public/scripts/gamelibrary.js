// If JS is enabled, it should change some classes to enable progressive enhancement
(function () {
	var body = document.body;
	body.classList.replace('no-js', 'js');
})();

// progressive enhancement on the button and the game list.
(function () {
	let editButton = document.getElementById('edit-button');
	editButton.addEventListener('click', function() {
		// Toggles the button text
		if (editButton.textContent === 'Edit'){
			editButton.textContent = 'Done';
		} else if (editButton.textContent === 'Done') {
			editButton.textContent = 'Edit';
		}
		// Toggles the edit-mode on the game cards
		let gameCards = document.getElementsByClassName('card-game');
		for (let i = 0; i < gameCards.length; i++) {
			gameCards[i].classList.toggle('edit-mode');
		}
		// Toggles the edit-mode on the add-game-link
		let cardAddGame = document.getElementById('link-add-game');
		cardAddGame.classList.toggle('edit-mode');
	});
})();

// progressive enhancement on the list of games
(function() {
	// addEventListener on the forms
	let deleteForm = document.getElementsByClassName('delete-form');
	for (let i = 0; i <deleteForm.length; i++) {
		deleteForm[i].addEventListener('submit', deleteGame);
	}

	async function deleteGame(event) {
		event.preventDefault();
		let url = event.target.getAttribute('action');
		let article = event.target.parentNode;

		article.addEventListener('animationend', () => article.parentNode.removeChild(article));
		const request = new Request(url, {
			method: 'DELETE',
		});

		let response = await fetch(request);

		if (response.ok && response.status == 204) {
			article.classList.add('collapse');
		}

	}
}());
