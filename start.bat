@echo off
set service_name="ryanc-site"

:check
:: 判断本机当前用户啊下进程标题为 "ryanc-site-1.0"的进程是否存在
wmic process where caption="javaw.exe" get processid, commandline /value >java_process.txt
type java_process.txt | find "ryanc-site"

::如果退出代码为1(不成功)，跳到1处执行；否则执行0.
if errorlevel 1 goto 1
if errorlevel 0 goto 0


:0
echo %service_name% 进程已存在
for /f "tokens=3,4" %%a in ('"reg query HKEY_CLASSES_ROOT\http\shell\open\command"') do (set SoftWareRoot=%%a %%b)
start "" % SoftWareRoot % "http://localhost:8080/"
goto exit

:1
echo %service_name%进程不存在
call run.bat
echo %service_name%已启动
wmic process where caption="javaw.exe" get processid /value >java_process_pid.txt

for /f "tokens=3,4" %%a in ('"reg query HKEY_CLASSES_ROOT\http\shell\open\command"') do (set SoftWareRoot=%%a %%b)
start "" % SoftWareRoot % "http://localhost:8080/"
goto exit

:exit
del java_process.txt
::exit 0
@pause
