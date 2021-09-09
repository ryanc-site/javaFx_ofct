@echo off
set service_name="ryanc-site"
echo --------------------------------【start.bat】-------------------------------->>bat.log
:check
:: 判断本机当前用户啊下进程标题为 "ryanc-site-1.0"的进程是否存在
echo %date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%----【%service_name%】----Verifying service activity...>>bat.log
wmic process where caption="javaw.exe" get processid, commandline /value >java_process.txt

type java_process.txt | find "ryanc-site"

::如果退出代码为1(不成功)，跳到1处执行；否则执行0.
if errorlevel 1 goto 1
if errorlevel 0 goto 0


:0
echo %date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%----【%service_name%】----The service already exists.>>bat.log
for /f "tokens=3,4" %%a in ('"reg query HKEY_CLASSES_ROOT\http\shell\open\command"') do (set SoftWareRoot=%%a %%b)
start "" % SoftWareRoot % "http://localhost:8080/"
echo %date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%----Directly drive the default browser to open the service:“http://localhost:8080/”>>bat.log
goto exit

:1
echo %date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%----【%service_name%】----The service does not exist.>>bat.log
echo %date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%----【%service_name%】----The service is restarting...>>bat.log
call run.bat
echo %date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%----【%service_name%】----The service is started ！！！>>bat.log
::延时5秒，以确保服务成功启动
ping 127.0.0.1 -n 5 >nul
wmic process where caption="javaw.exe" get processid, commandline /value >java_process.txt
::使用默认浏览器打开目标服务
for /f "tokens=3,4" %%a in ('"reg query HKEY_CLASSES_ROOT\http\shell\open\command"') do (set SoftWareRoot=%%a %%b)
start "" % SoftWareRoot % "http://localhost:8080/"
echo %date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%----Start driving the default browser to open the service:“http://localhost:8080/”>>bat.log
goto exit


:exit
taskkill /f /im ofct.exe
exit 0
