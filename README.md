# SamDevResources - Developer Resources Management System

A full-stack application built with React, Vite, and Convex for managing developer resources, categories, sources, and resource types.

## Database Schema

The application follows a relational database structure with the following tables:

### 1. Categories

- Stores development categories (e.g., Frontend Development, Backend Development)
- Fields: `title`

### 2. Sources

- Stores resource sources (e.g., MDN, GitHub, Stack Overflow)
- Fields: `name`, `url`, `description`

### 3. Resource Types

- Stores types of resources (e.g., React, Node.js, PostgreSQL)
- Fields: `name`, `thumbnailUrl`
- Related to Categories (many-to-many via `resourceTypeCategories`)

### 4. Resources

- Individual resources within a resource type
- Fields: `name`, `resourceTypeId` (foreign key)
- Related to Sources (many-to-many via `resourceSources`)

### Junction Tables:

- **resourceTypeCategories**: Links resource types to categories
- **resourceSources**: Links resources to sources

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm/yarn)
- Convex account (free at https://convex.dev)

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Set up Convex:

```bash
npx convex dev
```

3. In a separate terminal, start the development server:

```bash
pnpm dev
```

### Seeding Sample Data

1. Navigate to the **Manage** page
2. Click the **"Seed Sample Data"** button
3. Confirm the action
4. The database will be populated with:
   - 3 Categories (Frontend, Backend, Database)
   - 3 Sources (MDN, GitHub, Stack Overflow)
   - 3 Resource Types (React, Node.js, PostgreSQL)
   - 7 Resources with proper relationships
   - All junction table entries

## Features

- **Dashboard**: View all resource types with their resources and sources
- **Manage**: CRUD operations for all entities
- **Relationships**: Proper linking between all entities
- **Statistics**: Summary view of database counts

## Technology Stack

- **Frontend**: React 18, Vite
- **Backend**: Convex (real-time database)
- **Styling**: Bootstrap 5
- **Icons**: Font Awesome, Bootstrap Icons

## Currently Available Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
