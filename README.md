# ChooseForMe-DiscordBot
 A discord bot choosing a game to play from a given list. For indecisive friends!

## Prerequisites
NodeJs can be installed with:
```
sudo apt-get install node
```

## Startup
In the directory of the repo:
```
npm install
npm start
```

## Run at startup (Linux)
1. Edit chooseforme-discordbot.service (more instructions inside)
2. Run in a terminal:
```
sudo cp chooseforme-discordbot.service /etc/systemd/system/chooseforme-discordbot.service
sudo systemctl daemon-reload
sudo systemctl enable chooseforme-discordbot.service
sudo systemct start chooseforme-discordbot.service
```
