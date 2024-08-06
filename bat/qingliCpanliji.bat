@echo off
color a
echo 正在清除系统垃圾文件，请稍等......
rd /s /q h:\temp & md h:\temp
del /f /s /q %systemdrive%\*.tmp
del /f /s /q %systemdrive%\*._mp
del /f /s /q %systemdrive%\*.log
del /f /s /q %systemdrive%\*.gid
del /f /s /q %systemdrive%\*.chk
del /f /s /q %systemdrive%\*.old
del /f /s /q %systemdrive%\recycled\*.*
del /f /s /q %windir%\*.bak
del /f /s /q %windir%\prefetch\*.*
rd /s /q %windir%\temp & md %windir%\temp
del /f /q %userprofile%\cookies\*.*
color c
del /f /q %userprofile%\recent\*.*
del /f /s /q "%userprofile%\Local Settings\Temporary Internet Files\*.*"
del /f /s /q "%userprofile%\Local Settings\Temp\*.*"
color e
del /f /s /q "%userprofile%\recent\*.*"
echo ----------------------------- 清除系统垃圾完成！--------------------------------
echo -----------------------又是美好的一天，记得每天最少想老婆一次-------------------
echo. & pause