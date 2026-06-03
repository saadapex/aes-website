# Push the AES website to GitHub. Vercel auto-deploys on push to main.
# Run from PowerShell:  .\deploy.ps1
# Or right-click -> Run with PowerShell.

$ErrorActionPreference = "Stop"

# Make sure we run from the project root regardless of where the script was launched from.
Set-Location -Path $PSScriptRoot

Write-Host "==> Project: $PSScriptRoot" -ForegroundColor Cyan

# 1. Clear any stuck git lock from a previous Windows process.
if (Test-Path ".git\index.lock") {
    Write-Host "==> Removing stale .git/index.lock" -ForegroundColor Yellow
    Remove-Item ".git\index.lock" -Force
}

# 2. Rebuild the index (no-op if already healthy).
Write-Host "==> git reset" -ForegroundColor Cyan
git reset

# 3. Stage everything.
Write-Host "==> git add -A" -ForegroundColor Cyan
git add -A

# 4. Show what we're about to commit and pause for confirmation.
Write-Host "==> git status" -ForegroundColor Cyan
git status

Write-Host ""
$confirm = Read-Host "Commit and push these changes? (y/N)"
if ($confirm -notmatch "^[Yy]") {
    Write-Host "Aborted. Nothing committed or pushed." -ForegroundColor Red
    exit 1
}

# 5. Commit + push. Vercel auto-deploys on push to main.
$msg = "Marketing audit fixes: security headers, per-page OG, stat band, schema upgrades, sticky mobile bar, exit intent, llms-full"
git commit -m $msg
git push origin main

Write-Host ""
Write-Host "==> Push complete. Watch the Vercel build log for the build status:" -ForegroundColor Green
Write-Host "    https://vercel.com/saad-usmanis-projects/aes-website" -ForegroundColor Green
