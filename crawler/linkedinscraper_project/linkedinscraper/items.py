# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class Person(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()

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
