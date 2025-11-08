# Database Setup Guide

## Files in this folder:

1. **schema.sql** - Complete database schema with all tables
2. **sample_data.sql** - Sample data for testing
3. **test_queries.sql** - Test queries to verify setup

## Setup Instructions

### Step 1: Create Database

**MySQL:**
```bash
mysql -u root -p
CREATE DATABASE college_management;
EXIT;
```

**PostgreSQL:**
```bash
psql -U postgres
CREATE DATABASE college_management;
\q
```

### Step 2: Run Schema

**MySQL:**
```bash
mysql -u root -p college_management < schema.sql
```

**PostgreSQL:**
```bash
psql -U postgres -d college_management -f schema.sql
```

### Step 3: Insert Sample Data (Optional)

**MySQL:**
```bash
mysql -u root -p college_management < sample_data.sql
```

**PostgreSQL:**
```bash
psql -U postgres -d college_management -f sample_data.sql
```

### Step 4: Test Queries

**MySQL:**
```bash
mysql -u root -p college_management < test_queries.sql
```

**PostgreSQL:**
```bash
psql -U postgres -d college_management -f test_queries.sql
```

## Database Structure

- **departments** - 5 departments (CSE, ECE, ME, CE, EE)
- **students** - 8 sample students
- **faculty** - 6 sample faculty members
- **courses** - 8 sample courses
- **enrollments** - 14 sample enrollments

## Verification

After running test_queries.sql, you should see:
- All tables have data
- JOIN queries return correct results
- Dashboard statistics show correct counts
- Reports queries work correctly

