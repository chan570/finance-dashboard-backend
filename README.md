# Finance Dashboard Backend

##  Overview

This project is a backend system for a Finance Dashboard application. It is designed to manage financial records, user roles, and provide summary analytics for a dashboard.

The system demonstrates backend development concepts such as API design, data modeling, role-based access control, and data aggregation.


##  Features

###  User & Role Management

* User registration and login (JWT authentication)
* Role-based access control:

  * **Viewer** → Can only view records
  * **Analyst** → Can view records and dashboard summaries
  * **Admin** → Full access (CRUD + user management)
* User status management (active/inactive)



###  Financial Records Management

* Create financial records (income/expense)
* View all records
* Update and delete records
* Filter records by:

  * Type (income/expense)
  * Category
  * Date range



###  Dashboard Summary APIs

* Total Income
* Total Expenses
* Net Balance
* Category-wise totals
* Monthly trends
* Recent transactions



###  Access Control

* Implemented using middleware
* Ensures:

  * Viewers cannot modify data
  * Analysts can access analytics only
  * Admin has full control
###  Validation & Error Handling

* Input validation for required fields
* Proper HTTP status codes
* Meaningful error messages


## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (jsonwebtoken)
* **Security:** bcrypt (password hashing)


## Project Structure

```
finance-dashboard-backend
├── client/                 # (Optional frontend)
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
```

##  Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/finance-dashboard-backend.git
cd finance-dashboard-backend/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000
```

### 4. Run the server

```bash
npm run server
```

Server will run on:

```
http://localhost:4000
```

---

##  API Endpoints

### Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

###  Users

* `GET /api/users` (Admin only)
* `PUT /api/users/:id` (Admin only)
* `GET /api/users/me`

###  Financial Records

* `POST /api/records` (Admin)
* `GET /api/records` (All roles)
* `GET /api/records/:id`
* `PUT /api/records/:id` (Admin)
* `DELETE /api/records/:id` (Admin)

###  Summary

* `GET /api/summary` (Analyst, Admin)

---

## Role-Based Access Summary

| Role    | Permissions    |
| ------- | -------------- |
| Viewer  | Read only      |
| Analyst | Read + Summary |
| Admin   | Full access    |

---

## Assumptions

* Authentication is handled using JWT tokens
* Role-based access is enforced at backend level
* MongoDB is used for persistence (can be replaced with other DBs)
* No frontend dependency required to test APIs

---

##  Optional Enhancements (Future Scope)

* Pagination & search
* Rate limiting
* API documentation (Swagger)
* Unit & integration testing
* Deployment (Render / AWS)

---

## Conclusion

This project demonstrates a clean and modular backend architecture with proper separation of concerns, secure authentication, and efficient data handling for a finance dashboard system.

---
