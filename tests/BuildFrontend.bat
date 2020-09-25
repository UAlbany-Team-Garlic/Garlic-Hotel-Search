@echo off
set curdir=%cd%
cd %~dp0
cd ../source/client
call npm run-script build
cd %curdir%
