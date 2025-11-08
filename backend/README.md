# Backend API - College Management System

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Database Setup

#### Option A: Using MySQL
1. Install MySQL if not already installed
2. Create database:
   ```sql
   CREATE DATABASE college_management;
   ```
3. Run schema:
   ```bash
   mysql -u root -p college_management < ../database/schema.sql
   ```
4. Insert sample data (optional):
   ```bash
   mysql -u root -p college_management < ../database/sample_data.sql
   ```

#### Option B: Using PostgreSQL
1. Install PostgreSQL if not already installed
2. Create database:
   ```sql
   CREATE DATABASE college_management;
   ```
3. Run schema (modify SQL syntax for PostgreSQL if needed)

### 3. Environment Variables

Create a `.env` file in the `backend` folder:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=college_management

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3000`

### 5. Test Connection

Visit: `http://localhost:3000/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "College Management System API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection
├── controllers/             # (To be created by Person 2 & 3)
├── routes/                  # (To be created by Person 2 & 3)
├── middleware/
│   └── errorHandler.js      # (To be created)
├── models/
│   └── queries.js           # (To be created)
├── utils/
│   └── helpers.js           # (To be created)
├── .env                     # Environment variables (create this)
├── .gitignore
├── package.json
├── README.md
└── server.js                # Entry point
```

## Next Steps

- Person 2 will create CRUD APIs for Students, Faculty, Courses, Departments
- Person 3 will create Enrollments, Dashboard, and Reports APIs

