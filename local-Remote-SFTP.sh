# Instructions for syncing a local folder with a remote FTP or SFTP server
# The only requirement is homebrew. To get git-ftp:

brew update && brew install git-ftp

# Initialize a git repo in the directory you want to sync. Track all files, and commit them to your repo:

git init
git add -A && git commit -m "Committed all files"

# Set config options for your FTP server. These config options are added to the git repo:
git config git-ftp.user navikeco
git config git-ftp.url ftp.navike21.com
git config git-ftp.password Server2003
git config git-ftp.syncroot /pruebas
git config git-ftp.insecure 0

# Upload files the first time:
git-ftp init --remote-root home/public/ -vv --syncroot /pruebas

# after the files have been pushed once, updating requires this:
git add -A && git commit -m "Committed all files"
git-ftp push --remote-root home/public/ -vv --syncroot /pruebas


#other options
#git config git-ftp.deployedsha1file mySHA1File
#git config git-ftp.insecure 1
#git config git-ftp.key ~/.ssh/id_rsa
#git config git-ftp.keychain user@example.com
