@echo off
set curdir=%cd%
cd %~dp0
cd ../source/server
start "ServerWindow" node server.js
cd %curdir%