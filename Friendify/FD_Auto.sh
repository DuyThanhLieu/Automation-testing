#!/bin/bash
# Friendify AI

# Navigate to the directory where the tests are located
# cd /d D:/Git/Automation_With_Playwright/Friendify

# Run the Playwright tests
# npx playwright test FD_Register.spec.js --reporter=line --output=./Results --workers=1
# npx playwright test FD_Login.spec.js --reporter=line --output=./Results --workers=1
# npx playwright test FD_Actions.spec.js --reporter=line --output=./Results --workers=1

# npx playwright test FD_Register.spec.js FD_Login.spec.js FD_Actions.spec.js --headed --reporter=html --output=./Results --workers=1



npx playwright test FD_Register.spec.js FD_Login.spec.js FD_Actions.spec.js --reporter=html --output=./Results --workers=1
 