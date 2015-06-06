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

(cleanup("https://www.linkedin.com/in/cfuhrman https://www.linkedin.com/in/danielhw https://www.linkedin.com/in/susanacdelgadillo https://www.linkedin.com/in/samkottler https://www.linkedin.com/pub/paul-weeks/58/8a0/2b1 https://www.linkedin.com/pub/dayong-huang/5/762/598 https://www.linkedin.com/in/reedlauber https://es.linkedin.com/in/davidarcos https://www.linkedin.com/pub/amber-xu/25/82/732 https://www.linkedin.com/pub/dan-hojnowski/31/581/949 https://www.linkedin.com/in/kevinagao https://www.linkedin.com/in/kobolog https://www.linkedin.com/in/gregtaylorcu https://www.linkedin.com/pub/joshua-forman/21/800/111 https://www.linkedin.com/pub/eric-casteleijn/5a/a9b/516 https://www.linkedin.com/in/grschafer https://www.linkedin.com/pub/jason-wai-leung-yu/20/1b9/11a https://www.linkedin.com/pub/tristan-pemble/74/378/47 https://www.linkedin.com/in/alexlewin https://www.linkedin.com/pub/jad-younan/9/730/958 https://www.linkedin.com/in/padduri https://www.linkedin.com/pub/ricky-gardiner/36/1b0/963 https://www.linkedin.com/in/bryansocha https://www.linkedin.com/in/mirzaaasif https://www.linkedin.com/in/mikephoran https://www.linkedin.com/in/yonemitsu https://www.linkedin.com/pub/nilesh-gattani/6/1a2/493 https://www.linkedin.com/in/paulproteus https://www.linkedin.com/in/gregkufera https://www.linkedin.com/in/stefanofontanelli https://www.linkedin.com/pub/robert-jensen/a8/b88/871 https://www.linkedin.com/pub/jeffrey-browning/49/636/a30 https://www.linkedin.com/in/joshuahwagner https://www.linkedin.com/pub/alvaro-perez-shirley/39/246/63a https://www.linkedin.com/in/vinch https://www.linkedin.com/pub/taha-bayrak/12/4b9/6a1 https://www.linkedin.com/in/jasonscheller https://www.linkedin.com/in/andreisoftwareengineer https://www.linkedin.com/in/mattmillr https://be.linkedin.com/in/ddfreyne https://www.linkedin.com/pub/matt-krukowski/3a/ba1/126 https://www.linkedin.com/in/acjay https://www.linkedin.com/pub/robert-mullen/2/ab2/661 https://www.linkedin.com/pub/kevin-jasieniecki/48/895/aa9 https://www.linkedin.com/in/leahculver https://www.linkedin.com/in/jakefarrell https://www.linkedin.com/pub/greg-karlin/78/572/388 https://www.linkedin.com/in/andrewlysyk https://www.linkedin.com/in/jmaia https://www.linkedin.com/in/drewcsillag https://www.linkedin.com/pub/jeremy-clark/10/144/86b https://www.linkedin.com/in/ilkerburak https://www.linkedin.com/in/jakemcgraw https://www.linkedin.com/pub/scott-myers/28/a57/347 https://www.linkedin.com/in/caente https://www.linkedin.com/pub/jp-mcglone/14/130/185 https://www.linkedin.com/pub/fernando-perez/1/43a/166 https://www.linkedin.com/pub/arun-venkatadri/29/53a/1a6 https://www.linkedin.com/pub/greg-robillard/2/6b5/10 https://www.linkedin.com/pub/yw-x/18/458/520?trk=pub-pbmap https://www.linkedin.com/pub/seth-hochberg/42/5a7/a52 https://il.linkedin.com/pub/yulia-lev/1/b67/b3 https://www.linkedin.com/in/nicholasjohnmercer https://www.linkedin.com/pub/edric-lescouflair/8b/32a/705 https://www.linkedin.com/pub/roey-groen/22/28/a92 https://www.linkedin.com/in/mattmontag https://es.linkedin.com/in/ismaeldeesteban https://www.linkedin.com/in/guyargo https://uk.linkedin.com/in/hwasungmars https://www.linkedin.com/in/ruhulamin1 https://www.linkedin.com/pub/alex-zhang/42/aa1/212 https://www.linkedin.com/pub/michael-young/8a/854/611 https://www.linkedin.com/in/scorlosquet https://www.linkedin.com/pub/man-xiong/a/119/b90 https://uk.linkedin.com/in/smoya https://de.linkedin.com/in/omidaladini https://www.linkedin.com/in/brcwade https://www.linkedin.com/in/johnhaugeland https://www.linkedin.com/pub/trevor-assaf/33/a45/339 https://www.linkedin.com/in/antonsmolich https://www.linkedin.com/pub/phil-opaola/66/741/b81 https://www.linkedin.com/in/jlduprat https://www.linkedin.com/in/lzhou2 https://www.linkedin.com/pub/vijay-mysore/4b/768/859 https://www.linkedin.com/pub/nicholas-van-wiggeren/28/445/854 https://www.linkedin.com/in/aabhassharma https://www.linkedin.com/in/sonalipandey https://www.linkedin.com/pub/pierre-davidoff/5/964/751 https://www.linkedin.com/pub/ravi-agarwal/13/a4/a61 https://www.linkedin.com/in/angiboustanthony https://www.linkedin.com/in/ianeure https://www.linkedin.com/pub/bram-avontuur/12/282/302 https://www.linkedin.com/in/skyla https://www.linkedin.com/in/fuziontech https://www.linkedin.com/in/andreamariotti"))