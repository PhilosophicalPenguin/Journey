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
	start_urls = [ 'https://www.linkedin.com/pub/zhibiao-rao-data-scientist/58/9b/12b',
  'https://www.linkedin.com/pub/jason-french/98/767/9b1',
  'https://www.linkedin.com/pub/sara-smoot/37/3b4/a72',
  'https://www.linkedin.com/in/lutzfinger',
  'https://www.linkedin.com/in/jacobarnold',
  'https://www.linkedin.com/pub/leah-mcguire/47/270/70a',
  'https://www.linkedin.com/in/georgexing',
  'https://www.linkedin.com/pub/satadru-sengupta/9/a37/628',
  'https://www.linkedin.com/in/jeremystanley',
  'https://www.linkedin.com/pub/michelangelo-d-agostino/6/283/36',
  'https://www.linkedin.com/pub/fahad-shah/9/540/968',
  'https://www.linkedin.com/pub/shubha-nabar/36/542/b1b',
  'https://www.linkedin.com/in/amygershkoff',
  'https://www.linkedin.com/in/charmychhichhia',
  'https://www.linkedin.com/pub/josh-wills/0/82b/138',
  'https://www.linkedin.com/in/dariasorokina',
  'https://www.linkedin.com/pub/boris-chen/14/1a2/b92',
  'https://www.linkedin.com/in/yaelelmatad',
  'https://www.linkedin.com/in/aaronsander',
  'https://www.linkedin.com/pub/zhunan-joanne-chen/10/592/583',
  'https://www.linkedin.com/in/danfrankj',
  'https://www.linkedin.com/pub/catherine-williams/35/745/3aa',
  'https://www.linkedin.com/pub/gideon-mann/12/a29/223',
  'https://www.linkedin.com/in/panwu',
  'https://www.linkedin.com/in/priyadarshy',
  'https://www.linkedin.com/pub/john-zedlewski/19/891/105',
  'https://www.linkedin.com/pub/max-song/28/350/727',
  'https://www.linkedin.com/in/cwlloyd',
  'https://www.linkedin.com/in/treycausey',
  'https://www.linkedin.com/in/katharinematsumoto',
  'https://www.linkedin.com/in/gwtang',
  'https://www.linkedin.com/in/sankethkatta',
  'https://www.linkedin.com/in/brianwilt',
  'https://www.linkedin.com/in/albertmannes',
  'https://www.linkedin.com/in/zhangsimon',
  'https://www.linkedin.com/pub/elena-grewal/20/b23/664',
  'https://www.linkedin.com/pub/jack-y-chen/78/189/b0b',
  'https://www.linkedin.com/pub/andrew-pascoe/3b/993/b2a',
  'https://www.linkedin.com/pub/gang-chen/2b/609/22a',
  'https://www.linkedin.com/in/blakeshaw',
  'https://www.linkedin.com/pub/brinda-thomas/4/672/11b',
  'https://www.linkedin.com/pub/joshua-schwartz/51/571/715',
  'https://www.linkedin.com/in/nakulsathaye',
  'https://www.linkedin.com/pub/huijun-feng/24/3b6/ba7',
  'https://www.linkedin.com/pub/nihar-bhupalam/49/676/a58',
  'https://www.linkedin.com/in/russelljurney',
  'https://www.linkedin.com/in/bentaylordata',
  'https://www.linkedin.com/in/mnysewan',
  'https://www.linkedin.com/in/christophergutierrez',
  'https://www.linkedin.com/pub/christopher-chan/6/524/bb8',
  'https://www.linkedin.com/pub/michael-els/1b/6aa/409',
  'https://www.linkedin.com/in/mmalter31',
  'https://www.linkedin.com/pub/mike-develin/59/16b/206',
  'https://www.linkedin.com/in/josiahdavis',
  'https://www.linkedin.com/in/eymwang',
  'https://www.linkedin.com/in/zhaoyuchen',
  'https://www.linkedin.com/in/polimath',
  'https://www.linkedin.com/in/edpodojil',
  'https://www.linkedin.com/pub/saikat-mukherjee/1/484/388',
  'https://www.linkedin.com/in/mohammadsabah',
  'https://www.linkedin.com/in/joshualande',
  'https://www.linkedin.com/in/eggevanderpoel',
  'https://www.linkedin.com/pub/christina-zou/9/151/b96',
  'https://www.linkedin.com/in/rbandyopadhyay',
  'https://www.linkedin.com/in/berkeleyjess',
  'https://www.linkedin.com/pub/nachum-shacham/1/9b9/64',
  'https://www.linkedin.com/in/ddeepakkumar',
  'https://www.linkedin.com/pub/eliana-feasley/21/574/b73',
  'https://www.linkedin.com/in/karthikmramasamy',
  'https://www.linkedin.com/in/chrissimokat',
  'https://www.linkedin.com/pub/amit-phansalkar/4/3a6/44',
  'https://www.linkedin.com/pub/kaushik-das/1/581/519',
  'https://www.linkedin.com/in/danmallinger',
  'https://www.linkedin.com/pub/vinay-satish-kumar/9/b56/828',
  'https://www.linkedin.com/in/raghavmadhavan',
  'https://www.linkedin.com/pub/yuan-ren/7/75/aa9',
  'https://www.linkedin.com/in/pedroalvesds',
  'https://www.linkedin.com/pub/arun-veettil/14/70b/b83',
  'https://www.linkedin.com/pub/zhigang-hua/3/bb7/b50',
  'https://www.linkedin.com/pub/rohit-mittal/6/30a/58a',
  'https://www.linkedin.com/pub/lisa-qian/26/43/98b',
  'https://www.linkedin.com/pub/dave-holtz/20/262/4',
  'https://www.linkedin.com/pub/ricardo-bion/2a/537/4b5',
  'https://www.linkedin.com/in/erincoffman',
  'https://www.linkedin.com/pub/markus-emsermann/b/412/5b8',
  'https://www.linkedin.com/in/jbenjamincook',
  'https://www.linkedin.com/pub/catherine-o-neil/23/b38/24',
  'https://www.linkedin.com/in/igorelbert',
  'https://www.linkedin.com/pub/ryan-milligan/2b/824/629',
  'https://www.linkedin.com/in/miketamir' ]	
  	rules = [Rule(SgmlLinkExtractor(allow=(r'/pub/zhibiao-rao-data-scientist/58/9b/12b|/pub/jason-french/98/767/9b1|/pub/sara-smoot/37/3b4/a72|/in/lutzfinger|/in/jacobarnold|/pub/leah-mcguire/47/270/70a|/in/georgexing|/pub/satadru-sengupta/9/a37/628|/in/jeremystanley|/pub/michelangelo-d-agostino/6/283/36|/pub/fahad-shah/9/540/968|/pub/shubha-nabar/36/542/b1b|/in/amygershkoff|/in/charmychhichhia|/pub/josh-wills/0/82b/138|/in/dariasorokina|/pub/boris-chen/14/1a2/b92|/in/yaelelmatad|/in/aaronsander|/pub/zhunan-joanne-chen/10/592/583|/in/danfrankj|/pub/catherine-williams/35/745/3aa|/pub/gideon-mann/12/a29/223|/in/panwu|/in/priyadarshy|/pub/jacob-sisk/0/7/1a9|/pub/john-zedlewski/19/891/105|/pub/max-song/28/350/727|/in/cwlloyd|/in/treycausey|/in/katharinematsumoto|/in/gwtang|/in/sankethkatta|/in/brianwilt|/in/albertmannes|/in/zhangsimon|/pub/elena-grewal/20/b23/664|/pub/jack-y-chen/78/189/b0b|/pub/andrew-pascoe/3b/993/b2a|/pub/gang-chen/2b/609/22a|/in/blakeshaw|/pub/brinda-thomas/4/672/11b|/pub/joshua-schwartz/51/571/715|/in/nakulsathaye|/pub/huijun-feng/24/3b6/ba7|/pub/nihar-bhupalam/49/676/a58|/in/russelljurney|/in/bentaylordata|/in/mnysewan|/in/christophergutierrez|/pub/christopher-chan/6/524/bb8|/pub/michael-els/1b/6aa/409|/in/mmalter31|/pub/mike-develin/59/16b/206|/in/josiahdavis|/in/eymwang|/in/zhaoyuchen|/in/polimath|/in/edpodojil|/pub/saikat-mukherjee/1/484/388|/in/mohammadsabah|/in/joshualande|/in/eggevanderpoel|/pub/christina-zou/9/151/b96|/in/rbandyopadhyay|/in/berkeleyjess|/pub/nachum-shacham/1/9b9/64|/in/ddeepakkumar|/pub/eliana-feasley/21/574/b73|/in/karthikmramasamy|/in/chrissimokat|/pub/amit-phansalkar/4/3a6/44|/pub/kaushik-das/1/581/519|/in/danmallinger|/pub/vinay-satish-kumar/9/b56/828|/in/raghavmadhavan|/pub/yuan-ren/7/75/aa9|/in/pedroalvesds|/pub/arun-veettil/14/70b/b83|/pub/zhigang-hua/3/bb7/b50|/pub/rohit-mittal/6/30a/58a|/pub/lisa-qian/26/43/98b|/pub/dave-holtz/20/262/4|/pub/ricardo-bion/2a/537/4b5|/in/erincoffman|/pub/markus-emsermann/b/412/5b8|/in/jbenjamincook|/pub/catherine-o-neil/23/b38/24|/in/igorelbert|/pub/ryan-milligan/2b/824/629|/in/miketamir')), callback='parse_person', follow=False)]
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