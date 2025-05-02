# sync_syntapp.ps1
$proyecto = "C:\Users\ygonzalez\Desktop\Syntapp"
$repo = "https://github.com/yuber26/syntapp-crm"

Push-Location $proyecto

Write-Host ""
Write-Host "== Proyecto Syntapp CRM =="
Write-Host "Repositorio remoto: $repo"
Write-Host "Ubicación actual: $PWD"
Write-Host ""

if (-not (Test-Path ".git")) {
    Write-Host "Este directorio no es un repositorio Git. Abortando."
    Read-Host -Prompt "Presiona ENTER para salir"
    exit
}

git add .

$msg = Read-Host "Escribe el mensaje del commit"
git commit -m "$msg"
git push

Write-Host ""
Write-Host "== Proyecto sincronizado correctamente con GitHub =="
Read-Host -Prompt "Presiona ENTER para cerrar"
Pop-Location
