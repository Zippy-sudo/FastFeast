# Fast Feast App - Frontend

Welcome to the **Fastfeast App** frontend! This web application allows users to add, update, delete, and view restaurants, menu items, orders, and reviews. The app is built using **React** with **Create React App** and connects to a backend [fastfeast_app](https://github.com/Zippy-sudo/fastfeast_app) to manage restaurant-related data.

---

## Features

- **Add a Restaurant**: Users can add a new restaurant to the system.
- **Add Menu Items**: Users can add new items to a restaurant’s menu.
- **Add Orders**: Users can place orders at a restaurant.
- **Delete Orders**: Users can cancel or delete an order.
- **Add Reviews**: Users can leave reviews for restaurants.
- **Update Reviews**: Users can update reviews they've made.
- **Delete Reviews**: Users can remove their own reviews.

---

## Tech Stack

- **React**: Frontend framework for building the user interface.
- **React Router**: For handling navigation and routing between pages.

  
---

## Prerequisites

Before setting up the app, ensure that you have the following software installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://npmjs.com/) or [yarn](https://yarnpkg.com/) (for managing dependencies)

You can check if you have them installed with these commands:
```bash
node -v
npm -v
```

---

## Installation & Setup

Follow the steps below to get the app up and running locally.

### 1. Clone the repository:

```bash
git clone https://github.com/Zippy-sudo/FastFeast.git
cd FastFeast
```

### 2. Install dependencies:

```bash
npm install  # or yarn install
```

### 3. Connect to a server:

Connect to a flask app (configured independently), by modifying the proxy field in the package.json file.

### 4. Run the development server:

```bash
npm start  # or yarn start
```

The app will now be running at [http://localhost:3000](http://localhost:3000).

---

## Folder Structure

Here's an overview of the folder structure in this project:

```
src/
├── assets/               # Static assets like images, fonts, etc.
├── components/           # Reusable UI components (buttons, forms, etc.)
├── pages/                # React components representing app pages
├── index.js              # Entry point for the app
├── styles/               # Global styles (CSS)
```

---

## API Endpoints

The frontend app communicates with the backend via the following API endpoints:

### **Restaurants**
- `GET /restaurants`: Fetch all restaurants.
- `POST /restaurants`: Add a new restaurant.

### **Menu Items**
- `GET items`: Fetch all menu items.
- `POST items`: Add a new menu item.

### **Orders**
- `GET /orders`: Fetch all orders.
- `POST /orders`: Add a new order.
- `DELETE /orders/:id`: Delete an order.

### **Reviews**
- `GET /reviews`: Fetch all reviews.
- `POST /reviews/`: Add a review for an ordered item.
- `PATCH /reviews/:id`: Update a review for an ordered item. 
- `DELETE /reviews/id`: Delete a review.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or suggestions, feel free to contact me at:
 
**GitHub:** [github.com/Zippy-sudo](https://github.com/Zippy-sudo)

---