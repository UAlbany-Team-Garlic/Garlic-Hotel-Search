@echo off
cd %~dp0
start "ProxyWindow" StartProxy.bat
call StartServer.bat
start "TestWindow" chrome  -process-per-tab --new-window http://localhost:3000/
pause
cd %~dp0
call KillServer.bat
call KillProxy.bat
cd %curdir%