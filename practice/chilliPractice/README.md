
install

```
sudo add-apt-repository ppa:tomtomtom/yt-dlp    # Add ppa repo to apt
sudo apt update                                 # Update package list
sudo apt install yt-dlp                         # Install yt-dlp
```

update

`yt-dlp -U`

run (m4a format)

uncomment bit we need in download.sh

```
./download.sh https://www.youtube.com/watch?v=AzrfJws6l_o elkriver
```

# sync

sync audio files and create list

`./sync.sh`

# deploy

`yarn deploy`
