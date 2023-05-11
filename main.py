import requests
from bs4 import BeautifulSoup
from time import sleep

url = "https://www.google.com/search?q=dollar+price"
HTML = requests.get(url).content

soup = BeautifulSoup(HTML, 'html.parser')
sleep(2)
dollar = soup.find(class_="DFlfde SwHCTb")
sleep(1)
print("Cotação do dólar hoje:", dollar.text)
