# -*- coding: utf-8 -*-

# Scrapy settings for linkedinscraper project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

BOT_NAME = 'linkedinscraper'

SPIDER_MODULES = ['linkedinscraper.spiders']
NEWSPIDER_MODULE = 'linkedinscraper.spiders'
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36"

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'linkedinscraper (+http://www.yourdomain.com)'
