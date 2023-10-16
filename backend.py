import os

try:
  from bottle import post, get, run, request, response, static_file
  from bs4 import BeautifulSoup
  import requests
  import json
  import subprocess
  import os.path
except ImportError:
  os.system("sudo apt install python3-pip python3-bs4 python3-requests --yes")
  os.system("pip install bottle --user --break-system-packages")
  os.system("python3 backend.py")

if not os.path.exists(os.path.expanduser("~/.cache/koyuos")):
  os.makedirs(os.path.expanduser("~/.cache/koyuos"))

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

@get("/favicon/<domain>")
def favicon(domain):
  response.headers["Access-Control-Allow-Origin"] = "*"
  x = requests.get("https://" + domain)
  soup = BeautifulSoup(x.text)
  try:
    favicon = soup.find("link", rel="apple-touch-icon")["href"]
  except:
    favicon = None
  if favicon == None:
    try:
      manifest = soup.find("link", rel="manifest")["href"]
      if manifest.startswith("//"):
        manifest = "https:"+manifest
      if manifest.startswith("/"):
        manifest = "https://"+domain+manifest
      x = requests.get(manifest)
      data = json.loads(x.text)
      favicon = data["icons"][0]["src"]
    except:
      favicon = None
  if favicon == None:
    try:
      x = requests.get("https://" + domain + "/manifest.json")
      data = json.loads(x.text)
      favicon = data["icons"][0]["src"]
      if favicon == None:
        x = requests.get("https://" + domain + "/manifest.webapp")
        data = json.loads(x.text)
        favicon = data["icons"][0]["src"]
    except:
      favicon = None
  if favicon == None:
    try:
      favicon = soup.find("link", rel="shortcut icon")["href"]
    except:
      favicon = None
  if favicon == None:
    favicon = "https://"+domain+"/favicon.ico"
  if favicon.startswith("//"):
    favicon = "https:"+favicon
  if favicon.startswith("/"):
    favicon = "https://"+domain+favicon
  if not favicon.startswith("http"):
    favicon = "https://"+domain+"/"+favicon
  homedir = os.path.expanduser("~")
  iconid = domain.replace(".", "-")
  iconpath =  os.path.join(homedir, ".cache/koyuos/" + iconid + ".png")
  if not os.path.exists(iconpath):
    subprocess.Popen(["wget", favicon, "-O", iconpath]).wait()
  return static_file(iconid + ".png", root=os.path.join(homedir, ".cache/koyuos"))

@get("/launch/<domain>")
def launchdomain(domain):
  os.system("chromium --app=https://" + domain + " --kiosk")
  return "ok"

run(host="localhost", port=8080)
