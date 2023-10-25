# Purple Prose frontend

## Description

Purple Prose is an online news aggregation forum where users can write and share articles as well as commenting and voting on each other's articles and comments. Have you used Reddit? It's Reddit.

This project is a fullstack RESTful API, with a PSQL database where Knex was used as a query builder, and a Frontend of React and CSS Modules. It was a solo project during the last week of the Backend and Frontend blocks of the [Northcoders](https://northcoders.com/) coding bootcamp.

## Instructions

This frontend is live on [Netlify](https://purpleprose.netlify.app/).
<br/>
The backend counterpart repository can be found [here](https://github.com/chicorycolumn/Purple-Prose-BE).
<br/>
You can also download this repository and run the project locally by following these steps:

1. Fork this repository by clicking the button labelled 'Fork' on the [project page](https://github.com/chicorycolumn/Purple-Prose-FE).
   <br/>
   Copy the url of your forked copy of the repository, and run `git clone the_url_of_your_forked_copy` in a Terminal window on your computer, replacing the long underscored word with your url.
   <br/>
   If you are unsure, instructions on forking can be found [here](https://guides.github.com/activities/forking/) or [here](https://www.toolsqa.com/git/git-fork/), and cloning [here](https://www.wikihow.com/Clone-a-Repository-on-Github) or [here](https://www.howtogeek.com/451360/how-to-clone-a-github-repository/).

2. Open the project in a code editor, and run `npm install` to install necessary packages. You may also need to install [Node.js](https://nodejs.org/en/) by running `npm install node.js`.

3. Run `npm start` to open the project in development mode.
   <br/>
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deploy

General instructions for taking a **React project** and hosting it on **Netlify** for **automatic deployment** are as follows:

0. Ensure the project is initialised in a Git repository. If you are unsure what this means, instructions can be found [here](https://medium.com/@JinnaBalu/initialize-local-git-repository-push-to-the-remote-repository-787f83ff999) and [here](https://www.theserverside.com/video/How-to-create-a-local-repository-with-the-git-init-command).

1. Login to Netlify and click _New Site from Git_, then select _Github_ and then the project in question. Set the command as `npm run build`.

Now when you commit and push to Github, Netlify will deploy the latest version of the project automatically.

## Built with

- [JavaScript](https://www.javascript.com/) - The primary coding language
- [VisualStudioCode](https://code.visualstudio.com/) - The code editor

- [Heroku](https://www.heroku.com/) - The cloud application platform used for the backend
- [Netlify](https://www.netlify.com/) - The hosting service used for the frontend

- [PSQL](http://postgresguide.com/utilities/psql.html) - The interactive terminal for use with postgres
- [Knex](http://knexjs.org/) - The SQL query builder
- [MySQL](https://www.mysql.com/) - The database management system
- [Axios](https://github.com/axios/axios) - The HTTP client
- [Express](http://expressjs.com/) - The web application framework

- [React](https://reactjs.org/) - The frontend framework
- [Reach Router](https://reach.tech/router/) - The router
- [CSS Modules](https://github.com/css-modules/css-modules) - The design organisation system

- [Mocha](https://mochajs.org/) - The testing framework
- [Chai](https://www.chaijs.com/) - The testing library
