# User Management Application

This project is a responsive Angular application that displays and manages user data fetched from an external API. It provides a professional user interface with a table-like layout for user listing and a modal interaction for detailed user information. The application adheres to modern web development best practices, focusing on modularity, performance, and maintainability.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Development Server](#development-server)
- [Running Unit Tests](#running-unit-tests)
- [Further Documentation](#further-documentation)

## Features

- **User List Display**: Presents user information in a clean, responsive table with columns for Name/Email, Address, Phone, Website, and Company Name.
- **User Detail Modal**: Displays comprehensive user information in a modal when a user row is clicked. Includes a clickable map link using geo-coordinates.
- **User Management**: Allows for client-side deletion of users from the list with appropriate visual feedback.
- **Professional UI/UX**: Features a clean, modern interface with proper spacing, responsive design for various screen sizes, and subtle animations for modal interactions.

## Technologies Used

- **Angular**: The core framework for building the application.
- **CSS Modules**: For scoped and modular styling of components.
- **TypeScript**: For strict type safety and improved code quality.
- **JSONPlaceholder API**: Used as the external API for fetching test user data.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── user-details-modal/  # Standalone component for user details modal
│   │   │   ├── user-details-modal.component.ts
│   │   │   ├── user-details-modal.component.html
│   │   │   └── user-details-modal.component.css
│   │   └── user-list/           # Component for displaying the user list
│   │       ├── user-list.component.ts
│   │       ├── user-list.component.html
│   │       └── user-list.component.css
│   ├── models/                # TypeScript interfaces for data models
│   │   └── user.model.ts
│   ├── services/              # Angular services for data fetching and logic
│   │   └── user.service.ts
│   ├── app.config.ts          # Application-wide configuration
│   ├── app.routes.ts          # Angular routing configuration
│   └── app.ts                 # Root component
├── environments/              # Environment-specific configurations
│   ├── environment.ts
│   └── environment.prod.ts
└── styles.css                 # Global stylesheets
```

## Setup and Installation

To get the project up and running on your local machine, follow these steps:

1.  **Clone the repository (if you haven't already):**

    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd hometask2
    ```

3.  **Install dependencies:**

    The project uses `npm` as its package manager. Install all required dependencies by running:

    ```bash
    npm install
    ```

4.  **Environment Configuration:**

    The application fetches user data from JSONPlaceholder. The API URL is stored in the `.env` file (or `src/environments/environment.ts` and `src/environments/environment.prod.ts`). Ensure your `environment.ts` file contains:

    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'https://jsonplaceholder.typicode.com'
    };
    ```

    For production builds, `environment.prod.ts` will be used.

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running Unit Tests

To execute unit tests for the components, use the following command:

```bash
ng test
```

This will run tests using Karma and Jasmine, providing feedback on the application's logic and component behavior.

## Further Documentation

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
