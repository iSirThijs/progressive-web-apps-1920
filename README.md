# Player2 - Progressive Web Apps rework <!-- omit in toc -->
Find your perfect player2 with this app! Use this app to find new friends that like the same games or use this app to date your perfect player2!


# Features <!-- omit in toc -->
* Find games in the games tab
* See trending and new games
* Create an account
  * Save your games to the library or wishlist (coming later)
  * Match an other person with the same favorite games (coming later)

# Contents <!-- omit in toc -->
- [Minor Webdevelopment](#minor-webdevelopment)
  - [Assignment](#assignment)
  - [Learning Goals](#learning-goals)
  - [Reflection on subject](#reflection-on-subject)
  - [Reflection on learning goals](#reflection-on-learning-goals)
- [Install & Usage](#install--usage)
  - [Perquisites](#perquisites)
  - [Install](#install)
  - [Usage](#usage)
    - [Build static files](#build-static-files)
    - [Run server](#run-server)
    - [Run dev & watch](#run-dev--watch)
- [License](#license)

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

## Assignment 
From the subject repo: 
>In this course we will convert the client side web application previously made at the OBA into a server side rendered application. We also add functionalities based on the Service Worker and turn the application into a Progressive Web App. Ultimately we are going to implement a series of optimisations to improve the performance of the application

Instead of the OBA application I used this app from blok tech: [player 2](https://github.com/iSirThijs/Player2)

## Learning Goals
From the subject repo:
> * You understand the difference between client side and server side rendering and you can apply server side rendering in your application
> * You understand how a Service Worker works and you can implement it in your application.
> * You understand how the critical render path works and how you can optimize it for a better runtime and / or perceived performance.

## Reflection on subject
This subject had a lot of new stuff for me. The server side rendering in node was something I already did in blok tech. I did however redo much of it, because of new insight I have gained after blok tech

The new things in the subject for are the service workers and the performance optimizations. I had some trouble starting both, also due to suddenly working at home due to the coronavirus outbreak. But I managed to quickly get a grasp on the subjects. 

## Reflection on learning goals
> *You understand the difference between client side and server side rendering and you can apply server side rendering in your application* 

The website first renders pages on the server and sends these to the pages. Searching games and creating an account all use this technique to serve the website. If javascript fails, the website still functions. I had planned on doing some (javascript) progressive enhancements on the game searching, but haven't had the time for it. 

> *You understand how a Service Worker works and you can implement it in your application.*

The website can be installed on both android and iOS and can serve an offline page. I use the service worker to proxy request and cache some responses.

> *You understand how the critical render path works and how you can optimize it for a better runtime and / or perceived performance.*

I'm hashing my css and js file so the browser can cache it for a year. When a different version is used, the hash changes and is then cached by the browser. The HTML send to the browser is also minified by removing whitespace and quotes.

# Install & Usage

## Perquisites
To run a local build you need to have:
* Node 12.16.1
* MongoDB database

## Install
1. Clone the repository 
2. Install dependencies
3. Adjust .env.example and remove .example

## Usage
### Build static files
To build the static files use: `npm run build`

### Run server
To run the node server run: `npm start`

### Run dev & watch 
To run nodemon in dev use: `npm run dev`
to monitor static file changes use `npm run watch`

# License
See [License](https://github.com/iSirThijs/progressive-web-apps-1920/blob/master/LICENSE) for more info.

**Additional note for HvA students:**

Using this work without mentioning the source is not allowed. See also the website from [HvA](https://az.hva.nl/studenten/az-lemmas/studenten/hva-breed/juridische-zaken/fraude-en-plagiaat/fraude-en-plagiaat.html)
