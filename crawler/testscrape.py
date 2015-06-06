# sudo scrapy runspider testscrape.py -s USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36" -o MasterJSON.json;

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


class PersonScraper(CrawlSpider):
	USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36"
	name = 'personSpy'
	allowed_domains = ['linkedin.com']
	start_urls = [ 'https://www.linkedin.com/in/cfuhrman',
  'https://www.linkedin.com/in/danielhw',
  'https://www.linkedin.com/in/susanacdelgadillo',
  'https://www.linkedin.com/in/samkottler',
  'https://www.linkedin.com/pub/paul-weeks/58/8a0/2b1',
  'https://www.linkedin.com/pub/dayong-huang/5/762/598',
  'https://www.linkedin.com/in/reedlauber',
  'https://www.linkedin.com/pub/amber-xu/25/82/732',
  'https://www.linkedin.com/pub/dan-hojnowski/31/581/949',
  'https://www.linkedin.com/in/kevinagao',
  'https://www.linkedin.com/in/kobolog',
  'https://www.linkedin.com/in/gregtaylorcu',
  'https://www.linkedin.com/pub/joshua-forman/21/800/111',
  'https://www.linkedin.com/pub/eric-casteleijn/5a/a9b/516',
  'https://www.linkedin.com/in/grschafer',
  'https://www.linkedin.com/pub/jason-wai-leung-yu/20/1b9/11a',
  'https://www.linkedin.com/pub/tristan-pemble/74/378/47',
  'https://www.linkedin.com/in/alexlewin',
  'https://www.linkedin.com/pub/jad-younan/9/730/958',
  'https://www.linkedin.com/in/padduri',
  'https://www.linkedin.com/pub/ricky-gardiner/36/1b0/963',
  'https://www.linkedin.com/in/bryansocha',
  'https://www.linkedin.com/in/mirzaaasif',
  'https://www.linkedin.com/in/mikephoran',
  'https://www.linkedin.com/in/yonemitsu',
  'https://www.linkedin.com/pub/nilesh-gattani/6/1a2/493',
  'https://www.linkedin.com/in/paulproteus',
  'https://www.linkedin.com/in/gregkufera',
  'https://www.linkedin.com/in/stefanofontanelli',
  'https://www.linkedin.com/pub/robert-jensen/a8/b88/871',
  'https://www.linkedin.com/pub/jeffrey-browning/49/636/a30',
  'https://www.linkedin.com/in/joshuahwagner',
  'https://www.linkedin.com/pub/alvaro-perez-shirley/39/246/63a',
  'https://www.linkedin.com/in/vinch',
  'https://www.linkedin.com/pub/taha-bayrak/12/4b9/6a1',
  'https://www.linkedin.com/in/jasonscheller',
  'https://www.linkedin.com/in/andreisoftwareengineer',
  'https://www.linkedin.com/in/mattmillr',
  'https://www.linkedin.com/pub/matt-krukowski/3a/ba1/126',
  'https://www.linkedin.com/in/acjay',
  'https://www.linkedin.com/pub/robert-mullen/2/ab2/661',
  'https://www.linkedin.com/pub/kevin-jasieniecki/48/895/aa9',
  'https://www.linkedin.com/in/leahculver',
  'https://www.linkedin.com/in/jakefarrell',
  'https://www.linkedin.com/pub/greg-karlin/78/572/388',
  'https://www.linkedin.com/in/andrewlysyk',
  'https://www.linkedin.com/in/jmaia',
  'https://www.linkedin.com/in/drewcsillag',
  'https://www.linkedin.com/pub/jeremy-clark/10/144/86b',
  'https://www.linkedin.com/in/ilkerburak',
  'https://www.linkedin.com/in/jakemcgraw',
  'https://www.linkedin.com/pub/scott-myers/28/a57/347',
  'https://www.linkedin.com/in/caente',
  'https://www.linkedin.com/pub/jp-mcglone/14/130/185',
  'https://www.linkedin.com/pub/fernando-perez/1/43a/166',
  'https://www.linkedin.com/pub/arun-venkatadri/29/53a/1a6',
  'https://www.linkedin.com/pub/greg-robillard/2/6b5/10',
  'https://www.linkedin.com/pub/yw-x/18/458/520?trk=pub-pbmap',
  'https://www.linkedin.com/pub/seth-hochberg/42/5a7/a52',
  'https://www.linkedin.com/in/nicholasjohnmercer',
  'https://www.linkedin.com/pub/edric-lescouflair/8b/32a/705',
  'https://www.linkedin.com/pub/roey-groen/22/28/a92',
  'https://www.linkedin.com/in/mattmontag',
  'https://www.linkedin.com/in/guyargo',
  'https://www.linkedin.com/in/ruhulamin1',
  'https://www.linkedin.com/pub/alex-zhang/42/aa1/212',
  'https://www.linkedin.com/pub/michael-young/8a/854/611',
  'https://www.linkedin.com/in/scorlosquet',
  'https://www.linkedin.com/pub/man-xiong/a/119/b90',
  'https://www.linkedin.com/in/brcwade',
  'https://www.linkedin.com/in/johnhaugeland',
  'https://www.linkedin.com/pub/trevor-assaf/33/a45/339',
  'https://www.linkedin.com/in/antonsmolich',
  'https://www.linkedin.com/pub/phil-opaola/66/741/b81',
  'https://www.linkedin.com/in/jlduprat',
  'https://www.linkedin.com/in/lzhou2',
  'https://www.linkedin.com/pub/vijay-mysore/4b/768/859',
  'https://www.linkedin.com/pub/nicholas-van-wiggeren/28/445/854',
  'https://www.linkedin.com/in/aabhassharma',
  'https://www.linkedin.com/in/sonalipandey',
  'https://www.linkedin.com/pub/pierre-davidoff/5/964/751',
  'https://www.linkedin.com/pub/ravi-agarwal/13/a4/a61',
  'https://www.linkedin.com/in/angiboustanthony',
  'https://www.linkedin.com/in/ianeure',
  'https://www.linkedin.com/pub/bram-avontuur/12/282/302',
  'https://www.linkedin.com/in/skyla',
  'https://www.linkedin.com/in/fuziontech',
  'https://www.linkedin.com/in/andreamariotti' ]	
  	rules = [Rule(SgmlLinkExtractor(allow=(r'/in/danielhw|/in/susanacdelgadillo|/in/samkottler|/pub/paul-weeks/58/8a0/2b1|/pub/dayong-huang/5/762/598|/in/reedlauber|in/davidarcos|/pub/amber-xu/25/82/732|/pub/dan-hojnowski/31/581/949|/in/kevinagao|/in/kobolog|/in/gregtaylorcu|/pub/joshua-forman/21/800/111|/pub/eric-casteleijn/5a/a9b/516|/in/grschafer|/pub/jason-wai-leung-yu/20/1b9/11a|/pub/tristan-pemble/74/378/47|/in/alexlewin|/pub/jad-younan/9/730/958|/in/padduri|/pub/ricky-gardiner/36/1b0/963|/in/bryansocha|/in/mirzaaasif|/in/mikephoran|/in/yonemitsu|/pub/nilesh-gattani/6/1a2/493|/in/paulproteus|/in/gregkufera|/in/stefanofontanelli|/pub/robert-jensen/a8/b88/871|/pub/jeffrey-browning/49/636/a30|/in/joshuahwagner|/pub/alvaro-perez-shirley/39/246/63a|/in/vinch|/pub/taha-bayrak/12/4b9/6a1|/in/jasonscheller|/in/andreisoftwareengineer|/in/mattmillr|in/ddfreyne|/pub/matt-krukowski/3a/ba1/126|/in/acjay|/pub/robert-mullen/2/ab2/661|/pub/kevin-jasieniecki/48/895/aa9|/in/leahculver|/in/jakefarrell|/pub/greg-karlin/78/572/388|/in/andrewlysyk|/in/jmaia|/in/drewcsillag|/pub/jeremy-clark/10/144/86b|/in/ilkerburak|/in/jakemcgraw|/pub/scott-myers/28/a57/347|/in/caente|/pub/jp-mcglone/14/130/185|/pub/fernando-perez/1/43a/166|/pub/arun-venkatadri/29/53a/1a6|/pub/greg-robillard/2/6b5/10|/pub/yw-x/18/458/520?trk=pub-pbmap|/pub/seth-hochberg/42/5a7/a52|pub/yulia-lev/1/b67/b3|/in/nicholasjohnmercer|/pub/edric-lescouflair/8b/32a/705|/pub/roey-groen/22/28/a92|/in/mattmontag|in/ismaeldeesteban|/in/guyargo|in/hwasungmars|/in/ruhulamin1|/pub/alex-zhang/42/aa1/212|/pub/michael-young/8a/854/611|/in/scorlosquet|/pub/man-xiong/a/119/b90|in/smoya|in/omidaladini|/in/brcwade|/in/johnhaugeland|/pub/trevor-assaf/33/a45/339|/in/antonsmolich|/pub/phil-opaola/66/741/b81|/in/jlduprat|/in/lzhou2|/pub/vijay-mysore/4b/768/859|/pub/nicholas-van-wiggeren/28/445/854|/in/aabhassharma|/in/sonalipandey|/pub/pierre-davidoff/5/964/751|/pub/ravi-agarwal/13/a4/a61|/in/angiboustanthony|/in/ianeure|/pub/bram-avontuur/12/282/302|/in/skyla|/in/fuziontech|/in/andreamariotti')), callback='parse_person', follow=False)]
	urlCounter = 0

	def parse_person(self, response):
		person = Person()
		print('urlcounter', PersonScraper.urlCounter)

		#BASIC DATA: FULL NAME, CURRENT COMPANY AND TITLE
		person['full_name'] = response.xpath("//div/div/div/h1/span/span[@class='full-name']/text()").extract()
		person['headline'] = response.xpath("//p[@class='title']/text()").extract()
		person['current_title'] = response.xpath("//div[@class='editable-item section-item current-position']/div/header/h4/a[text()]/text()").extract()
		person['current_company'] = response.xpath("//div[@class='editable-item section-item current-position']/div/header/h5/a[text()]/text()").extract()
		person['current_photo_link'] = response.xpath("//div[@class='profile-picture']/a/img/@src").extract()
		

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