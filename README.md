# TaskFlow

## Overview

**TaskFlow** is a full-stack task management application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to register, log in, manage tasks, filter tasks by status, and (for admins) view and manage user logs. This project was developed as part of a technical assessment.

---

## Features

- **User Authentication:**  
  Secure login and registration using JWT-based authentication.

- **Protected Routes:**  
  Only authenticated users can access the main application features. Unauthenticated users are redirected to the login/register page.

- **Task Management:**  
  Create, view, update, and delete tasks.

- **Task Filtering:**  
  Filter tasks by completion status (completed/incomplete).  
  Optional: Search tasks by title.

- **Admin User Log Page:**  
  Admins can view user logs (login/logout times, JWT token name, user name, role, IP address) and delete logs as needed.

---

## Technologies Used

- **Frontend:** React, React Router, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT-based authentication
- **State Management:** React Context API, localStorage

---

## Getting Started

### Prerequisites

- Node.js v20.14.0
- NPM v10.7.0
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/taskflow-mern.git
   cd taskflow-mern
