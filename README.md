# ChooseForMe-DiscordBot
 A discord bot choosing a game to play from a given list. For indecisive friends!

## Startup
```
sudo apt-get install node
npm install
node bot.js
```

## Run at startup (Linux)
1. Edit chooseforme-discordbot.service (instructions are into the file)
2. Run in a terminal:
```
sudo cp chooseforme-discordbot.service /etc/systemd/system/chooseforme-discordbot.service
sudo systemctl daemon-reload
sudo systemctl enable chooseforme-discordbot.service
sudo systemct start chooseforme-discordbot.service
```
