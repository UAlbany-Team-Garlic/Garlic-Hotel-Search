from bs4 import BeautifulSoup
import requests 
import urllib.request
import time
import random
import decimal

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
checkin = checkinyear + '-' + checkinmonth + '-' + checkinday
checkout = checkoutyear + '-' + checkoutmonth + '-' + checkoutday

class Listing:
  def __init__(self, name, price, adults, beds, checkin, checkout, rating, features, imgs):
    self.name = name
    self.price = price
    self.adults = adults
    self.beds = beds
    self.rating = rating
    self.features = features
    self.imgs = imgs
def getData(city, stateOrCountry, adults, beds, checkinyear, checkinmonth, checkinday, checkoutyear,
            checkoutmonth, checkoutday):
        listArg = list()
        urlArg = ('https://www.expedia.com/Hotel-Search?/adults=' + adults + '&beds=' + beds + '&d1=' + checkinyear + '-' + checkinmonth + '-' + checkinday + '/' +
                    '%2F&d2=' + checkoutyear + '-' + checkoutmonth + '-' + checkoutday + '%25&destination=' + city + "%20%28and%20vicinity%29%2C%20"
                         + stateOrCountry + '&sort=RECOMMENDED')
        print (urlArg)
        print("\n\n")
        page = requests.get(urlArg, headers=headers)
        soup = BeautifulSoup(page.text, 'lxml')
        price = soup.findAll('span',{'data-stid': 'content-hotel-lead-price'})
        titles = soup.findAll('h3', class_= 'is-visually-hidden')
        externalLink = soup.findAll('a', {'class': 'listing__link uitk-card-link'})
        #print ('images link length: ', len(externalLink))
        counter = 0
        #print ("LENGTH OF TITLES: ", len(titles))
        #print ("LENGTH OF PRICE: ", len(price))
        loopCounter = 0
        if len(titles) > len(price):
            loopCounter = len(price)
        elif len(titles) < len(price):
            loopCounter = len(titles)
        else:
            loopCounter = len(titles)
        for i in range(loopCounter):
            externalLink[i]['href'] = 'https://expedia.com' + externalLink[i]['href']
            listArg.append(Listing(titles[i].text, price[i].text, adults, beds, checkin, checkout, random.uniform(4.0, 4.6), getFeatures(), externalLink[i]['href']))
        #printData(listArg)
        return (listArg)

def printData(list):
    for item in list:
        print (item.name + "\n" + item.price + "\n" + str(round(item.rating, 1)) + "\n" + str(item.features) + '\n' + item.imgs + "\n\n")

def getFeatures():
    features = ['In-Room Amenities', 'Free Breakfast', 'Fitness Center', 'Free Wifi',
            'Coffee Kits', 'Mobile Check-In', 'Tennis Courts', 'Basketball Court', 'Recreational Acitivites']    
    randomList = list()
    featureList = list()
    randomList = random.sample(range(0, 8), 4)
    for item in randomList:
        featureList.append(features[item])
    return (featureList)

hotelList = getData(city, stateOrCountry, adults, beds, checkinyear, checkinmonth, checkinday, checkoutyear,
            checkoutmonth, checkoutday)
printData(hotelList)