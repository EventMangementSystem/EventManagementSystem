# Event Management System

A full-stack Event Management System that allows users to discover, create, book, and manage events through a modern web application. The system also integrates AI-powered event recommendations and an AI chatbot to improve the user experience.

## 🚀 Features

### 👤 User Management & Authentication

- User registration and login
- JWT-based authentication
- Role-based authorization
- Protected routes
- User session/token management

### 🎫 Event Management

- Create events
- Edit events
- View event details
- Search and filter events
- Event category management
- Venue and pricing information
- Event availability and seat management

### 📅 Booking Management

- Book tickets for events
- View personal bookings
- Cancel bookings
- Track booking status
- Seat availability validation

### 💳 Payment Management

- Process event payments
- Track payment status
- View payment history
- Payment success handling

### 🎟️ Ticket Management

- Generate and manage tickets
- Ticket information associated with bookings
- Ticket retrieval functionality

### 📊 Dashboard

- Event and booking statistics
- Graphical data representation
- Dashboard analytics
- Monthly revenue information

### 🤖 AI Features

The project includes a dedicated AI microservice built with FastAPI.

#### AI Chatbot

- AI-powered event assistant
- Answers questions related to events, bookings, payments, and event suggestions
- Integrated with the main application

#### AI Event Recommendations

- Recommends relevant events based on the currently viewed event
- Uses event category, location, description, venue, and price
- Provides reasons for recommendations

#### Gemini Integration

- Google Gemini API integration
- AI responses generated through Gemini
- Separate AI service architecture

### 🐳 Docker Deployment

The complete application is containerized using Docker.

Services include:

- Spring Boot Backend
- React Frontend
- FastAPI AI Microservice

Docker Compose is used to run the complete application stack.

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      React UI        │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │    Spring Boot       │
                    │       Backend        │
                    └──────┬─────────┬─────┘
                           │         │
                    ┌──────▼───┐ ┌──▼─────────────┐
                    │ Database │ │  FastAPI AI    │
                    │  MySQL   │ │   Microservice │
                    └──────────┘ └───────┬────────┘
                                         │
                                         ▼
                                  ┌──────────────┐
                                  │ Google Gemini│
                                  │     API      │
                                  └──────────────┘