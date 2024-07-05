# Sea Quill

Sea Quill is a React-based dashboard application that integrates with a Node.js backend and a Supabase database. It allows users to select and view data visualizations based on various date ranges and filters.

## Table of Contents

- [Sea Quill](#sea-quill)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Setup and Installation](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [API Endpoints](#api-endpoints)
    - [GET /api/dashboards](#get-apidashboards)
    - [GET /api/charts](#get-apicharts)
    - [GET /api/charts/:id](#get-apichartsid)
      - [Query Parameters](#query-parameters)
  - [License](#license)

## Features

- Interactive dashboards with selectable charts.
- Date range selection with predefined and custom ranges.
- Data visualization using Recharts.
- Responsive design.
- Backend integration with Supabase for data fetching.

## Technology Stack

- **Frontend**: React, Vite, TypeScript, Material-UI, Recharts, Shadcn
- **Backend**: Node.js, Express, Supabase
- **Database**: Supabase (PostgreSQL)

## Setup and Installation

### Prerequisites

- Node.js (>=18.x)
- npm
- Docker (optional, for running the database)

### Installation

1. **Clone the repository**:

  ```bash
  git clone https://github.com/g-blok/sea-quill.git
  cd sea-quill

2. **Install frontend dependencies**:

  ```bash
  cd frontend
  npm install

3. **Install backend dependencies**:

  ```bash
  cd backend
  npm install

4. **Set up environment variables**:

  Create a .env file in the backend directory with the following content:

  ```env
  PORT=5000
  CORS_ORIGIN=https://localhost:5173
  SUPABASE_URL=your-supabase-url
  SUPABASE_KEY=your-supabase-key

## Running the Application

1. Start the backend:

  ```bash
  cd backend
  npm run dev

2. Start the frontend:

  ```bash
  cd ../frontend
  npm run dev

3. Open your browser and navigate to http://localhost:5173.

## Usage

- Select a dashboard from the dropdown to view its charts.
- Use the date range selector to filter data by predefined or custom ranges.
 -Click on a chart to view detailed data in a modal.

## Directory Structure
  ```bash
  sea-quill/
  ├── backend/                  # Backend code
  │   ├── src/
  │   │   ├── controllers/      # Controllers for handling API requests
  │   │   ├── database/         # Client for managing supabse interaction
  │   │   ├── models/           # Data models
  │   │   ├── routes/           # API routes
  │   │   └── server.ts         # Entry point for the backend server
  │   ├── .env                  # Environment variables
  │   ├── package.json          # Backend dependencies and scripts
  │   └── tsconfig.json         # TypeScript configuration for backend
  ├── frontend/                 # Frontend code
  │   ├── src/
  │   │   ├── common/           # constants, enums, etc.
  │   │   ├── components/       # Reusable components
  │   │   ├── pages/            # Page components
  │   │   ├── services/         # API service functions
  │   │   ├── utils/            # Utility functions
  │   │   ├── App.tsx           # Main App component
  │   │   └── main.tsx          # Entry point for the frontend app
  │   ├── public/               # Public assets
  │   ├── package.json          # Frontend dependencies and scripts
  │   ├── tsconfig.ts           # TypeScript configuration for frontend
  │   └── vite.config.ts        # Vite configuration
  ├── docker-compose.yml        # Docker Compose configuration (optional)
  └── README.md                 # Project README
  ```

## API Endpoints
  ### GET /api/dashboards
  Fetch all dashboards.

  ### GET /api/charts
  Fetch all charts.

  ### GET /api/charts/:id
  Fetch chart data by chart ID with optional query parameters for start/end dates.

  #### Query Parameters
  startDate: Start date for the data range.
  endDate: End date for the data range.

## License
This project is licensed under the MIT License.

