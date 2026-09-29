# Dojo Portfolio

A full-stack, content-managed developer portfolio built as a TypeScript monorepo.

Dojo Portfolio is designed to separate the **public portfolio experience** from the **content management interface**. The public website consumes portfolio data through a versioned Express API, while the protected admin application manages projects, skills, education, experience, and incoming contact messages.

The project uses a shared package for validation schemas and types so the frontend, admin dashboard, and backend can share the same API contracts.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Application Architecture](#application-architecture)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [How the Application Works](#how-the-application-works)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Database](#database)
- [Seeding](#seeding)
- [Running the Project](#running-the-project)
- [Application URLs](#application-urls)
- [Available Scripts](#available-scripts)
- [Public Website](#public-website)
- [Admin Dashboard](#admin-dashboard)
- [Backend API](#backend-api)
- [API Conventions](#api-conventions)
- [Authentication](#authentication)
- [Authorization and Protected Routes](#authorization-and-protected-routes)
- [Validation](#validation)
- [File Uploads and Cloudinary](#file-uploads-and-cloudinary)
- [Rate Limiting](#rate-limiting)
- [Database Schema](#database-schema)
- [Shared Package](#shared-package)
- [Frontend Data Flow](#frontend-data-flow)
- [Backend Architecture](#backend-architecture)
- [Error Handling](#error-handling)
- [Security Considerations](#security-considerations)
- [Development Workflow](#development-workflow)
- [Building for Production](#building-for-production)
- [Production Deployment Checklist](#production-deployment-checklist)
- [Troubleshooting](#troubleshooting)
- [Implementation Notes and Known Caveats](#implementation-notes-and-known-caveats)
- [Testing](#testing)
- [Extending the Project](#extending-the-project)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

**Dojo Portfolio** is a portfolio platform rather than a purely static portfolio page.

It consists of three applications/packages:

1. **Web** — the public-facing portfolio.
2. **Admin** — the authenticated content-management dashboard.
3. **Shared** — reusable Zod schemas and TypeScript types used across applications.

The backend provides a centralized API and PostgreSQL persistence layer.

### High-level capabilities

- Public portfolio homepage
- Projects portfolio with searchable/paginated API support
- Project details and project/skill relationships
- Skills management
- Education management
- Professional experience management
- Public contact form
- Contact-message inbox for administrators
- Dashboard statistics
- Authentication with access and refresh tokens
- HTTP-only authentication cookies
- Request validation with Zod
- PostgreSQL persistence
- Cloudinary image storage for project thumbnails
- File-type and file-size restrictions
- Global and route-specific rate limiting
- Shared API contracts between frontend and backend
- React Query/TanStack Query for server-state management
- Responsive UI with Tailwind CSS
- Dark/light theme support
- Error boundaries and user-facing error states

---

## Key Features

### Public Portfolio

The public website provides sections for:

- Hero/introduction
- Skills
- Projects
- Professional experience
- Education
- Contact information
- Contact message form

Project content is retrieved from the backend rather than being hard-coded directly into the page.

### Admin Dashboard

The admin application provides authenticated management for:

- Dashboard overview
- Projects
- Project thumbnails
- Project-to-skill relationships
- Skills
- Experience
- Education
- Contact messages
- Message read/unread state
- Message deletion
- Search/filtering/pagination where supported

### Backend

The API is organized into feature modules:

- Authentication
- Projects
- Skills
- Experience
- Education
- Contacts
- Dashboard

The backend follows a controller → service → repository structure.

### Shared Contracts

The `@dojo-portfolio/shared` package contains reusable:

- Zod validation schemas
- Request schemas
- Entity schemas
- TypeScript types
- Enums and common validation rules

This reduces duplicated API contract definitions across the applications.

---

# Application Architecture

```text
                         ┌──────────────────────┐
                         │      PostgreSQL      │
                         │       Database       │
                         └──────────▲───────────┘
                                    │
                                    │ pg
                                    │
┌─────────────────────┐             │             ┌──────────────────────┐
│   Public Web App    │             │             │    Admin Web App     │
│ React + Vite        │             │             │ React + Vite         │
│ Port 5173           │             │             │ Port 5174            │
└──────────┬──────────┘             │             └──────────┬───────────┘
           │                        │                        │
           │ Axios / JSON           │                        │ Axios / JSON
           │ HTTP-only cookies      │                        │ HTTP-only cookies
           │                        │                        │
           └────────────────────────┼────────────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express REST API   │
                         │      /api/v1         │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
              ┌──────────┐   ┌────────────┐   ┌──────────────┐
              │ Services │   │ Repositories│   │ Middleware   │
              └──────────┘   └────────────┘   └──────────────┘
                                                     │
                              ┌──────────────────────┼──────────────────┐
                              │                      │                  │
                              ▼                      ▼                  ▼
                         Validation              Auth/JWT          Rate Limits
                              │
                              ▼
                     @dojo-portfolio/shared

                                    │
                                    ▼
                            ┌────────────────┐
                            │   Cloudinary   │
                            │ Project Images │
                            └────────────────┘
```

---

# Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Static typing |
| Vite | Development server and build tool |
| React Router | Client-side routing |
| TanStack Query | Server-state fetching/caching |
| Axios | HTTP client |
| React Hook Form | Form management |
| Zod | Validation |
| Tailwind CSS | Styling |
| shadcn/ui | UI component foundation |
| Lucide React | Icons |
| Motion | UI animation |
| GSAP | Animation utilities |
| OGL | WebGL/visual effects |
| Sonner | Toast notifications |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express 5 | REST API framework |
| TypeScript | Static typing |
| PostgreSQL | Relational database |
| `pg` | PostgreSQL client |
| Zod | Request validation |
| JWT | Access/refresh authentication |
| bcryptjs | Password hashing |
| cookie-parser | Authentication cookie parsing |
| CORS | Cross-origin configuration |
| express-rate-limit | Rate limiting |
| Multer | Multipart file handling |
| Cloudinary | Image storage |
| dotenv | Environment configuration |

## Tooling

| Tool | Purpose |
|---|---|
| npm workspaces | Monorepo/package management |
| Oxlint | Linting |
| TypeScript compiler | Type checking/building |
| Vite | Frontend development/build |
| Git | Version control |

---

# Repository Structure

```text
dojo-portfolio/
│
├── apps/
│   ├── web/                         # Public portfolio website
│   │   ├── public/                  # Public assets
│   │   └── src/
│   │       ├── app/                 # App-level providers
│   │       ├── components/          # Shared UI components
│   │       ├── config/              # Environment configuration
│   │       ├── features/            # Feature-specific API/hooks/components
│   │       ├── layouts/             # Page layouts
│   │       ├── lib/                 # Axios + TanStack Query setup
│   │       ├── pages/               # Page/section components
│   │       ├── styles/              # Global styles
│   │       ├── types/               # Frontend API types
│   │       └── utils/               # Frontend utilities
│   │
│   ├── admin/                       # Protected admin dashboard
│   │   ├── public/
│   │   └── src/
│   │       ├── components/
│   │       ├── config/
│   │       ├── features/
│   │       ├── hooks/
│   │       ├── layouts/
│   │       ├── lib/
│   │       ├── pages/
│   │       └── utils/
│   │
│   └── backend/                     # Express API
│       ├── seed/                    # Database seed scripts/data
│       └── src/
│           ├── config/
│           ├── constants/
│           ├── infrastructure/
│           ├── middlewares/
│           ├── modules/
│           ├── types/
│           └── utils/
│
├── packages/
│   └── shared/                      # Shared Zod schemas/types
│       ├── src/
│       │   └── schemas/
│       └── dist/                    # Compiled package output
│
├── package.json                     # Root workspace configuration
├── package-lock.json
└── .gitignore
```

---

# How the Application Works

The project follows a typical content-management architecture.

### 1. Public visitor

A visitor opens the public website.

```text
Browser
   │
   ▼
React Web App
   │
   ▼
TanStack Query
   │
   ▼
Axios
   │
   ▼
GET /api/v1/projects
   │
   ▼
Express
   │
   ▼
Project Service
   │
   ▼
Project Repository
   │
   ▼
PostgreSQL
```

The response is then cached/managed by TanStack Query and rendered by React.

### 2. Administrator

An administrator opens the admin application.

```text
Admin Browser
      │
      ▼
Admin React App
      │
      ▼
POST /api/v1/auth/login
      │
      ▼
Express Auth Module
      │
      ▼
bcrypt password verification
      │
      ▼
JWT generation
      │
      ▼
HTTP-only cookies
```

Subsequent protected requests include the authentication cookies automatically.

### 3. Project image upload

When an administrator creates or updates a project with a thumbnail:

```text
Admin Form
    │
    ▼
multipart/form-data
    │
    ▼
Multer memory storage
    │
    ▼
File validation
    │
    ▼
Cloudinary
    │
    ├── secure URL
    └── public ID
    │
    ▼
PostgreSQL project record
```

---

# Prerequisites

Before running the project locally, install:

- Node.js
- npm
- PostgreSQL
- A Cloudinary account for project thumbnail uploads

A current Node.js LTS release is recommended.

You should also have:

- Git
- A PostgreSQL database/user
- A Cloudinary cloud name
- A Cloudinary API key
- A Cloudinary API secret

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/dojo-prog/dojo-portfolio.git
cd dojo-portfolio
```

## 2. Install dependencies

Install from the repository root:

```bash
npm install
```

The root project uses npm workspaces, so this installs dependencies for:

- `apps/web`
- `apps/admin`
- `apps/backend`
- `packages/shared`

## 3. Build the shared package

```bash
npm run build:shared
```

This compiles the shared TypeScript package into:

```text
packages/shared/dist/
```

## 4. Configure PostgreSQL

Create a PostgreSQL database and user, then make sure the backend environment variables point to it.

The application automatically creates its required tables when the backend starts.

## 5. Configure Cloudinary

Create a Cloudinary account and retrieve:

- Cloud name
- API key
- API secret

These are required by the backend because project thumbnails are uploaded to Cloudinary.

## 6. Create environment files

Create:

```text
apps/backend/.env
apps/web/.env
apps/admin/.env
```

Use the templates below.

---

# Environment Configuration

The repository intentionally ignores `.env` files.

```gitignore
.env
```

Do not commit production secrets.

---

## Backend `.env`

Create `apps/backend/.env`:

```env
NODE_ENV=development
PORT=5000
BASE_URL=http://localhost:5000

CLIENT_URL=http://localhost:5173
ADMIN_CLIENT_URL=http://localhost:5174

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=dojo_portfolio
DATABASE_USER=postgres
DATABASE_PASSWORD=your_database_password

ACCESS_TOKEN_SECRET=replace_with_a_long_random_secret
REFRESH_TOKEN_SECRET=replace_with_a_different_long_random_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Backend environment variables

| Variable | Description |
|---|---|
| `NODE_ENV` | Runtime environment |
| `PORT` | Express API port |
| `BASE_URL` | Backend base URL |
| `CLIENT_URL` | Allowed public web origin |
| `ADMIN_CLIENT_URL` | Allowed admin origin |
| `DATABASE_HOST` | PostgreSQL host |
| `DATABASE_PORT` | PostgreSQL port |
| `DATABASE_NAME` | PostgreSQL database |
| `DATABASE_USER` | PostgreSQL username |
| `DATABASE_PASSWORD` | PostgreSQL password |
| `ACCESS_TOKEN_SECRET` | JWT access-token signing secret |
| `REFRESH_TOKEN_SECRET` | JWT refresh-token signing secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

The backend validates required environment variables during startup. A missing required variable causes startup to fail.

---

## Public Web `.env`

Create `apps/web/.env`:

```env
VITE_APP_NAME=Dojo Portfolio
VITE_ENVIRONMENT=development
VITE_API_URL=http://localhost:5000/api/v1
```

---

## Admin `.env`

Create `apps/admin/.env`:

```env
VITE_APP_NAME=Dojo Portfolio Admin
VITE_ENVIRONMENT=development
VITE_API_URL=http://localhost:5000/api/v1
```

Both frontend applications require the same three variables:

| Variable | Purpose |
|---|---|
| `VITE_APP_NAME` | Application display/configuration name |
| `VITE_ENVIRONMENT` | Frontend environment identifier |
| `VITE_API_URL` | Backend API base URL |

---

# Database

The backend uses PostgreSQL through the `pg` package.

Database initialization runs when the backend starts.

The initialization script creates these tables if they do not already exist:

```text
users
projects
skills
project_skills
experience
education
contact_messages
```

## Entity relationships

```text
users

projects ────────────────┐
   │                     │
   │                     │
   ▼                     ▼
project_skills ───────► skills


experience

education

contact_messages
```

### Projects ↔ Skills

Projects and skills have a many-to-many relationship:

```text
projects
   │
   │ project_id
   ▼
project_skills
   ▲
   │ skill_id
   │
skills
```

Deleting a project or skill cascades through the join table.

---

# Database Schema

## `users`

Stores administrator accounts.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `email` | text | Unique |
| `password_hash` | text | bcrypt hash |
| `created_at` | timestamptz | Creation time |
| `updated_at` | timestamptz | Update time |

---

## `projects`

Stores portfolio projects.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `title` | text | Unique |
| `slug` | text | Unique, generated from title |
| `short_description` | text | Short project summary |
| `description` | text | Full description |
| `problem` | text | Optional |
| `solution` | text | Optional |
| `thumbnail_url` | text | Cloudinary URL |
| `thumbnail_public_id` | text | Cloudinary identifier |
| `github_url` | text | Optional GitHub URL |
| `live_url` | text | Optional live URL |
| `featured` | boolean | Featured-project flag |
| `status` | text | Project lifecycle status |
| `start_date` | date | Optional |
| `end_date` | date | Optional |
| `created_at` | timestamptz | Creation time |
| `updated_at` | timestamptz | Update time |

Allowed project statuses:

```text
in_progress
completed
maintained
archived
planned
```

---

## `skills`

Stores technical skills.

Allowed categories:

```text
language
frontend
backend
mobile
desktop
database
cloud
devops
testing
security
data
ai
tools
other
```

---

## `project_skills`

Join table connecting projects and skills.

Primary key:

```text
(project_id, skill_id)
```

---

## `experience`

Stores professional experience.

Fields include:

- Company
- Position
- Description
- Start date
- End date
- Current flag

---

## `education`

Stores educational background.

Fields include:

- Institution
- Degree
- Field
- Description
- Start date
- End date

---

## `contact_messages`

Stores messages submitted through the public contact form.

Fields include:

- Sender name
- Sender email
- Subject
- Message
- Creation date
- Update date
- Read timestamp

A message is considered unread when `read_at` is `NULL`.

---

# Seeding

The backend includes seed data for:

- Users
- Projects
- Skills
- Experiences
- Education
- Contact messages

Run:

```bash
npm run db:seed
```

The root script delegates to:

```text
apps/backend/seed/index.ts
```

The seed process runs inside a PostgreSQL transaction:

```text
BEGIN
  │
  ├── users
  ├── projects
  ├── skills
  ├── experiences
  ├── education
  └── contact messages
  │
COMMIT
```

If an error occurs, the transaction is rolled back.

> The seed data is intended for development/demo purposes. Review `apps/backend/seed/` before using it in any production environment.

---

# Running the Project

The applications are independent workspace projects, so run them in separate terminals.

## Terminal 1 — Backend

```bash
npm run dev:backend
```

Expected API:

```text
http://localhost:5000
```

## Terminal 2 — Public Website

```bash
npm run dev:web
```

Expected website:

```text
http://localhost:5173
```

## Terminal 3 — Admin Dashboard

```bash
npm run dev:admin
```

Expected admin application:

```text
http://localhost:5174
```

## Shared package watch mode

When actively modifying shared schemas:

```bash
npm run watch:shared
```

This continuously recompiles `packages/shared`.

---

# Application URLs

| Application | Development URL |
|---|---|
| Public portfolio | `http://localhost:5173` |
| Admin dashboard | `http://localhost:5174` |
| Backend | `http://localhost:5000` |
| API base | `http://localhost:5000/api/v1` |

---

# Available Scripts

Run these from the repository root.

| Script | Purpose |
|---|---|
| `npm run dev:backend` | Start backend in watch mode |
| `npm run dev:web` | Start public web application |
| `npm run dev:admin` | Start admin application |
| `npm run watch:shared` | Watch/recompile shared package |
| `npm run db:seed` | Seed development database |
| `npm run build:backend` | Build backend |
| `npm run build:web` | Build public website |
| `npm run build:admin` | Build admin dashboard |
| `npm run build:shared` | Build shared package |
| `npm run build` | Build all workspaces |

---

# Public Website

The public website is located at:

```text
apps/web
```

It is a React + TypeScript + Vite application.

## Main sections

The homepage is composed from sections including:

```text
HomePage
├── HeroSection
├── SkillsSection
├── ProjectsSection
├── ExperiencesSection
├── EducationSection
└── ContactSection
```

## Public routing

The application currently exposes:

```text
/
```

Unknown routes are handled by the custom not-found page.

## Frontend architecture

Feature-specific code is organized under:

```text
apps/web/src/features/
```

Current features include:

```text
contacts
education
experiences
projects
skills
```

Each feature generally contains:

```text
api/
components/
hooks/
types/
```

This keeps API logic, UI components, data-fetching hooks, and feature types close to the feature they belong to.

---

# Admin Dashboard

The admin application is located at:

```text
apps/admin
```

It is a protected React application.

## Authentication flow

The admin first checks:

```text
GET /api/v1/auth/me
```

If an authenticated user exists, the admin layout is rendered.

Otherwise, the application redirects to:

```text
/auth
```

## Admin routes

```text
/auth

/
├── dashboard
├── projects
├── projects/add
├── projects/:projectId/edit
├── skills
├── experiences
├── education
└── contact/messages
```

The root route is the dashboard.

## Dashboard

The dashboard provides:

- Total projects
- Featured projects
- Total skills
- Total experiences
- Unread contact messages
- Recent contact messages

## Project management

Administrators can:

- View projects
- Search projects
- Filter by featured/status
- Paginate projects
- Add projects
- Edit projects
- Delete projects
- Upload project thumbnails
- Associate skills with projects

## Skills management

Administrators can:

- Create skills
- Search/filter skills
- Delete skills

## Experience management

Administrators can:

- Add experience
- Update experience
- Delete experience
- Search/filter experience
- Mark experience as current

## Education management

Administrators can:

- Add education
- Update education
- Delete education
- Search/sort education

## Contact messages

Administrators can:

- View incoming messages
- Search messages
- Filter unread messages
- View message details
- Mark messages as read
- Delete messages
- View unread-message count

---

# Backend API

The backend API is versioned under:

```text
/api/v1
```

Available resource groups:

```text
/api/v1/auth
/api/v1/projects
/api/v1/skills
/api/v1/experience
/api/v1/education
/api/v1/contacts
/api/v1/dashboard
```

---

## Authentication Endpoints

### Get current user

```http
GET /api/v1/auth/me
```

Authentication:

```text
Required
```

Example response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "admin@example.com",
      "created_at": "2026-01-01T00:00:00.000Z",
      "updated_at": "2026-01-01T00:00:00.000Z"
    }
  }
}
```

### Register

```http
POST /api/v1/auth/register
```

Body:

```json
{
  "email": "admin@example.com",
  "password": "password123",
  "confirm_password": "password123"
}
```

Registration passwords must contain at least 8 characters.

### Login

```http
POST /api/v1/auth/login
```

Body:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

Successful authentication sets HTTP-only cookies.

### Logout

```http
POST /api/v1/auth/logout
```

### Refresh access token

```http
POST /api/v1/auth/refresh-access
```

The refresh token is read from the authentication cookie.

---

# Project Endpoints

Base:

```text
/api/v1/projects
```

| Method | Endpoint | Auth | Purpose |
|---|---|---:|---|
| GET | `/` | No | Paginated/filterable projects |
| GET | `/all` | No | All projects |
| GET | `/:projectId` | No | Single project |
| POST | `/` | Yes | Create project |
| PATCH | `/:projectId` | Yes | Update project |
| DELETE | `/:projectId` | Yes | Delete project |
| PUT | `/:projectId/skills` | Yes | Replace project skills |

## Project query parameters

Supported query parameters include:

```text
page
limit
search
sort
featured
status
```

Sorting:

```text
newest
oldest
```

Status:

```text
in_progress
completed
maintained
archived
planned
```

Example:

```http
GET /api/v1/projects?page=1&limit=10&search=portfolio&featured=true&sort=newest
```

## Create/update project

The project body uses camelCase field names:

```json
{
  "title": "Example Project",
  "shortDescription": "A short summary.",
  "description": "A detailed description of the project.",
  "problem": "The problem the project addresses.",
  "solution": "How the project addresses the problem.",
  "githubUrl": "https://github.com/example/repository",
  "liveUrl": "https://example.com",
  "featured": true,
  "status": "completed",
  "startDate": "2026-01-01",
  "endDate": "2026-03-01"
}
```

Project thumbnails are uploaded as multipart form data under:

```text
thumbnail
```

---

# Skill Endpoints

Base:

```text
/api/v1/skills
```

| Method | Endpoint | Auth | Purpose |
|---|---|---:|---|
| GET | `/` | No | Search/filter skills |
| GET | `/all` | No | Get all skills |
| GET | `/:skillId` | No | Get one skill |
| POST | `/` | Yes | Create skill |
| DELETE | `/:skillId` | Yes | Delete skill |

Query parameters:

```text
search
category
sort
```

Sorting:

```text
newest
oldest
```

Categories:

```text
language
frontend
backend
mobile
desktop
database
cloud
devops
testing
security
data
ai
tools
other
```

Create body:

```json
{
  "name": "TypeScript",
  "category": "language"
}
```

---

# Experience Endpoints

Base:

```text
/api/v1/experience
```

| Method | Endpoint | Auth | Purpose |
|---|---|---:|---|
| GET | `/` | No | Search/filter experience |
| GET | `/all` | No | Get all experience |
| GET | `/:experienceId` | No | Get one experience |
| POST | `/` | Yes | Create experience |
| PATCH | `/:experienceId` | Yes | Update experience |
| DELETE | `/:experienceId` | Yes | Delete experience |

Query parameters:

```text
page
limit
search
sort
current
```

Create/update body:

```json
{
  "company": "Example Company",
  "position": "Software Engineer",
  "description": "Worked on full-stack applications.",
  "startDate": "2026-01-01",
  "endDate": "",
  "current": true
}
```

---

# Education Endpoints

Base:

```text
/api/v1/education
```

| Method | Endpoint | Auth | Purpose |
|---|---|---:|---|
| GET | `/` | No | Search/sort education |
| GET | `/all` | No | Get all education |
| GET | `/:educationId` | No | Get one education record |
| POST | `/` | Yes | Create education |
| PATCH | `/:educationId` | Yes | Update education |
| DELETE | `/:educationId` | Yes | Delete education |

Query parameters:

```text
page
limit
search
sort
```

Create/update body:

```json
{
  "institution": "Example University",
  "degree": "Bachelor of Science",
  "field": "Information Technology",
  "description": "Academic background.",
  "startDate": "2022-08-01",
  "endDate": "2026-06-01"
}
```

---

# Contact Endpoints

Base:

```text
/api/v1/contacts
```

## Create public message

```http
POST /api/v1/contacts/messages
```

Authentication:

```text
Not required
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project inquiry",
  "message": "Hello, I would like to discuss a project."
}
```

## List messages

```http
GET /api/v1/contacts/messages
```

Authentication:

```text
Required
```

Query parameters:

```text
page
limit
search
sort
unread
```

`unread` accepts:

```text
true
false
```

## Get message

```http
GET /api/v1/contacts/messages/:contactMessageId
```

Authentication:

```text
Required
```

## Get unread count

```http
GET /api/v1/contacts/messages/unread/count
```

Authentication:

```text
Required
```

## Mark message as read

```http
PATCH /api/v1/contacts/messages/:contactMessageId/read
```

Authentication:

```text
Required
```

## Delete message

```http
DELETE /api/v1/contacts/messages/:contactMessageId
```

Authentication:

```text
Required
```

---

# Dashboard Endpoint

```http
GET /api/v1/dashboard/overview
```

Authentication:

```text
Required
```

The response includes:

```text
projects
featured_projects
skills
experiences
unread_messages
recent_messages
```

---

# API Conventions

## Success responses

Successful responses use:

```json
{
  "success": true
}
```

Resource responses generally place their payload under:

```json
{
  "success": true,
  "data": {}
}
```

Example:

```json
{
  "success": true,
  "data": {
    "project": {}
  }
}
```

## Error responses

Errors use:

```json
{
  "success": false,
  "message": "Error message"
}
```

Validation errors can additionally include:

```json
{
  "success": false,
  "message": "Validation error",
  "errors": {}
}
```

During development, the backend can also include an error stack.

---

# Pagination

Paginated endpoints return:

```json
{
  "projects": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "total_pages": 3
  }
}
```

Pagination query parameters:

```text
page
limit
```

Example:

```http
GET /api/v1/projects?page=2&limit=10
```

---

# Authentication

Authentication uses two JWTs:

```text
access_token
refresh_token
```

## Access token

Configured for:

```text
15 minutes
```

## Refresh token

The JWT itself is configured for:

```text
1 day
```

Authentication tokens are stored in HTTP-only cookies rather than browser-accessible JavaScript storage.

Cookie settings include:

- `httpOnly`
- `secure` in production
- `sameSite: strict`

The frontend Axios clients use:

```text
withCredentials: true
```

This allows cookies to be sent with API requests.

---

# Authorization and Protected Routes

The backend uses the `protectRoute` middleware.

The middleware:

1. Reads the access token cookie.
2. Verifies the JWT.
3. Extracts the user ID.
4. Looks up the user in PostgreSQL.
5. Attaches the public user object to `req.user`.
6. Allows the request to continue.

If any step fails:

```http
401 Unauthorized
```

is returned.

Protected resource mutations include:

- Creating projects
- Updating projects
- Deleting projects
- Updating project skills
- Creating/deleting skills
- Creating/updating/deleting experience
- Creating/updating/deleting education
- Viewing/managing contact messages
- Viewing dashboard statistics

---

# Validation

Request validation is centralized through Zod schemas in:

```text
packages/shared/src/schemas/
```

The backend validation middleware can validate:

- `params`
- `query`
- `body`

Example:

```ts
validate({
  params: ProjectIdParamsSchema,
  body: UpdateProjectBodySchema,
})
```

This provides a consistent validation contract.

---

# Important Validation Rules

## Project

- Title required
- Short description required
- Description required
- Short description maximum: 500 characters
- Description maximum: 2,000 characters
- GitHub URL must point to `github.com`
- Project status must be one of the supported statuses
- Dates must use ISO date format

## Skill

- Name required
- Maximum skill name length: 50 characters
- Category must be one of the supported categories

## Experience

- Company required
- Position required
- Description required
- Description maximum: 2,000 characters
- Start date required
- End date optional
- Current flag required

## Education

- Institution required
- Degree required
- Field optional
- Description optional
- Dates optional

## Contact message

- Name required
- Email required and must be valid
- Subject optional
- Message required
- Message maximum: 2,040 characters

## Authentication

Registration requires:

- Valid email
- Password with at least 8 characters
- Matching confirmation password

---

# File Uploads and Cloudinary

Project thumbnails are handled by Multer and uploaded to Cloudinary.

## Accepted image formats

```text
JPEG
PNG
WebP
```

## Upload limits

```text
Maximum file size: 5 MB
Maximum files: 10
```

The current project upload routes use a single thumbnail:

```text
thumbnail
```

The backend stores uploads in Cloudinary under:

```text
portfolio-projects/portfolio/project-thumbnails
```

Cloudinary returns:

```text
secure_url
public_id
```

The URL is stored in PostgreSQL for display.

The public ID is stored so an existing image can be deleted when a project thumbnail is replaced.

---

# Rate Limiting

The API uses `express-rate-limit`.

## Global limit

```text
300 requests per minute
```

## Authentication

Login:

```text
10 requests/minute
```

Registration:

```text
5 requests/minute
```

## Project writes

```text
30 requests/minute
```

## Skill writes

```text
20 requests/minute
```

## Experience writes

```text
20 requests/minute
```

## Education writes

```text
10 requests/minute
```

## Contact message creation

```text
10 requests/minute
```

Rate-limit responses follow the application's normal error-response structure.

---

# Shared Package

The shared package is:

```text
packages/shared
```

Package name:

```text
@dojo-portfolio/shared
```

It exports schemas for:

```text
auth
users
projects
skills
project_skills
education
experience
contact_message
dashboard
```

The package is used by both frontend applications and the backend.

## Why this matters

Without a shared contract, the same API fields would have to be manually recreated in multiple applications.

For example:

```text
Backend
  └── ProjectCreateSchema

Admin
  └── ProjectCreateSchema

Web
  └── Project type
```

With the shared package:

```text
             @dojo-portfolio/shared
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Backend      Web       Admin
```

This keeps field names, enums, validation rules, and types synchronized.

---

# Frontend Data Flow

Both frontend applications use TanStack Query.

A typical feature follows this pattern:

```text
Component
   │
   ▼
Custom Hook
   │
   ▼
API Function
   │
   ▼
Axios
   │
   ▼
Express API
```

For example:

```text
ProjectsPage
    │
    ▼
useProjects()
    │
    ▼
project.api.ts
    │
    ▼
Axios
    │
    ▼
GET /api/v1/projects
```

This keeps components focused on presentation and user interaction rather than HTTP implementation details.

---

# Backend Architecture

The backend follows a modular architecture.

A typical module looks like:

```text
modules/projects/
├── project.controller.ts
├── project.rate-limiter.ts
├── project.repository.ts
├── project.routes.ts
├── project.service.ts
└── project.types.ts
```

## Routes

Define:

- HTTP method
- endpoint
- middleware
- validation
- controller

## Controllers

Controllers handle:

- Request/response interaction
- Calling services
- Sending HTTP status codes
- Passing errors to middleware

Controllers intentionally contain minimal business logic.

## Services

Services contain business logic such as:

- Authentication
- Cloudinary uploads
- Project creation
- Slug generation
- Validation-dependent operations
- Combining repository operations

## Repositories

Repositories handle PostgreSQL operations.

This separates SQL/data persistence from business logic.

---

# Error Handling

Errors are centralized through:

```text
apps/backend/src/middlewares/error.middleware.ts
```

The backend recognizes application errors and selected PostgreSQL constraint errors.

Examples include:

```text
400 Bad Request
401 Unauthorized
404 Not Found
409 Conflict
500 Internal Server Error
```

Database uniqueness violations are converted into meaningful API messages.

In development, stack traces are returned in error responses to make debugging easier.

In production, internal error details are hidden from the client.

---

# Security Considerations

The project includes several security-oriented mechanisms.

## Password hashing

Passwords are hashed using:

```text
bcryptjs
```

Plain-text passwords are not stored in PostgreSQL.

## HTTP-only cookies

JWT cookies use:

```text
httpOnly
```

This helps prevent client-side JavaScript from directly reading authentication tokens.

## Secure cookies in production

The cookie configuration enables:

```text
secure = true
```

when:

```text
NODE_ENV=production
```

## SameSite protection

Cookies use:

```text
sameSite: strict
```

## CORS allowlist

The backend only permits configured frontend origins:

```text
CLIENT_URL
ADMIN_CLIENT_URL
```

## Input validation

API requests are validated using Zod before being processed.

## Rate limiting

Authentication and write-heavy endpoints have additional rate limits.

## SQL parameterization

Repository queries use parameterized PostgreSQL queries rather than directly interpolating user-provided values into SQL values.

## Upload restrictions

Project image uploads are restricted by:

- MIME type
- File size
- Upload count

---

# Development Workflow

A recommended development workflow is:

## 1. Start PostgreSQL

Make sure PostgreSQL is running and the configured database exists.

## 2. Start shared package watch mode

```bash
npm run watch:shared
```

## 3. Start backend

```bash
npm run dev:backend
```

## 4. Start public website

```bash
npm run dev:web
```

## 5. Start admin dashboard

```bash
npm run dev:admin
```

## 6. Seed development data if necessary

```bash
npm run db:seed
```

---

# Building for Production

Build all packages:

```bash
npm run build
```

Or build individually:

```bash
npm run build:shared
npm run build:backend
npm run build:web
npm run build:admin
```

Frontend builds are generated by Vite.

Backend compilation is handled by TypeScript.

---

# Production Deployment Checklist

Before deploying:

## Environment

- [ ] Set `NODE_ENV=production`
- [ ] Configure production API URL
- [ ] Configure production frontend URLs
- [ ] Use strong random JWT secrets
- [ ] Configure production PostgreSQL credentials
- [ ] Configure Cloudinary production credentials
- [ ] Do not commit `.env` files

## Database

- [ ] Create production PostgreSQL database
- [ ] Verify connectivity
- [ ] Verify table initialization
- [ ] Review seed scripts before use
- [ ] Configure backups

## Backend

- [ ] Build backend
- [ ] Start compiled server
- [ ] Verify CORS origins
- [ ] Verify cookies over HTTPS
- [ ] Verify rate limits
- [ ] Verify error handling
- [ ] Review logs

## Frontend

- [ ] Set `VITE_API_URL` to production API
- [ ] Build web application
- [ ] Build admin application
- [ ] Serve frontend over HTTPS
- [ ] Verify API credentials/cookies

## Cloudinary

- [ ] Verify production Cloudinary account
- [ ] Verify upload permissions
- [ ] Verify image delivery URLs
- [ ] Review storage/usage limits

---

# Troubleshooting

## Backend says a required environment variable is missing

Check:

```text
apps/backend/.env
```

Make sure every required variable exists.

The backend validates its environment configuration during startup.

---

## Frontend says `Missing required env`

Check:

```text
apps/web/.env
apps/admin/.env
```

Required frontend variables:

```text
VITE_APP_NAME
VITE_ENVIRONMENT
VITE_API_URL
```

Restart Vite after changing environment variables.

---

## CORS errors

Verify:

```env
CLIENT_URL=http://localhost:5173
ADMIN_CLIENT_URL=http://localhost:5174
```

Also verify that the browser is actually accessing the application from those exact origins.

For example:

```text
http://localhost:5173
```

and

```text
http://127.0.0.1:5173
```

are different origins.

---

## Authentication is not working

Check:

1. Backend is running.
2. Frontend uses the correct API URL.
3. Axios has `withCredentials: true`.
4. CORS has `credentials: true`.
5. The frontend origin matches `CLIENT_URL` or `ADMIN_CLIENT_URL`.
6. The browser is allowing cookies.
7. HTTPS/secure-cookie configuration matches the environment.

---

## Database connection fails

Verify:

```env
DATABASE_HOST
DATABASE_PORT
DATABASE_NAME
DATABASE_USER
DATABASE_PASSWORD
```

Then verify PostgreSQL is running.

---

## Project image upload fails

Check:

```env
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

Also verify:

- File is JPEG, PNG, or WebP
- File is not larger than 5 MB
- Cloudinary credentials are valid

---

## Shared package changes are not appearing

Rebuild:

```bash
npm run build:shared
```

Or run:

```bash
npm run watch:shared
```

Then restart the application if necessary.

---

# Implementation Notes and Known Caveats

This section documents details that are useful to developers maintaining the current codebase.

## 1. The root workspace references the admin application

The root `package.json` includes:

```text
dev:admin
build:admin
```

and the repository currently contains:

```text
apps/admin
```

The admin application is therefore a first-class workspace.

## 2. Environment files are application-specific

The backend reads its environment through Node/dotenv.

The React applications read Vite variables through:

```text
import.meta.env
```

Therefore, backend variables should not be placed in frontend `.env` files and frontend `VITE_*` variables should not be treated as secrets.

## 3. The refresh-cookie lifetime deserves review

The refresh-token JWT is configured for a one-day expiration, while the current cookie `maxAge` expression is shorter than one day.

Before production deployment, review:

```text
apps/backend/src/constants/auth.ts
```

and ensure the cookie lifetime intentionally matches the JWT lifetime.

## 4. Project image cleanup on project deletion

When a project thumbnail is replaced, the previous Cloudinary image is deleted.

The project deletion flow currently deletes the database record but does not perform the same Cloudinary cleanup.

If projects are frequently deleted, consider deleting their associated Cloudinary asset as part of project deletion to prevent orphaned images.

## 5. Project-skill replacement should be reviewed

The project skill update transaction is intended to clear existing relationships and insert the new set of skill IDs.

The SQL statement used to clear the relationships should be verified against the actual `project_skills` table name before production use.

## 6. Registration is exposed by the API

The API includes:

```http
POST /api/v1/auth/register
```

The admin UI primarily exposes login.

If this portfolio is intended to have a single private administrator, consider whether public registration should remain enabled in production.

Possible production approaches include:

- Disable registration.
- Restrict registration to an initialization flow.
- Require an invitation.
- Add roles/permissions.

## 7. No automated test suite is currently exposed through package scripts

The repository currently does not provide a root test script or dedicated automated test suite.

For a production-grade deployment, consider adding:

- Unit tests
- Service tests
- Repository/integration tests
- API endpoint tests
- Frontend component tests
- End-to-end tests

---

# Testing

At the current state of the repository, there is no dedicated test command exposed in the root `package.json`.

A future test structure could look like:

```text
tests/
├── unit/
├── integration/
├── api/
└── e2e/
```

Recommended areas to test first:

### Authentication

- Successful registration
- Duplicate email
- Invalid login
- Successful login
- Expired access token
- Refresh token flow
- Logout

### Projects

- Create
- Update
- Delete
- Search
- Pagination
- Status filtering
- Featured filtering
- Skill association
- Thumbnail upload

### Contact messages

- Public message creation
- Invalid email
- Message validation
- Unread count
- Mark as read
- Delete message

### Validation

Test all shared Zod schemas independently.

---

# Extending the Project

The modular structure makes additional content types relatively straightforward.

For example, adding a `certifications` feature would typically involve:

## 1. Shared schemas

```text
packages/shared/src/schemas/certifications/
```

Add:

```text
certification.schema.ts
certification.request.ts
index.ts
```

Export it from:

```text
packages/shared/src/index.ts
```

## 2. Database

Add a table to the database initialization process.

## 3. Backend module

Create:

```text
apps/backend/src/modules/certifications/
├── certification.controller.ts
├── certification.repository.ts
├── certification.routes.ts
├── certification.service.ts
├── certification.types.ts
└── certification.rate-limiter.ts
```

## 4. Backend router

Register the router in:

```text
apps/backend/src/app.ts
```

## 5. Public frontend feature

Add:

```text
apps/web/src/features/certifications/
```

## 6. Admin feature

Add:

```text
apps/admin/src/features/certifications/
```

## 7. Admin route/page

Add the appropriate route to the admin application.

This preserves the project's existing feature-oriented architecture.

---

# Recommended Project Conventions

When extending the codebase, maintain these conventions.

## Frontend

Prefer:

```text
feature/
├── api/
├── components/
├── hooks/
└── types/
```

rather than placing all application logic into global folders.

## Backend

Prefer:

```text
module/
├── controller
├── repository
├── route
├── service
└── types
```

Keep SQL inside repositories and business rules inside services.

## Validation

Add reusable Zod schemas to:

```text
packages/shared
```

rather than duplicating request validation between applications.

## API naming

Use versioned routes:

```text
/api/v1/...
```

Use REST-style HTTP methods:

```text
GET
POST
PATCH
PUT
DELETE
```

---

# Code Quality

The frontend applications provide Oxlint scripts:

```bash
npm run lint -w @dojo-portfolio/web
npm run lint -w @dojo-portfolio/admin
```

The backend is compiled with TypeScript.

The frontend build process also runs TypeScript project builds:

```text
tsc -b
```

A successful build therefore provides useful compile-time verification even though a full automated test suite is not currently configured.

---

# Performance Considerations

The application already includes several performance-oriented choices:

- TanStack Query for server-state caching
- Paginated API endpoints
- Database-side filtering
- Database-side sorting
- Database-side pagination
- PostgreSQL window counts for pagination metadata
- Parallel dashboard queries with `Promise.all`
- Vite production builds
- Cloudinary image delivery
- Frontend asset bundling

For future scaling, consider:

- Database indexes for frequently filtered columns
- Image transformations/responsive image sizes
- CDN configuration
- HTTP caching
- Query caching strategy
- PostgreSQL connection-pool tuning
- Structured application logging
- Monitoring and tracing

---

# Accessibility Considerations

When extending the UI, preserve:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Accessible labels
- Sufficient color contrast
- Descriptive image alt text
- Accessible dialog behavior
- Form validation feedback

The admin application contains reusable UI components that should be preferred over creating duplicate components.

---

# Deployment Architecture

A typical production deployment can be structured as:

```text
                         Internet
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
       Public Web Host              Admin Web Host
              │                           │
              └─────────────┬─────────────┘
                            │
                            ▼
                       API Server
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
           PostgreSQL              Cloudinary
```

The exact hosting provider is intentionally not coupled to the application.

The frontend applications can be deployed to static hosting/CDN infrastructure, while the backend requires a Node.js-compatible runtime.

---

# Production Environment Example

A production setup might conceptually look like:

```text
PUBLIC WEB
https://portfolio.example.com

ADMIN
https://admin.example.com

API
https://api.example.com
```

Then:

```env
CLIENT_URL=https://portfolio.example.com
ADMIN_CLIENT_URL=https://admin.example.com
BASE_URL=https://api.example.com
```

and both frontend applications would use:

```env
VITE_API_URL=https://api.example.com/api/v1
```

Use HTTPS for all production applications.

---

# Project Design Principles

The project is structured around several useful engineering principles:

### Separation of concerns

UI, API, business logic, persistence, and validation are separated.

### Reusable contracts

Shared Zod schemas reduce contract drift.

### Feature-oriented frontend architecture

Related API, hooks, components, and types are kept together.

### Layered backend architecture

Routes → controllers → services → repositories provide clear responsibility boundaries.

### Security by default

Authentication cookies, validation, CORS restrictions, password hashing, upload restrictions, and rate limiting are built into the API.

### Content-driven portfolio

Portfolio information is stored in PostgreSQL and managed through the admin application rather than requiring source-code changes for every content update.

---

# Contributing

If this project is being developed by multiple contributors, a typical contribution workflow is:

```bash
git checkout -b feature/my-feature
```

Make changes, then verify:

```bash
npm run build
```

For frontend changes, also run the relevant lint command:

```bash
npm run lint -w @dojo-portfolio/web
```

or:

```bash
npm run lint -w @dojo-portfolio/admin
```

Commit the changes:

```bash
git add .
git commit -m "feat: describe the change"
```

Push the branch:

```bash
git push origin feature/my-feature
```

Then open a pull request.

---

# License

The root `package.json` currently specifies:

```text
ISC
```

If this repository is intended for public distribution, consider adding a dedicated `LICENSE` file containing the full license text and clarifying ownership/usage terms.

---

# Acknowledgements

This project brings together several open-source technologies and libraries, including:

- React
- TypeScript
- Vite
- Express
- PostgreSQL
- TanStack Query
- Axios
- Zod
- Tailwind CSS
- shadcn/ui
- Lucide
- Motion
- GSAP
- Cloudinary
- Multer
- JWT
- bcryptjs

Refer to each package's official documentation and license terms when modifying or redistributing the project.

---

# Quick Start

For someone who already has PostgreSQL and Cloudinary configured:

```bash
# 1. Install dependencies
npm install

# 2. Build shared contracts
npm run build:shared

# 3. Configure:
#    apps/backend/.env
#    apps/web/.env
#    apps/admin/.env

# 4. Seed development data
npm run db:seed

# 5. Start backend
npm run dev:backend

# 6. Start public site
npm run dev:web

# 7. Start admin
npm run dev:admin
```

Then open:

```text
Public:
http://localhost:5173

Admin:
http://localhost:5174

API:
http://localhost:5000/api/v1
```

---

# Final Architecture Summary

```text
DOJO PORTFOLIO
│
├── Public Web
│   └── React + Vite
│       ├── Portfolio
│       ├── Projects
│       ├── Skills
│       ├── Experience
│       ├── Education
│       └── Contact Form
│
├── Admin
│   └── React + Vite
│       ├── Authentication
│       ├── Dashboard
│       ├── Project Management
│       ├── Skill Management
│       ├── Experience Management
│       ├── Education Management
│       └── Contact Message Management
│
├── Backend
│   └── Express + TypeScript
│       ├── Auth
│       ├── Projects
│       ├── Skills
│       ├── Experience
│       ├── Education
│       ├── Contacts
│       └── Dashboard
│
├── PostgreSQL
│   ├── Users
│   ├── Projects
│   ├── Skills
│   ├── Project Skills
│   ├── Experience
│   ├── Education
│   └── Contact Messages
│
├── Cloudinary
│   └── Project Thumbnails
│
└── Shared Package
    └── Zod Schemas + TypeScript Types
```

---

## Project Status

**Current state:** Functional full-stack portfolio/CMS application.

The repository contains the public portfolio, protected admin dashboard, Express API, PostgreSQL persistence, shared validation contracts, authentication, Cloudinary integration, seed data, and development/build scripts.

For production use, review the security and implementation caveats documented above—particularly administrator registration, refresh-cookie lifetime, Cloudinary cleanup, project-skill update SQL, and automated test coverage.
