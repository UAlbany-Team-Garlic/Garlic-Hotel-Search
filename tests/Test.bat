
cd %~dp0
call StartServer.bat
start "TestWindow" http://localhost:8080/
pause
cd %~dp0
call KillServer.bat
cd %curdir%