# sudo scrapy runspider testscrape.py -s USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36" -o test_data.json;

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
	start_urls = ['https://www.linkedin.com/pub/ashley-hollan/13/911/27',
  'https://www.linkedin.com/in/keithdfraser',
  'https://www.linkedin.com/pub/charles-prince/6/67/865',
  'https://www.linkedin.com/pub/ed-pierson/b/366/651',
  'https://www.linkedin.com/in/emilylawyer',
  'https://www.linkedin.com/pub/evan-cohen/3/b06/383',
  'https://www.linkedin.com/pub/wallace-collins/3/887/958',
  'https://www.linkedin.com/pub/jordan-manekin/41/292/497',
  'https://www.linkedin.com/in/nedsherman',
  'https://www.linkedin.com/pub/robert-strent/0/18/686',
  'https://www.linkedin.com/in/erinjacobson',
  'https://www.linkedin.com/in/tylermiddleton',
  'https://www.linkedin.com/pub/dawn-friedman/7/534/a5',
  'https://uk.linkedin.com/pub/banny-poostchi/64/683/794',
  'https://www.linkedin.com/pub/kia-kamran/9/a3/187',
  'https://www.linkedin.com/pub/joseph-brenner/4/7b5/7a2',
  'https://www.linkedin.com/in/geoffreylamoureux',
  'https://www.linkedin.com/pub/robert-weinberg/5/633/340',
  'https://www.linkedin.com/pub/jody-simon/4/328/54',
  'https://www.linkedin.com/pub/daniel-sirkin/20/195/563',
  'https://www.linkedin.com/in/gfiremark',
  'https://www.linkedin.com/pub/grace-kim/6/7a9/304',
  'https://www.linkedin.com/in/josephrgregory',
  'https://www.linkedin.com/pub/ted-harris/7/2ab/48',
  'https://www.linkedin.com/in/gentleskmusiclaw123',
  'https://www.linkedin.com/in/jimswisher',
  'https://www.linkedin.com/pub/karen-gottlieb/5/746/891',
  'https://www.linkedin.com/pub/rose-meade-hart/0/74/575',
  'https://www.linkedin.com/in/adammehr',
  'https://www.linkedin.com/pub/leah-antonio-ketcham/6/47b/9a',
  'https://www.linkedin.com/pub/paul-miloknay/5/30b/104',
  'https://www.linkedin.com/in/hhertz',
  'https://www.linkedin.com/pub/jay-patel/19/b71/965',
  'https://www.linkedin.com/in/hrbeklaw',
  'https://www.linkedin.com/pub/lawrence-browning/19/723/470',
  'https://www.linkedin.com/pub/sonya-guardo/b/678/b13',
  'https://www.linkedin.com/pub/daniella-restrepo-orozco/84/8a9/360',
  'https://www.linkedin.com/pub/scott-bobrow/8/4b3/a41',
  'https://www.linkedin.com/in/entertainment',
  'https://www.linkedin.com/pub/julie-feldman/21/84/761',
  'https://www.linkedin.com/pub/nina-markus/1/b0/693',
  'https://www.linkedin.com/in/karenkettner',
  'https://www.linkedin.com/in/joshhiller',
  'https://www.linkedin.com/pub/eve-bonham/15/939/bb3',
  'https://www.linkedin.com/in/nargesnoelletopetzes',
  'https://www.linkedin.com/pub/peter-grant/5/468/316',
  'https://www.linkedin.com/in/jakeprestonevans',
  'https://www.linkedin.com/in/ilenegoldberg',
  'https://www.linkedin.com/pub/stephanie-adwar/2/148/72a',
  'https://www.linkedin.com/pub/noelle-brown/66/225/340',
  'https://www.linkedin.com/pub/beth-b-moore/7/813/a65',
  'https://www.linkedin.com/in/shawnasseyhowellbrooks',
  'https://www.linkedin.com/pub/paula-paizes/5/573/759',
  'https://www.linkedin.com/pub/larry-verbit/5/ab5/769',
  'https://www.linkedin.com/pub/leonard-zackheim/59/20b/b5a',
  'https://www.linkedin.com/pub/brandon-dorsky/15/64/101',
  'https://www.linkedin.com/pub/david-berlin/66/100/87',
  'https://www.linkedin.com/pub/sandra-depass/29/55b/503',
  'https://www.linkedin.com/in/jessdrabkin',
  'https://www.linkedin.com/pub/don-friedman/3a/307/203',
  'https://au.linkedin.com/in/genesgoodsell',
  'https://www.linkedin.com/pub/katherine-mcclure/1/a82/172',
  'https://www.linkedin.com/in/michaelwlawrence',
  'https://ca.linkedin.com/pub/eb-reinbergs/4/769/721',
  'https://www.linkedin.com/pub/terry-chang/7/bb1/251',
  'https://www.linkedin.com/pub/seth-j-horwitz/11/b6/5b4',
  'https://www.linkedin.com/pub/adam-rosen/2/855/544',
  'https://www.linkedin.com/pub/c-j-vranca/0/403/679',
  'https://www.linkedin.com/in/jerrenwright',
  'https://www.linkedin.com/in/shawnahilleary',
  'https://www.linkedin.com/pub/stuart-prager/19/210/19',
  'https://www.linkedin.com/pub/lucy-popkin/2/888/a91',
  'https://www.linkedin.com/in/jaynekaplan',
  'https://www.linkedin.com/pub/charles-driebe/1/60/903',
  'https://tt.linkedin.com/pub/carla-parris/b/603/667',
  'https://www.linkedin.com/pub/michael-bonafede/5/2/885',
  'https://www.linkedin.com/pub/jennifer-murdoch/36/425/243',
  'https://www.linkedin.com/pub/jon-birkhahn/4/b44/1a',
  'https://www.linkedin.com/pub/daniel-mun/27/b3/262',
  'https://www.linkedin.com/pub/dennis-franks/4/796/28a',
  'https://www.linkedin.com/pub/tova-l-lutz/18/965/458',
  'https://www.linkedin.com/pub/sandra-sweeney/28/542/894',
  'https://www.linkedin.com/in/sjsteigs010108',
  'https://www.linkedin.com/pub/mackenzie-lewis/17/449/539',
  'https://uk.linkedin.com/pub/paul-spraggon/a/297/586',
  'https://www.linkedin.com/pub/fred-jong/8a/b51/478',
  'https://www.linkedin.com/pub/katrina-bleckley/8a/779/336',
  'https://www.linkedin.com/in/mollyhansen',
  'https://www.linkedin.com/pub/nathan-avery/56/869/8b',
  'https://au.linkedin.com/pub/marcus-walkom/29/288/123',
  'https://www.linkedin.com/pub/david-finkelstein/8/81a/219',
  'https://www.linkedin.com/pub/doug-shumard/8a/283/82a',
  'https://www.linkedin.com/pub/marie-laduca/6b/47a/94a',
  'https://www.linkedin.com/pub/matthew-kamen/32/667/1b5',
  'https://www.linkedin.com/pub/robert-kabat/8/16b/a31',
  'https://www.linkedin.com/pub/tammy-wang/59/769/669']
	rules = [Rule(SgmlLinkExtractor(allow=(r'/pub/ashley-hollan/13/911/27|/in/keithdfraser|/pub/ed-pierson/b/366/651|/in/emilylawyer|/pub/wallace-collins/3/887/958|/in/nedsherman|/pub/robert-strent/0/18/686|/in/erinjacobson|/pub/dawn-friedman/7/534/a5|/pub/kia-kamran/9/a3/187|/in/geoffreylamoureux|/pub/robert-weinberg/5/633/340|/pub/daniel-sirkin/20/195/563|/in/gfiremark|/in/josephrgregory|/pub/ted-harris/7/2ab/48|/in/gentleskmusiclaw123|/pub/karen-gottlieb/5/746/891|/in/adammehr|/pub/leah-antonio-ketcham/6/47b/9a|/in/hhertz|/pub/jay-patel/19/b71/965|/in/hrbeklaw|/pub/sonya-guardo/b/678/b13|/pub/scott-bobrow/8/4b3/a41|/in/entertainment|/pub/nina-markus/1/b0/693|/in/karenkettner|/pub/eve-bonham/15/939/bb3|/in/nargesnoelletopetzes|/in/jakeprestonevans|/pub/stephanie-adwar/2/148/72a|/pub/beth-b-moore/7/813/a65|/in/shawnasseyhowellbrooks|/pub/larry-verbit/5/ab5/769|/pub/brandon-dorsky/15/64/101|/pub/sandra-depass/29/55b/503|/in/jessdrabkin|in/genesgoodsell|/pub/katherine-mcclure/1/a82/172|/in/michaelwlawrence|/pub/terry-chang/7/bb1/251|/pub/adam-rosen/2/855/544|/in/jerrenwright|/pub/stuart-prager/19/210/19|/in/jaynekaplan|/pub/charles-driebe/1/60/903|/pub/michael-bonafede/5/2/885|/pub/jon-birkhahn/4/b44/1a|/pub/dennis-franks/4/796/28a|/pub/sandra-sweeney/28/542/894|/in/sjsteigs010108|pub/paul-spraggon/a/297/586|/pub/katrina-bleckley/8a/779/336|/in/mollyhansen|pub/marcus-walkom/29/288/123|/pub/doug-shumard/8a/283/82a|/pub/matthew-kamen/32/667/1b5|/pub/tammy-wang/59/769/669')), callback='parse_person', follow=False)]
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
			schoolValue = schoolValueList[0].encode("utf8")
			#adds school to education dictionary
			tempEducation["school"] = schoolValue

			majorValueList = education.xpath('header/h5/span[@class="major"]/a/text()').extract()
			if majorValueList == []:
				majorValueList = [""]
			majorValue = majorValueList[0].encode("utf8")
			tempEducation["major"] = majorValue

			degreeValueList = education.xpath('header/h5/span[@class="degree"]/text()').extract()
			if degreeValueList == []:
				degreeValueList = [""]
			degreeValue = degreeValueList[0].encode("utf8")
			degreeValue = degreeValue.replace(", ", "")
			tempEducation["degree"] = degreeValue

			degreeYears = education.xpath('span[@class="education-date"]/time/text()').extract()
			if degreeYears == []:
				tempEducation["start_date"] = ""
				tempEducation["end_date"] = ""
			else:
				time1 = degreeYears[0].encode("utf8")
				time2 = degreeYears[1].encode("utf8")[-4:]
				tempEducation["start_date"] = time1
				tempEducation["end_date"] = time2

			person['educationList'].append(tempEducation)

		sleep(randint(1,3))

		PersonScraper.urlCounter+=1
		return person




# //div[@class='full-name']