@echo off & setlocal EnableDelayedExpansion

set obj[0]=2425
set obj[1]=6001
set obj[2]=6001
set obj[3]=21864
set obj[4]=3306

set port=0
set pid=0

for /f "usebackq delims== tokens=1-2" %%a in (`set obj`) do (
    set port=%%b
    for /f "tokens=5" %%m in ('netstat -aon ^| findstr ":%%b"') do (
        set pid=%%m
    )
    if "!pid!"=="0" (
        echo �˿ںš�!port!��û��ռ��
    ) else (
        echo �˿ںš�!port!����ؽ�����ɱ��
        taskkill /f /pid !pid!
    )
    set pid=0
)

pause