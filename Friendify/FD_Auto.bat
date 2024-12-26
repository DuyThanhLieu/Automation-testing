@REM Friendify AI
@REM cd /d D:\Git\Automation_With_Playwright\Friendify

call npx playwright test FD_Register.spec.js --reporter=line --workers=1
call npx playwright test FD_Login.spec.js --reporter=line --workers=1
call npx playwright test FD_Actions.spec.js --reporter=line --workers=1
