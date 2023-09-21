import os
import sys

try:
  from bottle import post, run, request
except ImportError:
  os.system("sudo apt install python3-pip")
  os.system("pip install bottle")
  os.system("python3 backend.py")

@post("/loaded")
def loaded():
  os.system("killall unclutter")
  return "ok"

@post("/setkbmap")
def setkbmap():
  kbmap = request.forms.get("kbmap")
  os.system("setxkbmap " + kbmap)
  os.system("sudo raspi-config nonint do_keyboard_layout " + kbmap)
  return "ok"

@post("/shutdown")
def shutdown():
  os.system("sudo shutdown -h now")
  return "ok"

@post("/reboot")
def reboot():
  os.system("sudo reboot")

run(host="localhost", port=8080)
