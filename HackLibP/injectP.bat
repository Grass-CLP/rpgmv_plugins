@echo off
SET injectFile=injectCode.js
SET injectedStrFind=hackBasePath
SET targetFile=..\www\index.html

if not exist %targetFile% (
    goto :Targetnotexist
)

findstr /r %injectedStrFind% "%targetFile%"  >NUL 2>NUL
IF %ERRORLEVEL%==0 (
    goto :alreadyInjected 
)
ATTRIB -R -S -H "%targetFile%"
for /f "delims=" %%i in (%injectFile%) do (
    echo %%i >> %targetFile%
)

echo Inject successful.
pause
goto :EOF

:targetFileNotExist
echo targetFileExist
pause
goto :EOF
:alreadyInjected
echo alreadyInjected
pause
goto :EOF
:Targetnotexist
echo Inject Target not exist.
pause
goto :EOF