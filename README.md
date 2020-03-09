# Player2 - Progressive Web Apps rework
Find your perfect player2 with this app! Use this app to find new friends that like the same games or use this app to date your perfect player2!

<!-- ![Screen1](https://github.com/iSirThijs/Player2/wiki/images/fp2home.png) -->

# Features
To be added

# Minor Webdevelopment 
This is my assignment from the subject 'Progressive Web Apps' in the minor [Webdevelopment](https://everythingweb.org) from the HvA(Amsterdam University of applied sciences) study Communication and Multimedia Design.

<details>
    <summary>Other assignments</summary>
    <ul>
        <li><a href='https://github.com/iSirThijs/web-app-from-scratch-1920'>Web App from Scratch</a>
        <li><a href='https://github.com/iSirThijs/css-to-the-rescue-1920'>CSS to the rescue</a></li>
        <li><a href='https://github.com/iSirThijs/project-1-1920'>CSS to the rescue</a></li>
        <li><a href='https://github.com/iSirThijs/progressive-web-apps-1920'>CSS to the rescue</a> - This assignment</li>
    <ul>
</details>

# Perquisites
* MongoDB installed

# Install
1. Clone the repository onto the computer
2. Run `npm install`
3. create a directory for the database & log:
	```bash
	mkdir data/db data/log
	````
4. create a env file with the secrets
	```
	IGDB_API_KEY= 'YOUR API KEY'
	MONGODB='mongodb://localhost:30000/gamedate' or 'YOUR MONGODB PATH'
	SESSION_SECRET= ' YOUR SECRET'
	```

# Usage
**To start the App**
1. Navigate to the project folders root
2. Start the mongod child process using `npm run mongoStart`
3. Start the server with `npm start`
4. go to [localhost:8000](localhost:8000) to use the app.

**To close the App**
1. Close nodemon in the terminal using `ctrl-c`
2. Don't forget to close the mongod child process:
	```bash
	mongo --port 3000 --shell
	use admin
	db.shutdown()
	exit
	```

# License
See [License](https://github.com/iSirThijs/pt-tech/blob/master/LICENSE) for more info.

**Additional note for HvA students:**

Using this work without mentioning the source is not allowed. See also the website from [HvA](https://az.hva.nl/studenten/az-lemmas/studenten/hva-breed/juridische-zaken/fraude-en-plagiaat/fraude-en-plagiaat.html)
