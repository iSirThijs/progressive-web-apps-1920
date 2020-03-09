(function() {
	let searchForm = document.getElementById('search-game-form');
	searchForm.addEventListener('submit', searchResults );

	async function searchResults(event) {
		event.preventDefault();
		const action = event.target.getAttribute('action');
		const query = document.getElementById('query').value;
		const url =  action + '?q=' + query;
		const resultList = document.getElementById('resultlist');

		while(resultList.firstChild) {
			resultList.removeChild(resultList.firstChild);
		}

		const request = new Request(url, {
			method: 'GET',
			headers: new Headers({
				'Accept': 'application/json'
			})
		});

		const response = await fetch(request);

		if (response.ok && response.status == 200) {
			history.pushState('', '', action + '?q=' + query);
			let games = await response.json();

			games.forEach((game) => {
				resultList.appendChild(createCard(game));
			});
		}
	}

	function createCard(game) {
		let {title, img, id } = game;

		// create article wrapper
		let newArticle = document.createElement('article');
		newArticle.classList.add('card-game');

		// create heading
		let newHeading = document.createElement('h3');
		newHeading.textContent = title;

		// create img
		let newImg = document.createElement('img');
		newImg.src = img;
		newImg.alt = 'Cover art for '  + title;

		// create form
		let newForm = document.createElement('form');
		newForm.action = '/profile/games/add/' + id;
		newForm.method = 'post';

		// create delete button
		let newBtn = document.createElement('button');
		newBtn.classList.add('icon-plus');
		newBtn.type = 'sumbit';

		// append to the article wrapper
		newArticle.appendChild(newHeading);
		newArticle.appendChild(newImg);
		newArticle.appendChild(newForm).appendChild(newBtn);

		return newArticle;
	}
}());
