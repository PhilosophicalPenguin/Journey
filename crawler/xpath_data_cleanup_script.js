function cleanup(xpath_string){

	var array_xpath = xpath_string.split(" ");
	console.log(array_xpath)

	// var matches = /in/g.exec(xpath_string)

	var results = "";

	var reg1 = /\/in\//g
	var reg2 = /\/pub\//g

	
	for(var i = 0; i < array_xpath.length; i++){

		var indexMatch;

		if(reg1.test(array_xpath[i])){
			// indexMatch = array_xpath[i].indexOf("/in/")
			results+= array_xpath[i].slice(24)+"|"
		} else if(reg2.test(array_xpath[i])){
			results+= array_xpath[i].slice(24)+"|"
		}

		results = results.slice(0, results.length)


	}

	console.log("results", results);

}

(cleanup("https://www.linkedin.com/pub/ashley-hollan/13/911/27 https://www.linkedin.com/in/keithdfraser https://www.linkedin.com/pub/charles-prince/6/67/865 https://www.linkedin.com/pub/ed-pierson/b/366/651 https://www.linkedin.com/in/emilylawyer https://www.linkedin.com/pub/evan-cohen/3/b06/383 https://www.linkedin.com/pub/wallace-collins/3/887/958 https://www.linkedin.com/pub/jordan-manekin/41/292/497 https://www.linkedin.com/in/nedsherman https://www.linkedin.com/pub/robert-strent/0/18/686 https://www.linkedin.com/in/erinjacobson https://www.linkedin.com/in/tylermiddleton https://www.linkedin.com/pub/dawn-friedman/7/534/a5 https://uk.linkedin.com/pub/banny-poostchi/64/683/794 https://www.linkedin.com/pub/kia-kamran/9/a3/187 https://www.linkedin.com/pub/joseph-brenner/4/7b5/7a2 https://www.linkedin.com/in/geoffreylamoureux https://www.linkedin.com/pub/robert-weinberg/5/633/340 https://www.linkedin.com/pub/jody-simon/4/328/54 https://www.linkedin.com/pub/daniel-sirkin/20/195/563 https://www.linkedin.com/in/gfiremark https://www.linkedin.com/pub/grace-kim/6/7a9/304 https://www.linkedin.com/in/josephrgregory https://www.linkedin.com/pub/ted-harris/7/2ab/48 https://www.linkedin.com/in/gentleskmusiclaw123 https://www.linkedin.com/in/jimswisher https://www.linkedin.com/pub/karen-gottlieb/5/746/891 https://www.linkedin.com/pub/rose-meade-hart/0/74/575 https://www.linkedin.com/in/adammehr https://www.linkedin.com/pub/leah-antonio-ketcham/6/47b/9a https://www.linkedin.com/pub/paul-miloknay/5/30b/104 https://www.linkedin.com/in/hhertz https://www.linkedin.com/pub/jay-patel/19/b71/965 https://www.linkedin.com/in/hrbeklaw https://www.linkedin.com/pub/lawrence-browning/19/723/470 https://www.linkedin.com/pub/sonya-guardo/b/678/b13 https://www.linkedin.com/pub/daniella-restrepo-orozco/84/8a9/360 https://www.linkedin.com/pub/scott-bobrow/8/4b3/a41 https://www.linkedin.com/in/entertainment https://www.linkedin.com/pub/julie-feldman/21/84/761 https://www.linkedin.com/pub/nina-markus/1/b0/693 https://www.linkedin.com/in/karenkettner https://www.linkedin.com/in/joshhiller https://www.linkedin.com/pub/eve-bonham/15/939/bb3 https://www.linkedin.com/in/nargesnoelletopetzes https://www.linkedin.com/pub/peter-grant/5/468/316 https://www.linkedin.com/in/jakeprestonevans https://www.linkedin.com/in/ilenegoldberg https://www.linkedin.com/pub/stephanie-adwar/2/148/72a https://www.linkedin.com/pub/noelle-brown/66/225/340 https://www.linkedin.com/pub/beth-b-moore/7/813/a65 https://www.linkedin.com/in/shawnasseyhowellbrooks https://www.linkedin.com/pub/paula-paizes/5/573/759 https://www.linkedin.com/pub/larry-verbit/5/ab5/769 https://www.linkedin.com/pub/leonard-zackheim/59/20b/b5a https://www.linkedin.com/pub/brandon-dorsky/15/64/101 https://www.linkedin.com/pub/david-berlin/66/100/87 https://www.linkedin.com/pub/sandra-depass/29/55b/503 https://www.linkedin.com/in/jessdrabkin https://www.linkedin.com/pub/don-friedman/3a/307/203 https://au.linkedin.com/in/genesgoodsell https://www.linkedin.com/pub/katherine-mcclure/1/a82/172 https://www.linkedin.com/in/michaelwlawrence https://ca.linkedin.com/pub/eb-reinbergs/4/769/721 https://www.linkedin.com/pub/terry-chang/7/bb1/251 https://www.linkedin.com/pub/seth-j-horwitz/11/b6/5b4 https://www.linkedin.com/pub/adam-rosen/2/855/544 https://www.linkedin.com/pub/c-j-vranca/0/403/679 https://www.linkedin.com/in/jerrenwright https://www.linkedin.com/in/shawnahilleary https://www.linkedin.com/pub/stuart-prager/19/210/19 https://www.linkedin.com/pub/lucy-popkin/2/888/a91 https://www.linkedin.com/in/jaynekaplan https://www.linkedin.com/pub/charles-driebe/1/60/903 https://tt.linkedin.com/pub/carla-parris/b/603/667 https://www.linkedin.com/pub/michael-bonafede/5/2/885 https://www.linkedin.com/pub/jennifer-murdoch/36/425/243 https://www.linkedin.com/pub/jon-birkhahn/4/b44/1a https://www.linkedin.com/pub/daniel-mun/27/b3/262 https://www.linkedin.com/pub/dennis-franks/4/796/28a https://www.linkedin.com/pub/tova-l-lutz/18/965/458 https://www.linkedin.com/pub/sandra-sweeney/28/542/894 https://www.linkedin.com/in/sjsteigs010108 https://www.linkedin.com/pub/mackenzie-lewis/17/449/539 https://uk.linkedin.com/pub/paul-spraggon/a/297/586 https://www.linkedin.com/pub/fred-jong/8a/b51/478 https://www.linkedin.com/pub/katrina-bleckley/8a/779/336 https://www.linkedin.com/in/mollyhansen https://www.linkedin.com/pub/nathan-avery/56/869/8b https://au.linkedin.com/pub/marcus-walkom/29/288/123 https://www.linkedin.com/pub/david-finkelstein/8/81a/219 https://www.linkedin.com/pub/doug-shumard/8a/283/82a https://www.linkedin.com/pub/marie-laduca/6b/47a/94a https://www.linkedin.com/pub/matthew-kamen/32/667/1b5 https://www.linkedin.com/pub/robert-kabat/8/16b/a31 https://www.linkedin.com/pub/tammy-wang/59/769/669"))