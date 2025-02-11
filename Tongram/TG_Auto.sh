# @REM Tongram

# npx playwright test TG_Cookies.spec.js --reporter=line --workers=1 --headed
# npx playwright test TG_DailyTask.spec.js --reporter=line --workers=1
# npx playwright test TG_VerifyPoint.spec.js --reporter=html,json --output=./Results --workers=1

# npx playwright test TG_Actions.spec.js --reporter=line --workers=1
# npx playwright test TG_Languages.spec.js --reporter=line --workers=1 


#!/bin/bash
echo "Setting up Playwright permissions..."
chmod +x ./node_modules/.bin/playwright
chmod +x TG_Auto.sh
echo "Running Playwright tests..."
npx playwright test TG_Languages.spec.js --reporter=line --workers=1

# npx playwright test TG_DailyTask.spec.js TG_VerifyPoint.spec.js TG_Actions.spec.js TG_Languages.spec.js --headed --reporter=html --output=./Results --workers=1

# npx playwright test TG_DailyTask.spec.js TG_VerifyPoint.spec.js TG_Actions.spec.js TG_Languages.spec.js --reporter=html --output=./Results --workers=1
