# How the Website Works

This website is a **Movie Review and Criticism System** designed to allow users to manage their profiles, register, log in, and share movie reviews. Here's an overview of its functionality:

## User Authentication
- **Registration**: New users can sign up by providing their first name, last name, email, and password on the `RegisterPage`. Passwords must match for successful registration, and email uniqueness is enforced.
- **Login**: Existing users can log in using their email and password on the `LoginPage`. Upon successful login, a user ID is stored locally, redirecting them to the homepage.

## User Profile
- The `UserProfile` page displays the logged-in user's details (first name, last name, and email) and their recent movie reviews.
- It features a loading state while fetching data and handles errors gracefully with user notifications.
- Reviews are fetched from an API, filtered by the user's ID, and sorted by creation date.

## Movie Reviews
- Users can view their submitted reviews, including the movie title, rating (out of 10), comment, and posting date.
- If no reviews exist, a message prompts the user to add reviews.

## Technical Details
- Built with **React**, the frontend uses a consistent template with a red-black gradient header, light grey sections, and a dark footer.
- Data is managed via API calls (`getUserById`, `getReviews`, `createUser`, `loginUser`) assumed to be handled by a backend (e.g., Spring Boot).
- The design includes animations and responsive layouts for mobile and desktop views.

## Usage
- Clone the repository, install dependencies with `npm install`, and run the app with `npm start` after setting up the backend.
- Ensure the backend API is running (e.g., via `mvn spring-boot:run`) to fetch and submit data.

## Future Plans
This project is a work in progress, with plans for adding review submission, profile editing, and more features in future updates.

## UML Diagram
The UML diagram of the project is given below:
![UML Diagram](https://github.com/user-attachments/assets/53842964-6a82-4f11-a17e-341599d679fc)
