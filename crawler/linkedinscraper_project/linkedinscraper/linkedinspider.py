import scrapy
from items import Person

class PersonScraper(scrapy.Spider):
	name = "personscraper"
	allowed_domains = ["linkedin.com"]
	start_urls = ['http://www.linkedin.com/in/edoecohen']

	def parse_person(self, response):
		


		# filename = response.url.split("/")[-2]
		# with open(filename, 'wb') as f:
		# 	f.write(response.body)