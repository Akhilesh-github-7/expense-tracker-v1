# Expense Tracker Application

This is a full-stack Expense Tracker application designed to help users manage their income and expenses efficiently. It provides a user-friendly interface to add, view, and categorize transactions, offering insights into financial habits through interactive charts and overviews.

## Features

*   **Dashboard:** Get a quick overview of your financial status, including total balance, recent transactions, and spending patterns.
*   **Income Tracking:** Add, view, and manage your income sources.
*   **Expense Tracking:** Record your expenses, categorize them, and monitor your spending.
*   **Data Visualization:** Interactive charts (bar, line, pie) to visualize your income and expenses over time.
*   **User Authentication:** Secure login and registration system.
*   **Responsive Design:** Access and manage your finances on any device.
*   **Profile Management:** Users can manage their profile information, including profile photos.


## Tech Stack

The application is built using a modern MERN (MongoDB, Express.js, React, Node.js) stack, ensuring a robust, scalable, and efficient performance.

### Frontend

*   **React.js:** A JavaScript library for building user interfaces, providing a component-based architecture for dynamic and interactive UIs.
*   **Vite:** A fast build tool that provides an extremely fast development experience for modern web projects.
*   **Tailwind CSS:** For styling the application.
*   **Recharts for charts**
*   **React Router for routing**
*   **Axios:** Promise-based HTTP client for making API requests.

### Backend

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building scalable server-side applications.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js, used for building RESTful APIs.
*   **MongoDB:** A NoSQL document database used for storing application data.
*   **Mongoose:** An elegant MongoDB object modeling tool for Node.js, simplifying database interactions.
*   **JSON Web Tokens (JWT):** For secure user authentication and authorization.
*   **Multer:** A middleware for handling `multipart/form-data`, primarily used for uploading files (e.g., profile photos).

## Getting Started

### Prerequisites

*   Node.js (v14 or later)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/expense-tracker.git
    cd expense-tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

2.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` folder with the production-ready files.

3.  **Lint the code:**
    ```bash
s    npm run lint
    ```

## Folder Structure

```
/
├── public/              # Static assets
├── src/                 # Source code
│   ├── assets/          # Images, icons, etc.
│   ├── components/      # Reusable React components
│   ├── context/         # React context for state management
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Application pages
│   └── utils/           # Utility functions
├── .gitignore           # Git ignore file
├── eslint.config.js     # ESLint configuration
├── index.html           # Main HTML file
├── package.json         # Project metadata and dependencies
├── README.md            # This file
└── vite.config.js       # Vite configuration
```

## Usage

*   Register a new user or log in with existing credentials.
*   Navigate through the dashboard to view financial summaries.
*   Add new income and expense transactions.
*   Categorize transactions for better financial tracking.
*   Update your profile information.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue if you find any bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.