## Drawit - R/place inspired collaborative sketchpad

Runs on nodejs, redis and headless chrome on backend. Uses websockets for peer communication.

### Install node modules and redis
```bash
npm install
npm install -g forever
sudo apt-get install redis-server
forever start app.js
```

### Install google chrome
```
cd /tmp
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
sudo apt-get -f install (if chrome didn't install)
```

### Run chrome in headless mode to listen websocket events and save latest image to redis
```
sudo ln -s /opt/google/chrome/chrome /usr/local/bin/chrome
screen chrome --headless --repl --disable-gpu <serveraddress>/local.html
ctrl+a+d to leave screen in background
```
