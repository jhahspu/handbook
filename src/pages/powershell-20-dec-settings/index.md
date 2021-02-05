---
path: "/powershell"
date: "Feb '21"
title: "Powershell Stuff"
author: "jhahspu"
category: "powershell"
---



### Add Windows Terminal to Context Menu

```powershell
# add folder and icon
# wt.reg - created manually on the desktop
# no empty lines
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\Directory\Background\shell\wt]
@="Windows Terminal here..."
"Icon"="C:\\Users\\jhahs\\AppData\\Local\\terminal\\wt_32.ico"
[HKEY_CLASSES_ROOT\Directory\Background\shell\wt\command]
@="C:\\Users\\jhahs\\AppData\\Local\\Microsoft\\WindowsApps\\wt.exe -d ."
```


#####


### Allow Scripts

```powershell
get-executionpolicy
# Restricted
# Options: restricted, unrestricted, remotesigned

set-executionpolicy remotesigned
# [Y]Yes [A]Yes To All [N]No [L]No To All [S]Suspend [?]Help 
```

#####

### Basic Settings

#### Quick Access Toolbar (File Explorer)

- open file explorer
- go to "File" -> "Open Windows Powershell" -> Right click on "Open Windows Powershell as Admin" -> "Add To Quick Access Toolbar"

#### Custom Appearance (Font Size, Colors, etc)

- Right click on title bar and go to Properties

