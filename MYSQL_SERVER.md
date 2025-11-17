# Local MySQL Server (Portable)

I installed the portable MySQL 8.0 server under `mysql/mysql-8.0.40-winx64` so the backend can save data to a real database without needing admin rights or extra software.

## How to start MySQL

1. Open PowerShell **inside this project root**.
2. Run:
   ```powershell
   .\scripts\start-mysql.ps1
   ```
3. The server listens on `localhost:3306`. Keep this window open while you use the app.

## How to stop MySQL

In another PowerShell window:
```powershell
taskkill /F /IM mysqld.exe
```

## Initialize / reset data

If you ever want to recreate the database:

```powershell
taskkill /F /IM mysqld.exe
Remove-Item -Recurse -Force mysql\mysql-8.0.40-winx64\data
.\scripts\start-mysql.ps1          # reinitializes data directory
"mysql\mysql-8.0.40-winx64\bin\mysql.exe" -u root -e "CREATE DATABASE college_management;"
cmd /c "\"mysql\mysql-8.0.40-winx64\bin\mysql.exe\" -u root college_management < database\schema.sql"
cmd /c "\"mysql\mysql-8.0.40-winx64\bin\mysql.exe\" -u root college_management < database\sample_data.sql"
```

## Backend defaults

`backend/config/database.js` already defaults to:
- host: `127.0.0.1`
- user: `root`
- password: *(blank)*
- database: `college_management`

So you don’t need a `.env` file unless you want custom credentials.

## Troubleshooting

- Health check: `http://localhost:3000/api/health`
- If you see `ECONNREFUSED`, start MySQL again with the script.
- You can inspect data using the MySQL client:
  ```powershell
  "mysql\mysql-8.0.40-winx64\bin\mysql.exe" -u root college_management
  ```

