from bs4 import BeautifulSoup
import requests 
import urllib.request
import time
import random
import decimal
import sys
import json

headers = requests.utils.default_headers()
headers.update({
    'User-Agent': 'My User Agent 1.0',
    'From': 'qwerty@aol.com'
})

city = "Athens"
stateOrCountry = 'Greece'
adults = '2'
beds = '1'
checkinyear = '2020'
checkinmonth = '11'
checkinday = '10'
checkoutyear = '2020'
checkoutmonth = '12'
checkoutday = '28'
#checkin = checkinyear + '-' + checkinmonth + '-' + checkinday
#checkout = checkoutyear + '-' + checkoutmonth + '-' + checkoutday

class Listing:
    def __init__(self, name, price, adults, beds, checkin, checkout, rating, features, imgs, address):
        self.name = name
        self.preTaxNight = price
        self.adults = adults
        self.beds = beds
        self.rating = rating
        self.features = features
        self.imgs = imgs
        self.address = address
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=0)


#method format = (city, stateOrCountry, adults, beds, checkinyear, checkinmonth, checkinday, checkoutyear, checkoutmonth, checkoutday)
def getData():
        listArg = list()
        urlArg = ('https://www.expedia.com/Hotel-Search?adults=' + sys.argv[2] + '&beds=' + sys.argv[3] + '&d1=' + sys.argv[4] + '-' + sys.argv[5] + '-' + sys.argv[6] + '/' + '%2F&d2=' + sys.argv[7] + '-' + sys.argv[8] + '-' + sys.argv[9] + '%25&destination=' + sys.argv[0] + "%20%28and%20vicinity%29%2C%20" + sys.argv[1] + '&sort=RECOMMENDED')
        #print (urlArg)
        #print("\n\n")
        page = requests.get(urlArg, headers=headers)
        soup = BeautifulSoup(page.text, 'lxml')
        price = soup.findAll('span',{'data-stid': 'content-hotel-lead-price'})
        titles = soup.findAll('h3', class_= 'is-visually-hidden')
        externalLink = soup.findAll('a', {'class': 'listing__link uitk-card-link'})
        counter = 0
        loopCounter = 0
        if len(titles) > len(price):
            loopCounter = len(price)
        elif len(titles) < len(price):
            loopCounter = len(titles)
        else:
            loopCounter = len(titles)
        for i in range(0, 10):
            externalLink[i]['href'] = 'https://expedia.com' + externalLink[i]['href']
            listArg.append(Listing(titles[i].text, price[i].text, adults, beds, "", "", random.uniform(4.0, 4.6), getFeatures(), externalLink[i]['href'], getAddress(externalLink[i]['href'])))
        return (listArg)
def getAddress(url):
    page = requests.get(url, headers = headers)
    soup = BeautifulSoup(page.text, 'lxml')
    address = soup.find('div', {'data-stid': 'content-hotel-address'})
    return address.text

def printData(list1):
    data = '{"hotels":['
    for item in list1:
        #data += item.toJSON() + ","
       data += '{"name":"' + item.name + '","preTaxNight":"' + item.preTaxNight + '","rating":"' + str(round(item.rating, 1)) + '","features":' + json.dumps(item.features) + ',"images":"' + item.imgs + '"},' + ',"addresss":"' + item.address + '"},'
    if len(list1) > 0:
        data = data[:-1] + "]"
        data += "}"
    else:
        data += "]}"
    print(data)
    sys.stdout.flush()

def getFeatures():
    features = ['In-Room Amenities', 'Free Breakfast', 'Fitness Center', 'Free Wifi',
            'Coffee Kits', 'Mobile Check-In', 'Tennis Courts', 'Basketball Court', 'Recreational Acitivites']    
    randomList = list()
    featureList = list()
    randomList = random.sample(range(0, 8), 4)
    for item in randomList:
        featureList.append(features[item])
    return (featureList)

hotelList = getData()
printData(hotelList)
