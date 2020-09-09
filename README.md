# Garlic-Hotel-Search  
```
                    
              ██░░██                  
              ████░░██                
                ██▓▓██                
                ██░░▓▓██              
              ██░░██░░██              
            ██░░░░████░░██            
          ██░░░░░░████░░░░██          
      ████░░░░░░██░░██░░░░░░████      
    ██░░░░░░░░▓▓██░░██▓▓░░░░░░░░██    
  ██░░░░  ░░░░██░░░░░░██░░░░    ░░██                    _ _        
██░░░░  ░░░░▓▓██░░  ░░░░██░░░░    ░░██                   | (_)        
██░░    ░░░░██░░░░  ░░░░▓▓██░░░░  ░░██    __ _  __ _ _ __| |_  ___  
██░░  ░░░░▓▓██░░    ░░░░▓▓██▓▓░░  ░░██   / _` |/ _` | '__| | |/ __|
██░░░░░░░░██░░    ░░░░░░░░▓▓██░░░░░░██  | (_| | (_| | |  | | | (__   
  ██░░░░▓▓██░░    ░░░░░░░░▓▓██▓▓░░██     \__, |\__,_|_|  |_|_|\___| 
  ██▓▓▓▓▓▓██░░░░    ░░░░░░▓▓██▓▓▓▓██      __/ |    
    ██████████░░░░░░░░░░▓▓████████       |___/    
```

## Setup
1. clone the project to your local machine
2. Run `Setup.bat` in the root directory, this will install the node packages needed for the backend
3. There are 3 ways to run the application test, run `tests\Test.bat`, run npm test from the package.json in `source\server`, or use the vs code task `Test Server` found in `.vscode\tasks.json` all of these are just diffrent ways of running `tests\Test.bat`. To test with good debuging tools you need [the VS code extension for chrome debugging](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) and can then use the launch debugging config provided by `.vscode\launch.json`.


## Layout
* **.vscode/ :** VS code tools for advanced debug launching and vs code tasks
* **source/ :** Code for the application
* **source/client/ :** frontend code
* **source/server/ :** backend code
* **source/server/package.json :** npm package controll
* **source/server/server.js :** backend entrypoint
* **tests/ :** scripts for testing the application 
* **.gitignore :** list of files that shoun't be uploaded to github (api keys, node modules)
* **setup.bat :** batch script to set up node packages for the backend
