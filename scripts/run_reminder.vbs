Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "powershell.exe -ExecutionPolicy Bypass -File ""D:\my-fitness-blog\scripts\remind_antigravity.ps1""", 0, False
