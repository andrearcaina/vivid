<h1 align="center">
  Vivid
</h1>

<p align="center">... is a full-stack web application for any general amateur or professional club that allows administrators to manage the finances, membership, and coaches of their club. It includes user authentication, a messaging platform for all members and administrators, an expense tracking panel, and a membership management system for administration.</p>

<hr>

<div align="center">
  <table align="center">
    <tr>
      <th colspan="5">Developers</th>
    </tr>
    <tr>
      <th><a href="https://github.com/andrearcaina">Andre Arcaina</a></th>
      <th><a href="https://github.com/Tristanv0">Tristan Cheng</a></th>
      <th><a href="https://github.com/heintzJ">Jack Heintz</a></th>
      <th><a href="https://github.com/josephleungg">Joseph Leung</a></th>
      <th><a href="https://github.com/feli-quiroga">Felipe Quiroga</a></th>
    </tr>
  </table>
</div>

<hr>

## Test Demo

https://github.com/andrearcaina/vivid/assets/96299635/6968f46a-0382-442e-a1f6-370134a05b4c

## Tech Stack + How it Works

[![JAVASCRIPT](https://img.shields.io/badge/javascript-101010?style=for-the-badge&logo=javascript&logoColor=ffdd54)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![NEXT.JS](https://img.shields.io/badge/NEXT-0769AD?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TAILWINDCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) \
The frontend is developed using `JavaScript` and the Next.js framework, with Tailwind CSS as the chosen `CSS` framework.

[![PYTHON](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![DJANGO](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/) 
[![POSTGRESQL](https://img.shields.io/badge/POSTGRESQL-14354C?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![SUPABASE](https://shields.io/badge/supabase-black?logo=supabase&style=for-the-badge)](https://supabase.com/)\
The backend framework chosen for this project is Django, a high level `Python`-based framework. In Django, we create database schemas and API endpoints to communicate with the frontend (the client).
These endpoints are designed for retrieving data from a PostgreSQL database structure, which is hosted and created using Supabase.
Built on a RESTful API architecture, Vivid leverages HTTP methods such as POST, GET, PUT, and DELETE, adhering to the CRUD (Create, Read, Update, Delete) operations paradigm.

Our application also utilizes Django Channels to implement WebSockets, enabling real-time chat functionality seamlessly integrated into the user experience. 
With Django Channels, we establish persistent connections between the client and the server, allowing bidirectional communication without the need of traditional HTTP requests.

For more information, check the [documentation](https://github.com/andrearcaina/vivid/blob/main/server/README.md).

<hr>

## Functionality
1. **`User Authentication`**:
   - [x] Members can register accounts and log in securely to access the application.
   - [x] Passwords are securely hashed and stored in the database.
   - [x] Administrators can manage member accounts, including resetting passwords and deactivating accounts if necessary.

2. **`Messaging Platform`**:
   - [x] All members and administrators have access to a messaging platform within the application.
   - [x] Administrators, notably the coaches, can broadcast annoucements to all members.
     - [x] Administrators can send and receive messages.
   - [x] Members can send and receive messages, and access announcements from coaches.

4. **`Expense Tracking Panel`**:
   - [x] Administrators, particularly the treasurer, have access to an expense tracking panel.
   - [x] Expenses incurred by the club, such as rent for the meeting hall, coach salaries, and other operational costs, can be recorded and tracked.
   - [x] The panel includes a log of any unpaid debts from previous months, including instances where the rent for the hall was not paid in full or not paid at all, as well as any unpaid coach expenses.
     - [x] The treasurer can review and prioritize outstanding debts, follow up with relevant parties, and take necessary actions to settle outstanding balances.
   - [ ] Historical data on unpaid debts allows the treasurer to identify trends, assess financial risks, and implement strategies to improve financial management and accountability within the club.
   - [ ] The panel also provides information on the current month’s account payables, including members who have paid in advance. This allows the treasurer to maintain accurate records of prepaid fees, track membership dues, and ensure timely invoicing and collection processes.
   - [x] The treasurer has access to managing the coaches salary in this panel.

5. **`Membership Management System`**:
   - [x] Administrators, including the treasurer and coaches, have tools to manage club memberships.
   - [x] New members can register and apply for membership through the application.
   - [x] Coaches can approve (add) or reject (remove) membership applications, and manage membership statuses.
   - [ ] Membership dues, costs and fees can be collected securely through the application. 
   - [x] Coaches can communicate with members regarding membership-related matters, such as costs, sessions, and events.
   - [x] Both the treasurer and coaches can sort the membership list by attendance, and number of unpaid/paid times.
     - [ ] Give a discount for members higher on the database, and a charge for those on the bottom.

6. **`Member Scheduling System`**:
   - [x] Members can schedule an existing practice session and quickly pay on the application.
   - [x] Members can update their profiles as well.

7. **`Coach Management System`**:
   - [x] Administrators, particularly the treasurer, have tools to manage coach lists.
   - [x] This ties to #3: **`Expense Tracking Panel`**.

8. **`Coach Scheduling System`**:
   - [x] Coaches have a section to create new classes and manage their sessions.
   - [ ] Coaches can mark their availability for practice sessions.
   - [ ] Administrators have oversight of coach activities, including scheduling, attendance, and performance evaluations.

<hr>

## Quality Assurance and Test Reports
Our plan for testing if our system and our implementation works will consist of 5 different types of tests:
1. User Authentication
3. Finance Tracking
4. Membership Logging
5. Message Platform
6. Database Tracking

These tests will ensure that our product in mind is to the client's expectation.

<hr>

## Installation Process

To clone this application, you'll need: 
* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com))
* [Python](https://www.python.org/downloads/)

Then, from your command line:

```bash
# Clone this repository
$ git clone https://github.com/andrearcaina/vivid.git

# Go into the backend folder
$ cd vivid/server

# install virtual environment
$ python3 -m venv .venv # for linux
> py -3 -m venv .venv   # for windows

# make sure you activate virtual environment
$ source .venv/bin/activate # for linux
> .venv\Scripts\activate # for windows

# install necessary dependencies 
$ pip install -r requirements.txt

# go to the frontend folder
$ cd ../client

# install necessary packages
$ npm install # using npm
$ bun install # using bun
$ pnpm install # using pnpm
$ yarn install # using yarn

# run the development server and go to localhost:3000
$ npm run dev
$ bun run dev
$ pnpm run dev
$ yarn run dev

# open up a new terminal, go back to that directory, and then run the server
$ python manage.py runserver
```
