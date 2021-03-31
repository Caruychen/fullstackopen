# [Full Stack open 2021](https://fullstackopen.com/en/)

This repository contains worked solutions to exercises in the Full Stack open 2021 course.

The Full Stack open 2021 course is an introduction to modern web application development with JavaScript, offered by the University of Helsinki. The focus is on building a single page application with ReactJS using REST APIs built with NodeJS. The course covers testing, configuration and environment management, and using MongoDB for storing app data.

The course also covers more modern application technologies, including GraphQL and TypeScript.

[Course contents](https://fullstackopen.com/en/#course-contents)

## Part 0 - [Fundamentals of Web apps](https://fullstackopen.com/en/part0)

Overviews the basics of web development, and advancements in web application development over recent decades.

The exercises involve creating basic web sequence diagrams depicting network communications, as a user interacts with a web application.

[Solutions](https://github.com/Caruychen/fullstackopen/tree/main/part0)

## Part 1 - [Introduction to React](https://fullstackopen.com/en/part1)

Covers fundamental elements of working with the React-library, and features of JavaScript that are important for understanding React.

The exercises cover building basic React UI to demonstrate component rendering, state management, event handling and debugging React applications.

[Solutions](https://github.com/Caruychen/fullstackopen/tree/main/part1)
* [courseinfo](https://github.com/Caruychen/fullstackopen/tree/main/part1/courseinfo) - Basic course information page.
* [unicafe](https://github.com/Caruychen/fullstackopen/tree/main/part1/unicafe) - Web application for collecting user feedback and, and showing statistics.
* [anecdotes](https://github.com/Caruychen/fullstackopen/tree/main/part1/anecdotes) - random anecdote generator.

## Part 2 - [Communicating with server](https://fullstackopen.com/en/part2)

Dives further into React concepts such as rendering data collections, managing code module structures, working with HTML forms in React,
communicating with a backend REST API, and basic CSS styling.

The exercises demonstrate these concepts in three parts. 

[Solutions](https://github.com/Caruychen/fullstackopen/tree/main/part2)
* [courseinfo](https://github.com/Caruychen/fullstackopen/tree/main/part2/courseinfo) - Refactored courseinfo page from part 1 with modularised code.
* [phonebook](https://github.com/Caruychen/fullstackopen/tree/main/part2/phonebook) - Phonebook app with basic CSS styling.
* [countries](https://github.com/Caruychen/fullstackopen/tree/main/part2/countries) - React app that communicates with the https://restcountries.eu api.

## Part 3 - [Programming a server with NodeJs and Express](https://fullstackopen.com/en/part3)

Focuses on developing the backend, server-side of the stack.

The exercises implement a REST API in NodeJS using the Express library, and stores the application data in a MongoDB database.
The live application is deployed to heroku, and can be access via this link: https://blooming-brook-29966.herokuapp.com.

The solutions to this exercise are located in a separate repository:
<a href="https://github.com/Caruychen/fullstackopen-part3" target="_blank">Part 3 Solutions</a>

## Part 4 - [Testing Express servers, user administration](https://fullstackopen.com/en/part4)

Expands on backend development by covering project file structure best practices, unit and integration tests, and implementing 
user authentication and authorization.

Exercises implement a REST API in NodeJS using Express, to serve as endpoints for a blog list application. User authentication and 
authorization are also implemented. Unit and Integration tests are included using Jest.

[Solutions](https://github.com/Caruychen/fullstackopen/tree/main/part4/bloglist)

## Part 5 - [Testing React apps](https://fullstackopen.com/en/part5)

Returns to the frontend to cover testing React code, and implements token based authentication. 

Exercises develop the frontend for the blog list application. It demonstrates the use of token authentication, and implements
tests with Jest and end-to-end testing with Cypress.

[Solutions](https://github.com/Caruychen/fullstackopen/tree/main/part5/bloglist-frontend)

## Part 6 - [State management with Redux](https://fullstackopen.com/en/part6)

Introduces centralised application state management with the Redux-library.

Exercises refactor previous assignments to use Redux hooks in state management, and demonstrates use of reducers, redux-thunk, 
and communicating with the server in a redux app. Also touches on the connect-function, an older approach to state management in Redux.

[Solutions](https://github.com/Caruychen/fullstackopen/tree/main/part6)
* [unicafe-redux](https://github.com/Caruychen/fullstackopen/tree/main/part6/unicafe-redux) - Refactors the feedback and stats unicafe app from part 1 to manage state using Redux.
* [redux-anecdotes](https://github.com/Caruychen/fullstackopen/tree/main/part6/redux-anecdotes) - Refactors the anecdotes app from part 1 to use Redux state management, and implements REST communications with a server with Redux-thunk. A Mock server is created using json-server.

## Part 7 - [React router, custom hooks, styling app with CSS and webpack](https://fullstackopen.com/en/part7)

Covers a range of topics:
* Using React router to divide the application into different views based on the URL in the browser.
* Applying CSS-style components
* Webpack, and how to configure the application manually.
* Class components.
* Deeper look at hook-functions, and custom hooks.

Exercises expand the functionality of the blog list application, and includes other projects to demonstrate various concepts covered
in the subject.

[Solutions](https://github.com/Caruychen/fullstackopen/tree/main/part7)
* [routed-anecdotes](https://github.com/Caruychen/fullstackopen/tree/main/part7/routed-anecdotes) - Implement URL routing and custom hooks for anecdotes app.
* [country-hook](https://github.com/Caruychen/fullstackopen/tree/main/part7/country-hook) - Modify the country app to interact with APIs using a custom hook.
* [ultimate-hooks](https://github.com/Caruychen/fullstackopen/tree/main/part7/ultimate-hooks) - Practice implementing hooks and custom
hooks that communicate with a server.
* [bloglist-backend](https://github.com/Caruychen/fullstackopen/tree/main/part7/bloglist) - Extending the backend for the bloglist app to include commenting functionality.
* [bloglist-frontend](https://github.com/Caruychen/fullstackopen/tree/main/part7/bloglist-frontend)
  * Refactor application state management from using internal React component state to using React.
  * Implement Router to add views:
    * Showing basic information regarding users.
    * Individual users' blog posts.
    * Showing detailed views of a single blog post.
  * Implement navigation.
  * Implement comment functionality.
  * Add CSS styles using Material-UI.


## Part 8 - [GraphQL](https://fullstackopen.com/en/part8)

Introduces GraphQL, Facebook's alternative for communication between the browser and a server