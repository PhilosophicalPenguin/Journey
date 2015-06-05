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
	start_urls = [ 'https://www.linkedin.com/in/gadibenzvi',
  'https://www.linkedin.com/in/paulthomsen',
  'https://www.linkedin.com/in/harshjitsethi',
  'https://www.linkedin.com/pub/zindzi-mccormick/b/8a4/a35',
  'https://www.linkedin.com/in/ksenya',
  'https://www.linkedin.com/pub/john-nack/0/87b/b38',
  'https://www.linkedin.com/in/adamazzara',
  'https://www.linkedin.com/in/sibozhao',
  'https://www.linkedin.com/in/amandabeuckelaere',
  'https://www.linkedin.com/in/katieschmalzried',
  'https://www.linkedin.com/pub/isi-azeke/8/6b9/29a',
  'https://www.linkedin.com/in/lahini',
  'https://www.linkedin.com/in/jonkrafcik',
  'https://www.linkedin.com/in/ericarios',
  'https://www.linkedin.com/pub/aubrey-gray/63/613/2a3',
  'https://www.linkedin.com/in/alexandrelee',
  'https://www.linkedin.com/in/merlindowse73',
  'https://www.linkedin.com/in/toddsherman',
  'https://www.linkedin.com/pub/wei-luo/9/805/7a3',
  'https://www.linkedin.com/pub/alec-motamed/86/aaa/9b4',
  'https://www.linkedin.com/pub/stuart-mcguigan/4/751/b46/nl',
  'https://www.linkedin.com/pub/ulla-cocke/5/410/240',
  'https://www.linkedin.com/pub/jace-quayle/42/585/300/it',
  'https://www.linkedin.com/pub/stefan-goedegebure/18/a34/623',
  'https://www.linkedin.com/in/calvinclee',
  'https://www.linkedin.com/pub/julia-katz/4a/270/aa0',
  'https://www.linkedin.com/pub/edel-tryse/4b/272/a10',
  'https://www.linkedin.com/pub/emelie-tibblin/55/742/4ab',
  'https://www.linkedin.com/in/madejongh/nl',
  'https://www.linkedin.com/pub/damon-hopley/1/797/ab2',
  'https://www.linkedin.com/pub/zein-el-etnawy/6a/209/9aa',
  'https://www.linkedin.com/pub/narelle-whiteley/22/708/54b',
  'https://www.linkedin.com/pub/jennifer-gabel/9/b24/a91',
  'https://www.linkedin.com/pub/arun-sundaram/18/447/a5a',
  'https://www.linkedin.com/pub/freddy-corlier/12/838/361',
  'https://www.linkedin.com/pub/antes-digiesi/72/b32/390',
  'https://www.linkedin.com/pub/stefan-smith/36/276/931',
  'https://www.linkedin.com/pub/gregory-mccabe/6/a09/14a',
  'https://www.linkedin.com/pub/john-schouwman/88/220/231',
  'https://www.linkedin.com/pub/edith-kock/19/3a1/225',
  'https://www.linkedin.com/pub/daphne-van-dijk-blom/15/651/853',
  'https://www.linkedin.com/pub/henrik-iversen/8a/4b9/594',
  'https://www.linkedin.com/pub/marco-buggle/b1/179/91a',
  'https://www.linkedin.com/pub/peterson-bruce/23/457/b05' ]
	rules = [Rule(SgmlLinkExtractor(allow=(r'/in/paulthomsen|/in/harshjitsethi|/pub/zindzi-mccormick/b/8a4/a35|/in/ksenya|/pub/john-nack/0/87b/b38|/in/adamazzara|/in/sibozhao|/in/amandabeuckelaere|/in/katieschmalzried|/pub/isi-azeke/8/6b9/29a|/in/lahini|/in/jonkrafcik|/in/ericarios|/pub/aubrey-gray/63/613/2a3|/in/alexandrelee|/in/merlindowse73|/in/toddsherman|in/prodman|/pub/wei-luo/9/805/7a3|pub/product-manager/7a/b92/644|pub/ product-manager/48/259/415|pub/product-manager/b4/8b8/695|/pub/cédric-hutchings/0/99a/886|/pub/judith-van-der-star/3/651/872|pub/john-robins/36/321/ab6|pub/shahzad-faisal/a/440/88a|pub/amir-cohen/14/5b4/99a|/pub/fabian-portehaut/58/588/419|/pub/angelique-smolinski/1/635/b7a|pub/natalie-hopkins/7/bb4/b97|/pub/david-darg/12/2a/956/es|pub/abhishek-chandhock/14/852/a50|/in/rachaelwilcox1/fr|pub/hadja-kane/4/b93/870|/pub/akin-oladipo/a4/925/b98|pub/hsien-yi-stanley-huang/8/b5b/33|pub/rickwood-dave/4/67a/266|/pub/alec-motamed/86/aaa/9b4|/pub/stuart-mcguigan/4/751/b46/nl|/pub/ulla-cocke/5/410/240|/pub/jace-quayle/42/585/300/it|/pub/stefan-goedegebure/18/a34/623|pub/egon-danielsson/0/1b4/644/es|/in/calvinclee|/pub/julia-katz/4a/270/aa0|/pub/edel-tryse/4b/272/a10|/pub/emelie-tibblin/55/742/4ab|/pub/maya-moléa/4b/943/9b0|/in/madejongh/nl|/pub/damon-hopley/1/797/ab2|pub/zhaokun-zong/55/142/264|/pub/zein-el-etnawy/6a/209/9aa|/pub/narelle-whiteley/22/708/54b|/pub/jennifer-gabel/9/b24/a91|/pub/arun-sundaram/18/447/a5a|/pub/freddy-corlier/12/838/361|/pub/antes-digiesi/72/b32/390|/pub/stefan-smith/36/276/931|/pub/gregory-mccabe/6/a09/14a|/pub/john-schouwman/88/220/231|/pub/edith-kock/19/3a1/225|/pub/daphne-van-dijk-blom/15/651/853|/pub/henrik-iversen/8a/4b9/594|/pub/marco-buggle/b1/179/91a|/pub/peterson-bruce/23/457/b05')), callback='parse_person', follow=False)]
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