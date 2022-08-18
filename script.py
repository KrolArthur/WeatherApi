#import Adafruit_DHT
import time
import requests
from geopy.geocoders import Nominatim
from pprint import pprint

def getSerial():
  # Extract serial from cpuinfo file
  cpuserial = "0000000000000000"
  try:
    f = open('/proc/cpuinfo','r')
    for line in f:
      if line[0:6]=='Serial':
        cpuserial = line[10:26]
    f.close()
  except:
    cpuserial = "ERROR000000000"
  return cpuserial

#DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 4

check_device_url = "http://s17728inz.pl/device.php"

register_device_url = "http://s17728inz.pl/registerdevice.php"

uniqueSerial = getSerial()
print(uniqueSerial)

city = ""
country = ""

#existance_check = requests.post(check_device_url, data = {'city': city, 'country': country})

#if(existance_check.text == "0"):
app = Nominatim(user_agent="user")
location = app.geocode(city +", "+ country)
print('here')
print(location)
    #requests.post(register_device_url, data = {
    #   'city': city,
    #    'country': country,
    #    'longitude': location['lon'],
    #    'latitude': location['lat']
    #})

#while True:
    #humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

#    if humidity is not None and temperature is not None: 
#        print("Temp={0:0.1f}*C  Humidity={1:0.1f}%".format(temperature, humidity))
#    else:
#        print("Failed to retrieve data from humidity sensor")
        
#    time.sleep(10)
    
