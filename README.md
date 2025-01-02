
# School Management System

![License](https://img.shields.io/badge/license-MIT-green)

## Description
This is a school management web application built using **Next.js** with **TypeScript**, and **Prisma**.
It leverages **PostgreSQL** as the database and is containerized using **Docker**. Authentication is handled by **Clerk**, and user roles (admin, teacher, student, parent) are managed for access control and specific functionalities.
The app includes dashboards, charts, forms, search functionalities, and more. The app uses **TailwindCSS** for responsive and utility-first styling.

## Features

- **Role-based Dashboards:** separate dashboards and menus for Admin, Teacher, Student, and Parent roles, each with specific permissions and limitations.
- **Authentication:** user authentication and session management powered by **Clerk**.
- **Database Management:** Prisma ORM with **PostgreSQL** to manage and interact with the database, encapsulated in **Docker** containers.
- **CRUD Operations:** users can create, read, update, and delete various resources such as teachers, students, parents, exams, events, results, attendances, classes, lessons, and announcements.
- **Search functionality:** implemented across different resource lists.
- **Charts:** data visualization powered by the **Recharts** library for displaying graphs and statistics.
- **Calendar**: interactive calendar integration for scheduling and displaying events and lessons.
- **Forms and Validation**: **react-Hook-Form** for forms and **Zod** for schema validation.
- **Image Upload:** integrated **Cloudinary** widget for uploading and managing images.
- **Middleware**: Next.js middleware used to protect routes based on user roles.

## ScreenShots
![img2](https://github.com/user-attachments/assets/3c3a43e2-6ad8-4289-b1ff-482eaa9ba523) 



![img10](https://github.com/user-attachments/assets/38144652-ed37-44f3-8383-de0b6e5fecec)



![img3](https://github.com/user-attachments/assets/d88c4757-d441-414d-a386-cfaf0ce9b756)




## What you need to run this code
<ul>
  <li>Node (18.16.1)</li>
  <li>NPM (9.7.4) or Yarn (1.22.4)</li>
  <li>Clerk account</li>
</ul>

## How to run this code

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```
3. Install Docker and set up the PostgreSQL container:
   ```
   docker-compose up -d
   ```
4. Set up Prisma
   ```
   npx prisma migrate dev
   ```
5. Set up Clerk:
   <ul>
     <li>Register on <a href="https://clerk.com">Clerk.dev</a> and create an application.</li>
     <li>Obtain your Clerk API keys and configure them in the environment variables.</li>
   </ul
6. Set up Cloudinary:
   <ul>
     <li>Register on <a href="https://cloudinary.com">Cloudinary</a> and get your API keys.</li>
     <li>Add these keys to the .env file.</li>
   </ul>
7. Set up environment variables:
   Create a `.env` file in the root of the project and add the following environment variables:
   ```
   DATABASE_URL=postgre-database-url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=clerk-publishable-key
   CLERK_SECRET_KEY=clerk-secret-key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL = /
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=cloudinary-cloud-name
   NEXT_PUBLIC_CLOUDINARY_API_KEY=cloudinary-api-key
   ```
8. Run the development server:
  ```
  npm run dev
   # or
   yarn dev
  ```
Open http://localhost:3000 to view the application.

## Technologies Used
- **Next.js**: a React framework for building fast web applications.
- **TypeScript**: a strongly typed programming language that builds on JavaScript.
- **Tailwind CSS**: an utility-first CSS framework for styling.
- **react-hook-form**: efficient, flexible form handling for React.
- **zod**: TypeScript-first schema declaration and validation.
- **Prisma**: ORM to interface with PostgreSQL database.
- **PostgreSQL**: database for storing school data.
- **Docker**: containerization for PostgreSQL.
- **Clerk**: authentication service to handle user login and role-based access.
- **Recharts**: data visualization library for displaying charts and graphs.
- **React-Toastify**: for toast notifications.
- **Cloudinary**: for handling image uploads.
  
## Badges
![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

## License
This project is open-sourced under the MIT license.
## Contact
For any queries or suggestions, feel free to reach me out at ghzaielrania@gmail.com

