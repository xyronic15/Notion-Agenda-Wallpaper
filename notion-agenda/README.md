# notion-agenda
This folder consists of all the files needed to run the service locally on your device.

## .env
---
This is where environment variables will be located.
Consists of:
- Your Notion API Key
- Your Agenda's Database ID

## index.js
---
This will be the main file of your project that calls functions from all of the other created modules
**Responsibilities:**
- Calling the service every five seconds
- Gathering the tasks from your Notion agenda
- Calls the generate wallpaper function

## notion.js
---
This file is what will connect to your Notion API
**Responsibilities:**
- Connecting to your Notion API
- Querying your database for today's tasks that haven't been completed yet
- Organizing the data into Name, Category, Priority, and Time

## calendar.js
---
Contains the `getCurrentMonthCalendar()` function.
Returns the appropriately formatted div string to fit the calendar portion of the wallpaper

## wallpaper.js
---
This file contains the functions that generate the wallpaper
**Responsibilities:**
- Receives the tasks and the formatted calendar div
- Uses the given values and generates a PNG image from a formatted HTML string using the node-html-to-image module

## service.js
---
This file is responsible for turning the index file into a Windows service
**Responsibilities:**
- Uses the node-windows package to install the index file as a Windows service