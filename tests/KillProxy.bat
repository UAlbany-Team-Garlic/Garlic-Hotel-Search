@echo off
set curdir=%cd%
cd %~dp0
taskkill /fi "WindowTitle eq npm"
cd %curdir%