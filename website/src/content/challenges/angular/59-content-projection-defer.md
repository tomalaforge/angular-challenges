---
title: 🔴 content-projection-defer
description: Challenge 59 is about deferring fetching data
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 59
command: angular-content-projection-defer
sidebar:
  order: 212
---

# Challenge: Deferred Loading for Expandable Card Content

## Information

Within the application, specifically on page2, there is an expandable card component. This component consists of a permanently visible title and a content section that is hidden until the card is expanded. This content section is populated with a list of posts retrieved via a backend API call. The current implementation presents an issue: upon navigating to page2, although the card defaults to a collapsed state, the API call to load the list of posts is triggered immediately during the page load process, before the user has chosen to expand the card and view the content.

## Statement

The goal of this challenge is to optimize the data loading behavior for the expandable card component on `page2`. Modify the implementation so that the backend API call to fetch the list of posts is **deferred**. The data should **only** be fetched when the user explicitly interacts with the card to **expand** it. No data fetching for the post list should occur upon the initial load of `page2` while the card remains collapsed.

## Constraints

- The expandable card must retain its core functionality: display a title, be initially collapsed (on `page2` load), and expand/collapse upon user interaction.
- When the card is expanded, the list of posts must be fetched from the backend and displayed within the content area.
- The data fetching mechanism itself (e.g., the API endpoint) should not be changed, only _when_ it is triggered.
