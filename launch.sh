#!/bin/bash
git pull
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install --lts
npm i
python3 backend.py &
npm run start
