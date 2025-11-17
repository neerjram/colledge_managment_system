$base = Join-Path $PSScriptRoot "..\mysql\mysql-8.0.40-winx64"
$data = Join-Path $base "data"
$mysqld = Join-Path $base "bin\mysqld.exe"

if (-not (Test-Path $mysqld)) {
  Write-Host "mysqld.exe not found at $mysqld`nDid you delete the mysql folder?" -ForegroundColor Red
  exit 1
}

# Ensure data directory exists / initialized
if (-not (Test-Path (Join-Path $data "ibdata1"))) {
  & $mysqld --initialize-insecure --basedir=$base --datadir=$data
}

# Start server
Start-Process -FilePath $mysqld `
  -ArgumentList "--basedir=$base","--datadir=$data","--port=3306","--console" `
  -WindowStyle Minimized

Write-Host "MySQL server starting on port 3306..." -ForegroundColor Green

