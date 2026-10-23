# FitKit Automatic Blog Publisher Reminder Script
try {
    Add-Type -AssemblyName System.Windows.Forms -ErrorAction SilentlyContinue
    Add-Type -AssemblyName System.Drawing -ErrorAction SilentlyContinue
    [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
} catch {}

$antigravityProcesses = Get-Process -Name "*Antigravity*" -ErrorAction SilentlyContinue

$antigravityPath = "D:\Antigravity IDE\Antigravity IDE\Antigravity IDE.exe"
if (-not (Test-Path $antigravityPath)) {
    $antigravityPath = "$env:LOCALAPPDATA\Programs\antigravity\Antigravity.exe"
}

function Show-Toast($header, $body) {
    try {
        $template = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType]::ToastText02)
        $textNodes = $template.GetElementsByTagName("text")
        $textNodes.Item(0).AppendChild($template.CreateTextNode($header)) | Out-Null
        $textNodes.Item(1).AppendChild($template.CreateTextNode($body)) | Out-Null
        $toast = [Windows.UI.Notifications.ToastNotification]::new($template)
        [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier("FitKit Blog Publisher").Show($toast)
    } catch {}
}

if ($antigravityProcesses) {
    # Antigravity is already running smoothly!
    Show-Toast "FitKit Post Ready (9:00 AM)" "Antigravity is currently running. Scheduled article and 3D motion video will be published at 9:00 AM."
} else {
    # Antigravity is NOT running! Sound alarm + show toast + top-most modal dialog
    [System.Media.SystemSounds]::Hand.Play()
    Show-Toast "WARNING: FitKit Publisher Needs Antigravity" "Today is post day! Antigravity is NOT running. Please launch it before 9:00 AM."

    $form = New-Object System.Windows.Forms.Form
    $form.Text = "FitKit Auto-Post Warning"
    $form.Size = New-Object System.Drawing.Size(480, 260)
    $form.StartPosition = "CenterScreen"
    $form.TopMost = $true
    $form.FormBorderStyle = "FixedDialog"
    $form.MaximizeBox = $false
    $form.MinimizeBox = $false
    $form.BackColor = [System.Drawing.Color]::White

    $lblTitle = New-Object System.Windows.Forms.Label
    $lblTitle.Location = New-Object System.Drawing.Point(24, 20)
    $lblTitle.Size = New-Object System.Drawing.Size(420, 32)
    $lblTitle.Font = New-Object System.Drawing.Font("Microsoft YaHei", 12, [System.Drawing.FontStyle]::Bold)
    $lblTitle.Text = "Antigravity is NOT Running!"
    $lblTitle.ForeColor = [System.Drawing.Color]::FromArgb(220, 38, 38)

    $lblBody = New-Object System.Windows.Forms.Label
    $lblBody.Location = New-Object System.Drawing.Point(26, 62)
    $lblBody.Size = New-Object System.Drawing.Size(420, 75)
    $lblBody.Font = New-Object System.Drawing.Font("Microsoft YaHei", 9.5)
    $lblBody.ForeColor = [System.Drawing.Color]::FromArgb(70, 70, 70)
    $lblBody.Text = "Today is post day (9:00 AM). The automated publishing sidecar requires Antigravity to be open.`n`nClick 'Launch Now' to start Antigravity immediately."

    $btnAction = New-Object System.Windows.Forms.Button
    $btnAction.Size = New-Object System.Drawing.Size(200, 42)
    $btnAction.Location = New-Object System.Drawing.Point(240, 155)
    $btnAction.Font = New-Object System.Drawing.Font("Microsoft YaHei", 9.5, [System.Drawing.FontStyle]::Bold)
    $btnAction.Text = "Launch Antigravity Now"
    $btnAction.BackColor = [System.Drawing.Color]::FromArgb(37, 99, 235)
    $btnAction.ForeColor = [System.Drawing.Color]::White
    $btnAction.FlatStyle = "Flat"
    $btnAction.FlatAppearance.BorderSize = 0
    $btnAction.Add_Click({
        if (Test-Path $antigravityPath) { Start-Process -FilePath $antigravityPath }
        $form.Close()
    })

    $btnClose = New-Object System.Windows.Forms.Button
    $btnClose.Size = New-Object System.Drawing.Size(100, 42)
    $btnClose.Location = New-Object System.Drawing.Point(125, 155)
    $btnClose.Font = New-Object System.Drawing.Font("Microsoft YaHei", 9.5)
    $btnClose.Text = "Later"
    $btnClose.BackColor = [System.Drawing.Color]::FromArgb(243, 244, 246)
    $btnClose.ForeColor = [System.Drawing.Color]::FromArgb(55, 65, 81)
    $btnClose.FlatStyle = "Flat"
    $btnClose.FlatAppearance.BorderSize = 0
    $btnClose.Add_Click({ $form.Close() })

    $form.Controls.Add($lblTitle)
    $form.Controls.Add($lblBody)
    $form.Controls.Add($btnAction)
    $form.Controls.Add($btnClose)

    $form.ShowDialog()
}
