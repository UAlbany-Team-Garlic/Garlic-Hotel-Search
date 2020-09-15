rem - Update node packages without building frontend

@echo off
echo Starting Setup
set curdir=%cd%

rem - load the required node packages for the backend
cd source/server
echo Installing Backend Dependancies
call npm install

rem - load the required node packages for the frontend
cd ../client
echo Installing Frontend Dependancies
call npm install

cd %curdir%
echo Setup Complete