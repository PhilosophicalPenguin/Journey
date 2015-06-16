# To run this file, enter the code below from the command line:
# sudo scrapy runspider testscrape.py -s USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36" -o june12.json;

import re
import scrapy
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from random import randint
from time import sleep

"""
Creates a Person class to hold scraped data. Corresponds to one LinkedIn profile.
Uses the scrapy.Item class.
Its attributes are scrapy.Field objects.
"""
class Person(scrapy.Item):
	full_name = scrapy.Field()
	headline = scrapy.Field()
	current_title = scrapy.Field()
	current_company = scrapy.Field()
	current_photo_link = scrapy.Field()
	location = scrapy.Field()
	industry = scrapy.Field()
	skills = scrapy.Field()
	educationList = scrapy.Field()
	past_experience_list = scrapy.Field()
	url = scrapy.Field()
	current_position_start_date = scrapy.Field()


###Creates a CrawlSpider called PersonScraper
class PersonScraper(CrawlSpider):
	USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36"
	name = 'personSpy'
	allowed_domains = ['linkedin.com']
	start_urls = [ 'https://www.linkedin.com/pub/matthew-deland/2a/5aa/9b6',
  'https://www.linkedin.com/in/yinlou',
  'https://www.linkedin.com/in/weiden',
  'https://www.linkedin.com/pub/piero-ferrante/91/106/535',
  'https://www.linkedin.com/in/sumandebroy',
  'https://www.linkedin.com/pub/trent-hauck/23/3bb/725',
  'https://www.linkedin.com/pub/tomer-tal/64/7a8/112',
  'https://www.linkedin.com/in/mcanearm',
  'https://www.linkedin.com/pub/ben-link/1a/598/45a',
  'https://www.linkedin.com/in/franciscojavierarceo',
  'https://www.linkedin.com/in/maisamwasti',
  'https://www.linkedin.com/pub/vinayak-javaly/6/412/37a',
  'https://www.linkedin.com/pub/siqi-chen/12/357/45',
  'https://www.linkedin.com/in/benjaminarai',
  'https://www.linkedin.com/in/helenaxwang',
  'https://www.linkedin.com/in/souravdeymit',
  'https://www.linkedin.com/in/sabazuberi',
  'https://www.linkedin.com/pub/gabriel-gaster/19/969/a31',
  'https://www.linkedin.com/pub/neeraj-gaur/a/497/43',
  'https://www.linkedin.com/pub/tong-lu/41/155/a74',
  'https://www.linkedin.com/in/adgaudio',
  'https://www.linkedin.com/in/atibaup',
  'https://www.linkedin.com/in/wtylerjorgensen',
  'https://www.linkedin.com/in/alexpjones',
  'https://www.linkedin.com/in/lijenniferx',
  'https://www.linkedin.com/pub/situo-liu/38/42a/5b8',
  'https://www.linkedin.com/pub/addhyan-pandey/30/a9/2a0',
  'https://www.linkedin.com/in/jeffakolb',
  'https://www.linkedin.com/pub/derek-gossi/a1/45a/45b',
  'https://www.linkedin.com/in/jbmunro4',
  'https://www.linkedin.com/in/georgebdavis',
  'https://www.linkedin.com/pub/viktoria-rojkova/12/a74/10',
  'https://www.linkedin.com/pub/ben-hamner/12/597/987',
  'https://www.linkedin.com/pub/richard-chiles/2/471/2b1',
  'https://www.linkedin.com/in/bgawalt',
  'https://www.linkedin.com/pub/can-jin/40/124/23a',
  'https://www.linkedin.com/pub/ashin-mukherjee/35/87b/29',
  'https://www.linkedin.com/in/jmartineau',
  'https://www.linkedin.com/pub/serge-berger/25/3bb/93',
  'https://www.linkedin.com/in/andrescorradaemmanuel',
  'https://www.linkedin.com/in/sarahaerni',
  'https://www.linkedin.com/in/aaronbeach',
  'https://www.linkedin.com/in/michaellimhk',
  'https://www.linkedin.com/pub/miaoqing-fang-phd/3b/190/2a2',
  'https://www.linkedin.com/in/weixiangchen',
  'https://www.linkedin.com/pub/baoning-wu/2/106/54a',
  'https://www.linkedin.com/in/mikekuhlen',
  'https://www.linkedin.com/in/ahnagirshick',
  'https://www.linkedin.com/pub/nicholas-arcolano/50/61b/37b',
  'https://www.linkedin.com/in/stephenswedish',
  'https://www.linkedin.com/pub/kyle-polich/3/719/504',
  'https://www.linkedin.com/in/jwei512',
  'https://www.linkedin.com/in/alokgupta83',
  'https://www.linkedin.com/in/hanswolters',
  'https://www.linkedin.com/pub/paul-stolorz/0/92/915',
  'https://www.linkedin.com/pub/trevor-brennan/46/976/702',
  'https://www.linkedin.com/in/jothiperiasamy',
  'https://www.linkedin.com/in/giovanniseni',
  'https://www.linkedin.com/in/jessestcharles',
  'https://www.linkedin.com/in/lwmsphd',
  'https://www.linkedin.com/pub/nick-berry/0/138/337',
  'https://www.linkedin.com/in/rohitsp',
  'https://www.linkedin.com/in/pinardonmez',
  'https://www.linkedin.com/pub/john-lee/17/564/161',
  'https://www.linkedin.com/in/derekjychang',
  'https://www.linkedin.com/in/jeffreyfossett',
  'https://www.linkedin.com/pub/nuria-garcia/20/726/57',
  'https://www.linkedin.com/pub/rajen-subramanian-athreya-phd/3/.../938',
  'https://www.linkedin.com/in/viethathuc',
  'https://www.linkedin.com/in/yidewang',
  'https://www.linkedin.com/in/archanaramesh',
  'https://www.linkedin.com/in/hankssteve',
  'https://www.linkedin.com/in/jeffheaton',
  'https://www.linkedin.com/pub/claudia-gold/25/4ab/423',
  'https://www.linkedin.com/in/justinparrella',
  'https://www.linkedin.com/in/kirkdborne',
  'https://www.linkedin.com/pub/david-bayliss/a/556/426',
  'https://www.linkedin.com/pub/aparna-kumar/85/836/8b4',
  'https://www.linkedin.com/in/dclambert',
  'https://www.linkedin.com/in/piccolbo',
  'https://www.linkedin.com/pub/arash-asadi/1b/bb0/665',
  'https://www.linkedin.com/pub/alexandra-ressler/5/bb8/913',
  'https://www.linkedin.com/in/derekfarren',
  'https://www.linkedin.com/pub/siwei-zhu/41/509/57a',
  'https://www.linkedin.com/in/randalolson',
  'https://www.linkedin.com/in/randalhenne',
  'https://www.linkedin.com/pub/adam-cornille/b/689/8aa',
  'https://www.linkedin.com/in/drcarlanderson',
  'https://www.linkedin.com/in/abelindsey',
  'https://www.linkedin.com/in/shawndr',
  'https://www.linkedin.com/pub/lance-martin/5/33b/64a',
  'https://www.linkedin.com/in/michaelradwin',
  'https://www.linkedin.com/pub/emma-zohner/5/206/45a',
  'https://www.linkedin.com/in/weihanupenn',
  'https://www.linkedin.com/in/andrewjkoo',
  'https://www.linkedin.com/in/zhangvickie',
  'https://www.linkedin.com/pub/kevin-goetsch/91/993/260',
  'https://www.linkedin.com/in/khadershameer',
  'https://www.linkedin.com/in/ivihernandez' ]
  	rules = [Rule(SgmlLinkExtractor(allow=(r'www\.linkedin\.com/pub|www\.linkedin\.com/in/'), deny=(r'www\.linkedin\.com/pub/dir/\?')), callback='parse_person', follow=True)]
	urlCounter = 0


	
	def parse_person(self, response):
		"""
		Returns a single scraped person (i.e. page) to be added to export stream.
		@param self: self
		@param response:response from single page. has method 'xpath' to traverse DOM.
		"""
		person = Person()
		print('urlcounter', PersonScraper.urlCounter)

		#BASIC DATA: FULL NAME, CURRENT COMPANY, TITLE, CURRENT JOB START DATE
		person['full_name'] = response.xpath("//div/div/div/h1/span/span[@class='full-name']/text()").extract()
		person['headline'] = response.xpath("//p[@class='title']/text()").extract()
		person['current_title'] = response.xpath("//div[@class='editable-item section-item current-position']/div/header/h4/a[text()]/text()").extract()
		person['current_company'] = response.xpath("//div[@class='editable-item section-item current-position']/div/header/h5/a[text()]/text()").extract()
		person['current_photo_link'] = response.xpath("//div[@class='profile-picture']/a/img/@src").extract()
		person['current_position_start_date'] = response.xpath("//div[@class='editable-item section-item current-position']/div/span[@class='experience-date-locale']/time/text()").extract()
		if person['current_position_start_date'] == []:
			person['current_position_start_date'] = [""]
		person['current_position_start_date'][0] = person['current_position_start_date'][0]


		#Sets URL for person to the URL returned from server.
		person['url'] = response.url
		

		#Instantiates list of past experiences.
		person['past_experience_list'] = []

		#Instantiates and populates list of skills (strings).
		person['skills'] = response.xpath("//a[@class='endorse-item-name-text']/text()").extract()


		
		#Sets location.
		person['location'] = response.xpath("//div[@id='location-container']/div[@id='location']/dl/dd[1]/span[@class='locality']/text()").extract()


		#Sets current industry.
		person['industry'] = response.xpath("//dd[@class='industry']/text()").extract()


		#Extracts list of prevous experiences.
		experiencesss = response.xpath("//div[@id='background-experience']/div[@class!='editable-item section-item current-position']/div")

		#Loops over all previous experiences and adds them to final list. 
		for experience in experiencesss:
			
			#initialize experience dictionary to be added to experience list
			tempExperience = {}

			#list of previous titles
			titleList = experience.xpath('header/h4/a/text()').extract()
			if titleList == []:
				titleList = [""]
			title = titleList[0].encode("utf8")
			tempExperience["title"] = title

			#list of previous companies
			companiesList = experience.xpath('(header/h5/a/text())|(header/h5/span/text())').extract()
			if companiesList == []:
				companiesList = [""]
			companyValue = companiesList[0].encode("utf8")
			tempExperience["company"] = companyValue

			#list of dates they worked there
			dateList = experience.xpath('span/time/text()').extract()
			if dateList == []:
				dateList = [""]
			date1 = dateList[0].encode("utf8")
			date2 = dateList[1].encode("utf8")
			tempExperience["start_date"] = date1
			tempExperience["end_date"] = date2

			tempExperience["duration"] = (experience.xpath('span/text()').extract())[1].encode("utf8")[2:-1]

			# adds one experience to experience list.
			person['past_experience_list'].append(tempExperience)

		#Instantiates empty education list.
		person['educationList'] = []

		#Extracts all previous educations. 
		educationsss = response.xpath("//div[@id='background-education']/div/div/div")


		for education in educationsss:

			#initialize education dictionary to be added to education list
			tempEducation = {}

			#list of schools containing only one item
			schoolValueList = education.xpath('(header/h4/a/text())|(header/h4/text())').extract()
			if schoolValueList == []:
				schoolValueList = [""]
			schoolValue = schoolValueList[0].encode("utf-8")
			#adds school to education dictionary
			tempEducation["school"] = schoolValue
			print(tempEducation["school"])

			majorValueList = education.xpath('header/h5/span[@class="major"]/a/text()').extract()
			if majorValueList == []:
				majorValueList = [""]
			majorValue = majorValueList[0].encode("utf-8")
			tempEducation["major"] = majorValue

			degreeValueList = education.xpath('header/h5/span[@class="degree"]/text()').extract()
			if degreeValueList == []:
				degreeValueList = [""]
			degreeValue = degreeValueList[0].encode("utf-8")
			degreeValue = degreeValue.replace(", ", "")
			tempEducation["degree"] = degreeValue

			degreeYears = education.xpath('span[@class="education-date"]/time/text()').extract()
			if degreeYears == []:
				tempEducation["start_date"] = ""
				tempEducation["end_date"] = ""
			else:
				time1 = degreeYears[0].encode("utf-8")
				time2 = degreeYears[1].encode("utf-8")[-4:]
				tempEducation["start_date"] = time1
				tempEducation["end_date"] = time2

			person['educationList'].append(tempEducation)

		#throttling
		sleep(randint(1,4))

		PersonScraper.urlCounter+=1
		return person