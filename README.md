# LinkedEvents
Full Stack WEB application that Connect people with online events from home. Created with MongoDB, Express, Angular, NodeJs (MEAN)
<hr>
<h5>Click the picture to watch the video</h5>

[![asciicast](https://i.imgur.com/QtKrUa6.png)](https://www.youtube.com/embed/1gqQiQbVdqg)

<hr>
<h2>How to install</h2>

*To install this project, Run the command : npm install <br>
*Make sure to change ENV varibales: <br>
1) backend/server.js (MONGO). <br>
2) backend/controllers/users.js (SECRET_TOKEN). <br>
3) backend/middlewares/is-auth.js (SECRET_TOKEN).<br>
<hr>
<h2>Technologies</h2>
<b>Client Side:</b> Angular, TypeScript <br>
<b>Server Side:</b> Node.js, Express, JWT <br>
<b>Database:</b> MongoDB<br>
<hr>
<h2>Features</h2>
<ul>
  <li>Register and Login with Authentication with JWT</li>
  <li>Filter Events by categories, Popular Online Events, New Events, Based Your Profile</li>
  <li>Get specific event information to join like title, date, creator, Attendees, Max Participants,Percentage of participants, category
  </li>
  <li>Share an event through social medias</li>
  <li>Create, Read, Update, Delete events</li>
  <li>Calendar of events the user attended </li>
  <li>Notfication abouts user's today events</li>
</ul>
<hr>
<br><br>




This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
