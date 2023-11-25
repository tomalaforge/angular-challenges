---
title: 🟢 catchError
description: Challenge 38 is about learning obervable completion.
author: devesh-chaudhari
command: rxjs-catch-error
challengeNumber: 38
sidebar:
  order: 14
---

## Information

### How to Use the Application

Our application features a form with a text input box and a "Fetch" button. Upon clicking the "Fetch" button, data is retrieved from a [free API](https://jsonplaceholder.typicode.com/).

The correct values for a successful response are limited to: posts, comments, albums, photos, todos, and users. Any other values will result in an error response.

### Bug

A bug has been identified in our application. Users are only able to successfully fetch data until an invalid request is sent. Once an error response is received, users are unable to send additional requests.

### Learnings

This application provides an opportunity to understand the correct placement of a [`catchError`](https://rxjs.dev/api/operators/catchError) operator. If placed incorrectly, the overall subscription will be completed, preventing users from sending more requests. The goal is to preserve the overall subscription by handling error notifications from inner observables appropriately.

## Statement

The goal is to use the catchError operator to handle error management inside your Rxjs stream.

## Constraints

Users should be able to log the value/error each time they click the "Fetch" button.
