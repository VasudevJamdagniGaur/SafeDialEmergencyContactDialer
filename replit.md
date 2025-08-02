# SafeDial Emergency Services Application

## Overview

SafeDial is a comprehensive emergency services mobile application designed to provide quick access to emergency contacts and services in India. The application serves as a digital lifeline during emergencies, offering features like SOS alerts, location tracking, emergency service directories, and real-time communication with emergency responders. Built as a mobile-first Progressive Web App (PWA), it provides users with instant access to police, fire, medical, and specialized emergency services while maintaining location awareness and volunteer coordination capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based architecture with TypeScript for type safety and maintainability. The frontend is built using Vite as the build tool and development server, providing fast hot module replacement and optimized production builds. The application follows a component-based architecture with a clear separation of concerns:

- **UI Framework**: React 18 with TypeScript for robust component development
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Routing**: Wouter for lightweight client-side routing in a single-page application
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod for form validation and schema definition

### Backend Architecture
The backend follows a Node.js/Express architecture designed for scalability and maintainability:

- **Runtime**: Node.js with Express.js framework for RESTful API development
- **Database Layer**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Development**: Development server uses tsx for TypeScript execution and hot reloading
- **Production**: esbuild for fast production bundling with ESM module format

### Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM providing type-safe database operations:

- **Database**: PostgreSQL hosted on Neon for serverless scaling
- **ORM**: Drizzle ORM for schema definition and query building
- **Migrations**: Drizzle Kit for database migration management
- **Connection**: Neon serverless driver with WebSocket support for real-time capabilities

### Authentication and Authorization
The application implements a mobile-first authentication system:

- **Authentication**: OTP-based phone number verification system
- **Session Management**: PostgreSQL session storage using connect-pg-simple
- **User Management**: State-based user registration with profile management
- **Security**: Form validation with Zod schemas and CSRF protection

### Mobile-First Design Patterns
The application is architected specifically for mobile emergency scenarios:

- **Responsive Design**: Mobile-first approach with max-width container for tablet/desktop compatibility
- **Offline Capability**: Service worker integration for offline emergency access
- **Performance**: Code splitting and lazy loading for fast initial load times
- **Accessibility**: Emergency-focused UI with high contrast colors and large touch targets

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for database connectivity
- **drizzle-orm** and **drizzle-kit**: Type-safe ORM and migration tools for database operations
- **express**: Node.js web framework for REST API development
- **react** and **react-dom**: Core React library for UI development
- **vite**: Modern build tool and development server

### UI and Styling Libraries
- **@radix-ui/***: Comprehensive collection of accessible UI primitives including dialogs, dropdowns, forms, and navigation components
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Modern icon library for consistent iconography

### State Management and Data Fetching
- **@tanstack/react-query**: Powerful data fetching and state management for server state
- **wouter**: Lightweight routing library for single-page application navigation
- **react-hook-form**: Performant forms library with minimal re-renders
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries

### Development and Build Tools
- **typescript**: Static type checking for enhanced developer experience
- **vite**: Fast build tool with hot module replacement for development
- **esbuild**: Fast bundler for production builds
- **tsx**: TypeScript execution environment for development server

### Validation and Schema
- **zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod for automatic schema generation

### Session and Storage
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **ws**: WebSocket library for real-time communication capabilities

### Utility Libraries
- **clsx** and **tailwind-merge**: Utility functions for conditional CSS class management
- **date-fns**: Modern date utility library for time formatting and manipulation
- **nanoid**: URL-safe unique ID generator for session and entity identification