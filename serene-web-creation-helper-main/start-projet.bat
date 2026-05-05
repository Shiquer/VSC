@echo off
setlocal

echo 🔧 Installation des dépendances (npm install)...
call npm install

echo 🚀 Lancement du serveur Vite...
start http://localhost:5173
call npm run dev

pause
endlocal
