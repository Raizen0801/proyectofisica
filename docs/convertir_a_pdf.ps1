# Actualiza el índice y exporta a PDF los documentos Word indicados (requiere Microsoft Word).
# Uso: powershell -File convertir_a_pdf.ps1 Manual_de_usuario.docx Informe_tecnico.docx
param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Archivos)
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
    foreach ($f in $Archivos) {
        $ruta = (Resolve-Path $f).Path
        $doc = $word.Documents.Open($ruta)
        foreach ($t in $doc.TablesOfContents) { $t.Update() }
        $doc.Fields.Update() | Out-Null
        foreach ($t in $doc.TablesOfContents) { $t.Update() }
        $pdf = [System.IO.Path]::ChangeExtension($ruta, '.pdf')
        $doc.SaveAs([ref]$pdf, [ref]17)
        # guardar también el .docx con el índice ya actualizado
        $doc.Save()
        $doc.Close([ref]0)
        Write-Host "OK -> $pdf"
    }
}
finally {
    $word.Quit()
}
