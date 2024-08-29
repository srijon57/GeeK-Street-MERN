# E-Commerce Project

## Overview

This is an e-commerce project developed as part of the AUST CSE2200 Software Development-III lab course. The project uses the MERN stack along with React, JavaScript, and Vite. It features a fully functional e-commerce website where users can browse products, add them to the cart, and make purchases. The project also includes a news feed fetched from the News API.

**Live Project Link:** [VERCEL](https://gee-k-street-mern-8g4i.vercel.app/)

## Technologies Used

-   **Frontend:**

-   React

-   JavaScript

-   Vite

-   News API (for fetching news feed)

-   **Backend:**

-   Node.js

-   Express.js

-   MongoDB

-   Cloudinary (for image storage)

-   Postman (for API testing)

## Installation

To get started with this project, follow these steps:

### Frontend

1. Navigate to the `frontend` directory:

`cd frontend`

2. Create a .env file in the frontend directory with the following contents:

```
VITE_BASEURL="YOUR_BACKEND_URL"
VITE_NEWS2_API_KEY="YOURAPIKEY"
```

3. Install the necessary dependencies:

`npm install`

4. Start the development server:

`npm run dev`

The frontend will be available at `http://localhost:5173`.

### Backend

1. Navigate to the `backend` directory:

`cd backend`

2.  Create a .env file in the backend directory with the following contents:

```
mongoDb="your mongodb url"
FRONTEND_URL="your frontend url"
PORT=any
CLOUDINARY_CLOUD_NAME="your cloudinary cloud name"
CLOUDINARY_API_KEY="your cloudinary api key"
CLOUDINARY_API_SECRET="your cloudinary api secret"
JWT_SECRET="your jwt secret"
EMAIL_USER="your email user"
EMAIL_PASS="your email password"
```

3. Install the necessary dependencies:

`npm install`

4. Start the development server:

`npm run dev`

The backend will be available at `http://localhost:5000`.

## Usage

1.  **Frontend:**

-   Browse products.

-   User authentication (login, register)

-   Add products to the cart.

-   Complete purchases & Payment process.

-   View the news feed.

-   Image upload using Cloudinary

2.  **Backend:**

-   API endpoints are available for managing products, user authentication, and orders.

-   Use Postman to test API endpoints.

## Contributing

This project was developed by:

-   [K.M. Hasibur Rahman Srijon](https://github.com/srijon57)

-   [Zawad Al Mahi](https://github.com/zawadalmahi)

-   [Sumaiya Daina](https://github.com/sumaiyadaina)

If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

## Acknowledgments

-   Cloudinary for image storage

-   News API for providing news feed

-   Postman for API testing

`Feel free to adjust any sections or add more details specific in this project. Thank you.`
