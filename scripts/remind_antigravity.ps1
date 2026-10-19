# -*- coding: utf-8 -*-
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

[System.Media.SystemSounds]::Asterisk.Play()

$antigravityProcesses = Get-Process -Name "*Antigravity*" -ErrorAction SilentlyContinue

$antigravityPath = "D:\Antigravity IDE\Antigravity IDE\Antigravity IDE.exe"
if (-not (Test-Path $antigravityPath)) {
    $antigravityPath = "$env:LOCALAPPDATA\Programs\antigravity\Antigravity.exe"
}

if ($antigravityProcesses) {
    # Already running, show a brief informational balloon / toast or small message
    $msg = "今天是发帖日！Antigravity 正在正常运行中。`n`n系统将在 9:00 AM 准时自动生成并发布最新博客文章！"
    [System.Windows.Forms.MessageBox]::Show($msg, "✅ FitKit 自动发帖提醒", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
} else {
    # Not running, prompt user to launch
    $msg = "⏰【FitKit 自动发帖提醒】`n`n今天是发帖日！系统将于 9:00 AM 准时自动写文并发布到网站。`n`n检测到 Antigravity 目前尚未开启。`n是否现在为您立即启动 Antigravity？"
    $result = [System.Windows.Forms.MessageBox]::Show($msg, "⏰ FitKit 自动发帖提醒", [System.Windows.Forms.MessageBoxButtons]::YesNo, [System.Windows.Forms.MessageBoxIcon]::Question)
    
    if ($result -eq [System.Windows.Forms.DialogResult]::Yes) {
        if (Test-Path $antigravityPath) {
            Start-Process -FilePath $antigravityPath
        } else {
            [System.Windows.Forms.MessageBox]::Show("未找到 Antigravity 启动路径，请手动打开桌面图标。", "提示")
        }
    }
}
