# Personal Finance App (Frontend Mentor Solution)

A simple finance management app built with Next.js (App Router) that lets you track your expenses, income, recurring bills, budgets, and savings pots.
This is a solution to the [Personal finance app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/personal-finance-app-JfjtZgyMt1). 

## Table of contents

- [Overview](#overview)
  - [Important_Note] (#important-note)
  - [The challenge](#the-challenge)
  - [Features](#features)
- [My process](#my-process)
  - [Tech Stack](#tech-stack)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### Important Note
This app uses Next.js API routes with in-memory storage. That means:

- Data is not saved permanently — refreshing or restarting the app clears everything.
- Any time you add/withdraw from a pot or create/edit/delete a budget or pot, the data resets automatically.

### The challenge

Users should be able to:

- See all of the personal finance app data at-a-glance on the overview page
- View all transactions on the transactions page with pagination for every ten transactions
- Search, sort, and filter transactions
- Create, read, update, delete (CRUD) budgets and saving pots
- View the latest three transactions for each budget category created
- View progress towards each pot
- Add money to and withdraw money from pots
- View recurring bills and the status of each for the current month
- Search and sort recurring bills
- Receive validation messages if required form fields aren't completed
- Navigate the whole app and perform all actions using only their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

## Features

- Dashboard / Overview – see all your balances, spending, and income at a glance.
- Transactions – review detailed history of your income and expenses.
- Recurring Bills – keep track of subscriptions and scheduled payments.
- Budgets – set monthly spending limits and track progress.
- Savings Pots – put money aside into separate pots for different goals.

## My process

### Tech Stack

- Frontend: Next.js (App Router, React Server and Client Components)
- Backend: Next.js API Routes
- Styling: Tailwind CSS
- Data: In-memory JSON object


### What I learned

Working on this project taught me a lot, especially about combining frontend and backend logic inside a single Next.js app:

- Next.js API Routes – I learned how to build simple backend endpoints directly inside a Next.js project. This made it easy to handle actions like adding to savings pots, withdrawing funds, or updating budgets without needing a separate backend service.

- Charts with Chart.js – I learned how to visualize financial data using Chart.js. It was interesting figuring out how to format the data coming from my API and display it in charts that are both clear and interactive.

- Modals with React Portals – learned how to create reusable modal components using React Portals. This helped me separate modal UI from the main component tree, while still keeping state and event handling easy to manage.


### Useful resources

These resources helped me create resuable react modal components

- [Learn React Portal In 12 Minutes By Building A Modal](https://www.https://www.youtube.com/watch?v=LyLa7dU5tp8)
- [Building Reacting Portal for Modals](https://blog.logrocket.com/build-modal-with-react-portals/) 

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/victorrmark)
- Twitter - [@yourusername](https://www.twitter.com/victorrmark)

