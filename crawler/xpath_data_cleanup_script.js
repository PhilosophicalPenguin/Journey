function cleanup(xpath_string){

	var array_xpath = xpath_string.split(" ");
	console.log(array_xpath)

	// var matches = /in/g.exec(xpath_string)

	var numReturned = 0;

	var results = "";

	var reg1 = /\/in\//g
	var reg2 = /\/pub\//g

	console.log(reg1.test(array_xpath[0]))

	
	for(var i = 0; i < array_xpath.length; i++){

		var indexMatch;


		if(reg1.test(array_xpath[i])){
			// indexMatch = array_xpath[i].indexOf("/in/")
			// console.log("HERE")

			results+= array_xpath[i].slice(24)+"|"
			// console.log(array_xpath[i].slice(24)+"|")
		} else if(reg2.test(array_xpath[i])){
			// console.log(array_xpath[i].slice(24)+"|")
			// console.log("THERE")
			results+= array_xpath[i].slice(24)+"|"
			numReturned++
		}


		// console.log(numReturned)

		reg1.lastIndex= 0;
		reg2.lastIndex= 0;


	}
	// console.log(numReturned)
	 console.log("results", results);

}

(cleanup("https://www.linkedin.com/in/minnaking https://www.linkedin.com/in/dsingh https://www.linkedin.com/in/michaeljgardea https://www.linkedin.com/in/mickdudleyjohnson https://www.linkedin.com/in/bmauney https://www.linkedin.com/in/seanplynch https://www.linkedin.com/pub/rousseau-kazi/20/259/7b8 https://www.linkedin.com/in/sippey https://www.linkedin.com/pub/ryan-singer/2b/159/994 https://www.linkedin.com/in/markchang https://www.linkedin.com/in/aparnacd https://www.linkedin.com/pub/garima-sinha/9/3b1/9b3 https://www.linkedin.com/in/nitinjulka https://www.linkedin.com/in/jeannalee https://www.linkedin.com/in/lcholmes https://www.linkedin.com/in/elizabethburstein https://www.linkedin.com/in/gustafalstromer https://www.linkedin.com/in/jeffreysharris https://www.linkedin.com/in/chelseytanaka https://www.linkedin.com/pub/peter-birch/1/b59/568 https://www.linkedin.com/in/dshapero https://www.linkedin.com/in/zalzally https://www.linkedin.com/in/nicoposner https://www.linkedin.com/in/kumareshp https://www.linkedin.com/in/sarahtavel https://www.linkedin.com/in/catherineshyu https://www.linkedin.com/in/dforrester https://www.linkedin.com/pub/mat-mullen/7/353/a02 https://www.linkedin.com/in/srothmuller https://www.linkedin.com/in/srikanthmnaidu https://www.linkedin.com/in/jocelynmangan https://www.linkedin.com/in/dvdkm https://www.linkedin.com/in/sanazahari https://www.linkedin.com/pub/brandon-savage/3/889/231 https://www.linkedin.com/in/productmanagercalifornia https://www.linkedin.com/in/jasontoff https://www.linkedin.com/in/kartikrao https://www.linkedin.com/pub/madhu-prabaker/0/3b6/9bb https://www.linkedin.com/in/johnloof https://www.linkedin.com/in/dweekly https://www.linkedin.com/in/jppark https://www.linkedin.com/in/andriheidar https://www.linkedin.com/in/curtjohnson https://www.linkedin.com/in/danielayele https://www.linkedin.com/in/lizreaveswalker https://www.linkedin.com/in/merci https://www.linkedin.com/pub/paul-karayan/7/952/601 https://www.linkedin.com/in/maxkirsch https://www.linkedin.com/in/salgar https://www.linkedin.com/in/jchang1 https://www.linkedin.com/pub/matt-schnitt/55/753/941 https://www.linkedin.com/in/reevethompson https://www.linkedin.com/in/jgolden https://www.linkedin.com/in/maxhaltman https://www.linkedin.com/in/roddynegron https://www.linkedin.com/in/lennyrachitsky https://www.linkedin.com/in/michaelboeke https://www.linkedin.com/in/stephanieteng https://www.linkedin.com/in/djhalliday https://www.linkedin.com/in/deepthim https://www.linkedin.com/pub/leili-baghaei-rad/15/735/379 https://www.linkedin.com/in/stephenchau https://www.linkedin.com/in/stevenjlee https://www.linkedin.com/in/ragavansrinivasan https://www.linkedin.com/in/andrewjchang1 https://www.linkedin.com/in/iylee https://www.linkedin.com/in/iamdeepa https://www.linkedin.com/in/vidyachandra https://www.linkedin.com/in/calvinclee https://www.linkedin.com/in/stedjamulia"))