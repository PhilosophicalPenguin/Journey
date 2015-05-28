import scrapy
from linkedinscraper.items import Person

class PersonScraper(scrapy.Spider):
	name = "personscraper"
	allowed_domains = ["newser.com"]
	start_urls = ['http://www.newser.com/story/207440/bizarre-theft-cow-gallstones.html']

	def parse(self, response):
		filename = response.url.split("/")[-2]
		with open(filename, 'wb') as f:
			f.write(response.body)