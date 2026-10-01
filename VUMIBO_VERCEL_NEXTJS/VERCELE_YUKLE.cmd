@echo off
cd /d "%~dp0"
echo VUMIBO - Vercel production deployment
echo Vercel will ask you to sign in and select a project.
call npx vercel@latest --prod
pause
