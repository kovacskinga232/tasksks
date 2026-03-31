# Tasksks - Full-Stack Task Management System
Tasksks is a high-performance **Single-Page Application (SPA)** designed
for structured task and project management. Built as a university
project for the **Single-Page and Progressive Web Applications** course, it
demonstrates full integration between a secure **Spring Boot** backend
and a dynamic **React** frontend.
## Key Features
-   **Secure Authentication & Authorization**\
    JWT-based login and registration implemented with **Spring
    Security**, including protected routes.


-   **Advanced Task & Project Management**\
    Create, update, and organize tasks within projects, with support for
    deadlines, priority levels, and completion tracking.


-   **Dynamic Internationalization (i18n)**\
    Supports **Hungarian, English, and Finnish**, with language
    persistence across sessions.


-   **Custom Theming**\
    Multiple UI themes that can be toggled in real time and persisted
    per user.


-   **Complex Filtering**\
    Multi-criteria filtering by title, priority, tag, and completion
    status.


-   **Robust Data Validation**\
    Client-side validation using **Zod** and **React Hook Form**.


-   **Admin Dashboard**\
    Dedicated interface for administrators to manage users and monitor
    application statistics.
## Tech Stack
### Backend
-   **Framework**: Spring Boot
-   **Security**: Spring Security & JWT
-   **Persistence**: Spring Data JPA / Hibernate
-   **Database**: MySQL (production), H2 (development)
-   **Other**: MapStruct, Lombok
### Frontend
-   **Framework**: React 18 (TypeScript)
-   **State Management**: TanStack React Query, React Context API
-   **UI Library**: Material UI (MUI)
-   **Form Handling**: React Hook Form, Zod
-   **Internationalization**: i18next
## Project Structure
    tasksks/
    ├── backend/    # Spring Boot application
    ├── frontend/   # React (Vite) application
    └── README.md
## Installation & Setup
### Backend Requirements
- Java 17+
- MySQL Server
1. Navigate to the backend folder: ```cd backend```
2. Update application-jpa.yml with your MySQL credentials and a secret
3. Run the application: ```./gradlew bootRun```
### Frontend Requirements
- Node.js
1. Navigate to the frontend folder: ```cd frontend```
2. Install dependencies: ```npm install```
3. Start the development server: ```npm run dev```