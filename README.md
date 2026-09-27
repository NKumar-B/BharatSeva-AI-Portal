# BharatSeva AI Portal

 An AI-powered full-stack platform for accessing government services, submitting civic grievances, tracking service requests, and connecting citizens with essential public resources.

BharatSeva AI Portal is a full-stack web application designed to simplify citizen interaction with municipal and government services through a unified digital platform.

The platform combines **AI-powered assistance, grievance management, emergency SOS functionality, government service discovery, and real-time ticket tracking** into a single responsive application.

---

## Live Demo

 **[Visit BharatSeva AI Portal](https://bharatseva-ai-portal.onrender.com/)**

 ---
 
## Key Features 

###  Automated Grievance Management

- Submit civic complaints and service requests digitally.
- Automatically route grievances to the appropriate municipal division.
- Track the status of submitted tickets.
- Maintain a centralized personal ticket registry.
- Reduce manual administrative processing.

###  AI-Powered Conversational Assistant

- Interactive chatbot for citizen queries.
- Real-time response streaming using **Server-Sent Events (SSE)**.
- Helps users discover government services, welfare schemes, and platform information.
- Designed for natural and conversational interaction.

###  Emergency SOS & Location Support

- Dedicated emergency SOS functionality.
- Supports priority emergency requests.
- Captures live location coordinates for emergency context.
- Designed to provide a faster communication channel during critical situations.

###  Government Services Directory

Centralized access to important government portals and services across categories such as:

-  Education
-  Government Services
-  Finance
-  Public Welfare
-  Citizen Services

###  Personal Ticket Registry

Authenticated users can:

- Create service requests.
- View submitted tickets.
- Track ticket status.
- Monitor request history.
- Follow the progress of administrative inquiries.

### 🇮🇳 Responsive User Experience

- Responsive interface for desktop and mobile devices.
- Tricolor-inspired visual design.
- Custom loading and transition animations.
- Modern UI components using Tailwind CSS.
- Accessible navigation and clear information hierarchy.

---

# Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
|  React.js | Component-based user interface |
|  Tailwind CSS | Responsive styling and UI design |
|  Lucide React | UI icons |
|  Vite | Frontend development and build tooling |
|  SSE | Real-time streamed responses |

## Backend

| Technology | Purpose |
|---|---|
|  Java 17+ | Backend programming language |
|  Spring Boot | REST API and backend services |
|  Maven | Dependency and project management |
|  REST APIs | Frontend-backend communication |
|  Session/Auth | User authentication and authorization |

## Database

| Technology | Purpose |
|---|---|
|  MySQL | Persistent application data |
|  Spring Data / JPA | Database interaction |

## Architecture & Communication

- RESTful API architecture
- Server-Sent Events (SSE)
- Cross-Origin Resource Sharing (CORS)
- Client-server architecture
- Persistent database storage
- Secure session handling

---

# Project Structure

```text
BharatSeva-AI-Portal/
│
├── public/
│   └── # Static assets and index HTML
│
├── src/
│   │
│   ├── components/
│   │   ├── Home/
│   │   ├── Chatbot/
│   │   └── Dashboard/
│   │       └── # Modular React components
│   │
│   ├── App.jsx
│   │   └── # Main application component and routing
│   │
│   ├── index.css
│   │   └── # Global styles, Tailwind utilities and animations
│   │
│   └── main.jsx
│       └── # React application entry point
│
├── package.json
├── README.md
└── ...
````

> **Note:** Update the structure above if your actual project contains a separate backend directory or additional modules.

---

# Getting Started

Follow these steps to run BharatSeva AI Portal locally.

##  Prerequisites

Make sure the following are installed:

* [Node.js](https://nodejs.org/) **v18 or higher**
* **Java 17 or higher**
* **Maven**
* **MySQL Server**
* **Git**

---

## 1.Clone the Repository

```bash
git clone https://github.com/NKumar-B/BharatSeva-AI-Portal.git
cd BharatSeva-AI-Portal
```

---

## 2.Install Frontend Dependencies

```bash
npm install
```

---

## 3.Start the Frontend

```bash
npm run dev
```

The frontend development server will be available at:

```text
http://localhost:5173
```

---

# Backend Setup

BharatSeva AI Portal uses **Spring Boot** for backend services, authentication, database operations, and ticket management.

Make sure the backend server is running on:

```text
http://localhost:8080
```

Start the Spring Boot application using:

```bash
mvn spring-boot:run
```

The backend provides services for:

* Authentication
* Ticket management
* Database operations
* REST APIs
* Real-time communication
* User/session management

---

# Database Configuration

Make sure MySQL is running locally on:

```text
localhost:3306
```

Configure your Spring Boot database connection in your application configuration.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bharatseva
spring.datasource.username=your_username
spring.datasource.password=your_password
```

>  **Security:** Never commit passwords, API keys, JWT secrets, or other sensitive credentials to GitHub.

For local development, consider using environment variables or an ignored `.env`/configuration file.

---

# Application Architecture

```text
                    🇮🇳 BharatSeva AI Portal
                              │
                              ▼
                 ┌─────────────────────────┐
                 │      React Frontend     │
                 │                         │
                 │  Home • Chatbot • SOS   │
                 │  Dashboard • Services  │
                 └────────────┬────────────┘
                              │
                         REST / SSE
                              │
                              ▼
                 ┌─────────────────────────┐
                 │     Spring Boot API     │
                 │                         │
                 │ Authentication          │
                 │ Ticket Management       │
                 │ Government Services     │
                 │ AI / Chat Services      │
                 └────────────┬────────────┘
                              │
                         JPA / JDBC
                              │
                              ▼
                 ┌─────────────────────────┐
                 │      MySQL Database     │
                 │                         │
                 │ Users • Tickets • Data  │
                 └─────────────────────────┘
```

---

# Local Development

| Service     | Address                 |
| ----------- | ----------------------- |
| Frontend | `http://localhost:5173` |
| Backend   | `http://localhost:8080` |
| MySQL    | `localhost:3306`        |

---

# Real-Time Communication

The application uses **Server-Sent Events (SSE)** to support real-time streaming between the backend and frontend.

```text
User
 │
 │ Query
 ▼
React Frontend
 │
 │ HTTP Request
 ▼
Spring Boot
 │
 │ Streamed Response
 ▼
SSE Connection
 │
 ▼
React Chat Interface
```

This allows chatbot responses and other supported events to be delivered progressively rather than waiting for a complete response.

---

# Security & Data Handling

The application incorporates security-oriented practices including:

* Authentication and authorization
* Session management
* CORS configuration
* Protected backend endpoints
* Server-side database operations
* Separation of frontend and backend responsibilities

> Production deployments should additionally use HTTPS, secure cookies/tokens, environment-based secrets, input validation, rate limiting, and appropriate access controls.

---

# Policies & Compliance

The portal provides dedicated sections for common administrative and informational policies:

* **Copyright Policy** — Protection of platform intellectual property.
* **Privacy Policy** — Information regarding data handling and privacy.
* **Terms & Conditions** — Rules governing platform usage and user access.
* **Disclaimer & Hyperlink Policy** — Information regarding external resources and content accuracy.
* **Site Map** — Structured overview of the platform.

---

# Future Improvements

Potential future enhancements include:

* Progressive Web App (PWA) support
* Multilingual citizen assistance
* Advanced AI-powered government service recommendations
* Enhanced geolocation-based service discovery
* Real-time ticket notifications
* Administrative analytics dashboard
* Cloud deployment and scalability improvements
* Enhanced identity and authentication mechanisms

---

# Contributing

Contributions and suggestions are welcome.

```bash
# Fork the repository
# Create a feature branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "Add: your feature"

# Push your branch
git push origin feature/your-feature
```

Then open a Pull Request describing your changes.

---

# Author

### Badduluri Nithin Kumar

Full-Stack Developer | AI/ML Enthusiast

* GitHub: [https://github.com/NKumar-B](https://github.com/NKumar-B)

---

# Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

 **BharatSeva AI Portal — Simplifying access to citizen services through technology.**

