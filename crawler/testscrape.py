# sudo scrapy runspider testscrape.py -s USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36" -o MasterJSON.json;

import re
import scrapy
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from random import randint
from time import sleep

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


class PersonScraper(CrawlSpider):
	USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36"
	name = 'personSpy'
	allowed_domains = ['linkedin.com']
	start_urls = ['https://www.linkedin.com/in/minnaking',
  'https://www.linkedin.com/in/dsingh',
  'https://www.linkedin.com/in/michaeljgardea',
  'https://www.linkedin.com/in/mickdudleyjohnson',
  'https://www.linkedin.com/in/bmauney',
  'https://www.linkedin.com/in/seanplynch',
  'https://www.linkedin.com/pub/rousseau-kazi/20/259/7b8',
  'https://www.linkedin.com/in/sippey',
  'https://www.linkedin.com/pub/ryan-singer/2b/159/994',
  'https://www.linkedin.com/in/markchang',
  'https://www.linkedin.com/in/aparnacd',
  'https://www.linkedin.com/pub/garima-sinha/9/3b1/9b3',
  'https://www.linkedin.com/in/nitinjulka',
  'https://www.linkedin.com/in/jeannalee',
  'https://www.linkedin.com/in/lcholmes',
  'https://www.linkedin.com/in/elizabethburstein',
  'https://www.linkedin.com/in/gustafalstromer',
  'https://www.linkedin.com/in/jeffreysharris',
  'https://www.linkedin.com/in/chelseytanaka',
  'https://www.linkedin.com/pub/peter-birch/1/b59/568',
  'https://www.linkedin.com/in/dshapero',
  'https://www.linkedin.com/in/zalzally',
  'https://www.linkedin.com/in/nicoposner',
  'https://www.linkedin.com/in/kumareshp',
  'https://www.linkedin.com/in/sarahtavel',
  'https://www.linkedin.com/in/catherineshyu',
  'https://www.linkedin.com/in/dforrester',
  'https://www.linkedin.com/pub/mat-mullen/7/353/a02',
  'https://www.linkedin.com/in/srothmuller',
  'https://www.linkedin.com/in/srikanthmnaidu',
  'https://www.linkedin.com/in/jocelynmangan',
  'https://www.linkedin.com/in/dvdkm',
  'https://www.linkedin.com/in/sanazahari',
  'https://www.linkedin.com/pub/brandon-savage/3/889/231',
  'https://www.linkedin.com/in/productmanagercalifornia',
  'https://www.linkedin.com/in/jasontoff',
  'https://www.linkedin.com/in/kartikrao',
  'https://www.linkedin.com/pub/madhu-prabaker/0/3b6/9bb',
  'https://www.linkedin.com/in/johnloof',
  'https://www.linkedin.com/in/dweekly',
  'https://www.linkedin.com/in/jppark',
  'https://www.linkedin.com/in/andriheidar',
  'https://www.linkedin.com/in/curtjohnson',
  'https://www.linkedin.com/in/danielayele',
  'https://www.linkedin.com/in/lizreaveswalker',
  'https://www.linkedin.com/in/merci',
  'https://www.linkedin.com/pub/paul-karayan/7/952/601',
  'https://www.linkedin.com/in/maxkirsch',
  'https://www.linkedin.com/in/salgar',
  'https://www.linkedin.com/in/jchang1',
  'https://www.linkedin.com/pub/matt-schnitt/55/753/941',
  'https://www.linkedin.com/in/reevethompson',
  'https://www.linkedin.com/in/jgolden',
  'https://www.linkedin.com/in/maxhaltman',
  'https://www.linkedin.com/in/roddynegron',
  'https://www.linkedin.com/in/lennyrachitsky',
  'https://www.linkedin.com/in/michaelboeke',
  'https://www.linkedin.com/in/stephanieteng',
  'https://www.linkedin.com/in/djhalliday',
  'https://www.linkedin.com/in/deepthim',
  'https://www.linkedin.com/pub/leili-baghaei-rad/15/735/379',
  'https://www.linkedin.com/in/stephenchau',
  'https://www.linkedin.com/in/stevenjlee',
  'https://www.linkedin.com/in/ragavansrinivasan',
  'https://www.linkedin.com/in/andrewjchang1',
  'https://www.linkedin.com/in/iylee',
  'https://www.linkedin.com/in/iamdeepa',
  'https://www.linkedin.com/in/vidyachandra',
  'https://www.linkedin.com/in/calvinclee',
  'https://www.linkedin.com/in/stedjamulia']	
  	rules = [Rule(SgmlLinkExtractor(allow=(r'/in/dsingh|/in/michaeljgardea|/in/mickdudleyjohnson|/in/bmauney|/in/seanplynch|/pub/rousseau-kazi/20/259/7b8|/in/sippey|/pub/ryan-singer/2b/159/994|/in/markchang|/in/aparnacd|/pub/garima-sinha/9/3b1/9b3|/in/nitinjulka|/in/jeannalee|/in/lcholmes|/in/elizabethburstein|/in/gustafalstromer|/in/jeffreysharris|/in/chelseytanaka|/pub/peter-birch/1/b59/568|/in/dshapero|/in/zalzally|/in/nicoposner|/in/kumareshp|/in/sarahtavel|/in/catherineshyu|/in/dforrester|/pub/mat-mullen/7/353/a02|/in/srothmuller|/in/srikanthmnaidu|/in/jocelynmangan|/in/dvdkm|/in/sanazahari|/pub/brandon-savage/3/889/231|/in/productmanagercalifornia|/in/jasontoff|/in/kartikrao|/pub/madhu-prabaker/0/3b6/9bb|/in/johnloof|/in/dweekly|/in/jppark|/in/andriheidar|/in/curtjohnson|/in/danielayele|/in/lizreaveswalker|/in/merci|/pub/paul-karayan/7/952/601|/in/maxkirsch|/in/salgar|/in/jchang1|/pub/matt-schnitt/55/753/941|/in/reevethompson|/in/jgolden|/in/maxhaltman|/in/roddynegron|/in/lennyrachitsky|/in/michaelboeke|/in/stephanieteng|/in/djhalliday|/in/deepthim|/pub/leili-baghaei-rad/15/735/379|/in/stephenchau|/in/stevenjlee|/in/ragavansrinivasan|/in/andrewjchang1|/in/iylee|/in/iamdeepa|/in/vidyachandra|/in/calvinclee|/in/stedjamulia')), callback='parse_person', follow=False)]
	urlCounter = 0

	def parse_person(self, response):
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
		person['current_position_start_date'][0] = int(re.search(r'\d+', person['current_position_start_date'][0]).group())


		#URL
		person['url'] = response.url
		

		#PAST EXPERIENCES
		person['past_experience_list'] = []
		person['skills'] = response.xpath("//a[@class='endorse-item-name-text']/text()").extract()


		
		#LOCATION
		person['location'] = response.xpath("//div[@id='location-container']/div[@id='location']/dl/dd[1]/span[@class='locality']/text()").extract()

		#INDUSTRY
		person['industry'] = response.xpath("//dd[@class='industry']/text()").extract()


		#EXPERIENCE

		experiencesss = response.xpath("//div[@id='background-experience']/div[@class!='editable-item section-item current-position']/div")

		for experience in experiencesss:

			# print("ONE RUNNNNNNNNNN")
			
			#initialize experience dictionary to be added to education list
			tempExperience = {}

			#list of titles
			titleList = experience.xpath('header/h4/a/text()').extract()
			if titleList == []:
				titleList = [""]
			title = titleList[0].encode("utf8")
			tempExperience["title"] = title

			#list of companies
			companiesList = experience.xpath('(header/h5/a/text())|(header/h5/span/text())').extract()
			if companiesList == []:
				companiesList = [""]
			companyValue = companiesList[0].encode("utf8")
			tempExperience["company"] = companyValue

			#dates
			dateList = experience.xpath('span/time/text()').extract()
			if dateList == []:
				dateList = [""]
			date1 = dateList[0].encode("utf8")
			date2 = dateList[1].encode("utf8")
			tempExperience["start_date"] = date1
			tempExperience["end_date"] = date2

			tempExperience["duration"] = (experience.xpath('span/text()').extract())[1].encode("utf8")[2:-1]

			# print tempExperience
			person['past_experience_list'].append(tempExperience)

		#EDUCATION
		person['educationList'] = []
		educationsss = response.xpath("//div[@id='background-education']/div/div/div")

		print("this many educations:", len(educationsss))
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

		sleep(randint(1,3))

		PersonScraper.urlCounter+=1
		return person




# //div[@class='full-name']