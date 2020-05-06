# ChooseForMe-DiscordBot
 A discord bot choosing a game to play from a given list. For indecisive friends!

## Startup
```
sudo apt-get install node
npm install
node bot.js
```

## Run at startup (Linux)
```
sudo cp chooseforme-discordbot.service /etc/systemd/system/chooseforme-discordbot.service
sudo systemctl daemon-reload
sudo systemctl enable chooseforme-discordbot.service
sudo systemct start chooseforme-discordbot.service
```
