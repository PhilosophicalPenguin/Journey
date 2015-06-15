Visit us at http://letsjourney.herokuapp.com
# Journey


**Journey guides you to your dream job by showing you the paths that others have taken to get there.**

<ol> 
<li> Choose your dream job (i.e. Data Scientist, Product Manager, etc). </li>
<li> Explore the professional and educational backgrounds of people who currently have that job. </li>
<li> Check out the profiles of individual people to see their timelines and how they got the job you want. </li>
<li> Click "Get me there" and enter your current position to find people that went from your current job to your dream job. </li>

## The data

The data was obtained from LinkedIn using the Scrapy (https://github.com/scrapy/scrapy) Python module. 

The deployed application is seeded with data. To add more profiles to the database, we provide an API endpoint at:

```
api/uploadfile
```

that accepts POST requests with JSON data. We also provide a lightweight HTML page at:

```
client/dataupload.html
```

that can be used instead. JSON uploaded through this page is automatically parsed and added to the MySQL database.

## MySQL Database

We use a MySQL datbase with Bookshelf.js as an ORM. The config file can be found at: ```server/db_Schemas/config.js```, and defines the connection settings and tables used in the application.


## Server-side testing

To run server-side testing, enter
```
jasmine
```
from the root directory.

The Jasmine tests can be found in the directory:
```
/spec
```

## Build process

To create the build for production deployment, enter

```
gulp deploy
```

from the root directory. This will:

<ul>
<li> lint all production files, </li>
<li> run all tests </li>
<li> minify/concatenate, </li>
<li> and push all files to the <code> dist </code> directory for deployment. </li>
