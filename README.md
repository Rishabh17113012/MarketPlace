# Market Place

## Project Overview

Market Place is a custom-built marketplace application designed for discovering and managing products. It includes features such as user authentication, product browsing, and a modern UI built with React and Tailwind CSS.

## Features
- **User Authentication**: Secure sign-up and login functionality using Supabase.
- **Product Management**: Browse and view detailed product information.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.
- **Reusable Components**: Modular UI components for scalability and maintainability.

## Technologies Used
- **Vite**: Fast development environment.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **React**: Component-based UI library.
- **shadcn-ui**: Pre-built UI components.
- **Tailwind CSS**: Utility-first CSS framework.
- **Supabase**: Backend-as-a-service for authentication and database management.

## File Structure
- **src/components**: Contains reusable UI components (e.g., Navbar, ProductCard).
- **src/pages**: Includes main application pages (e.g., Auth, ProductDetail, Favorites).
- **src/hooks**: Custom React hooks for shared logic.
- **src/contexts**: Context providers for global state management (e.g., AuthContext).
- **supabase/**: Configuration and migration files for Supabase.
- **public/**: Static assets like `robots.txt`.

## How to Run Locally

### Prerequisites
- Node.js and npm installed ([Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

### Steps
1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   ```
2. Navigate to the project directory:
   ```sh
   cd <YOUR_PROJECT_NAME>
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Deployment
This project can be deployed to any Node.js-compatible hosting platform, such as:
- **Vercel**
- **Netlify**
- **Your own server**

### Steps to Deploy
1. Build the project:
   ```sh
   npm run build
   ```
2. Deploy the `dist/` folder to your hosting platform.

## Notes on Sensitive Data
- The `.env` file contains sensitive data (e.g., Supabase credentials) and is excluded from version control using `.gitignore`.
- Ensure to configure environment variables directly in your hosting platform for production.

## License
This project is licensed under the MIT License.