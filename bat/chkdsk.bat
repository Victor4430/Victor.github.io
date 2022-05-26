@echo on  

for %%1 in (c:) do (if exist %%1 ECHO Y|chkdsk %%1 /f)

@pause