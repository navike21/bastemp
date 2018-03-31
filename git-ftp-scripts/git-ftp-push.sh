#!/bin/sh

# Par�metros para ejecutar SourceTree Custom Action
# $PATH <ftp username> <ftp password> <ftp path>

REPOSITORY_PATH="$1"  
FTP_USERNAME="$2"
FTP_PASSWORD="$3"
FTP_PATH="$4"

echo "Cambiando el directorio hacia la ra�z del repositorio '$REPOSITORY_PATH'"
cd "$REPOSITORY_PATH"

echo "Colocando los �ltimos cambios hacia '$FTP_PATH' utilizando las credenciales"
/usr/local/bin/git-ftp push -u $FTP_USERNAME -p $FTP_PASSWORD "$FTP_PATH"

exit 0