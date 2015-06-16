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

			results+= "www\\.linkedin\\.com" + array_xpath[i].slice(24)+"|"
			// console.log(array_xpath[i].slice(24)+"|")
		} else if(reg2.test(array_xpath[i])){
			// console.log(array_xpath[i].slice(24)+"|")
			// console.log("THERE")
			results+= "www\\.linkedin\\.com" + array_xpath[i].slice(24)+"|"
			numReturned++
		}


		// console.log(numReturned)

		reg1.lastIndex= 0;
		reg2.lastIndex= 0;


	}
	// console.log(numReturned)
	 console.log("results", results);

}

(cleanup("https://www.linkedin.com/pub/matthew-deland/2a/5aa/9b6 https://www.linkedin.com/in/yinlou https://www.linkedin.com/in/weiden https://www.linkedin.com/pub/piero-ferrante/91/106/535 https://www.linkedin.com/in/sumandebroy https://www.linkedin.com/pub/trent-hauck/23/3bb/725 https://www.linkedin.com/pub/tomer-tal/64/7a8/112 https://www.linkedin.com/in/mcanearm https://www.linkedin.com/pub/ben-link/1a/598/45a https://www.linkedin.com/in/franciscojavierarceo https://www.linkedin.com/in/maisamwasti https://www.linkedin.com/pub/vinayak-javaly/6/412/37a https://www.linkedin.com/pub/siqi-chen/12/357/45 https://www.linkedin.com/in/benjaminarai https://www.linkedin.com/in/helenaxwang https://www.linkedin.com/in/souravdeymit https://www.linkedin.com/in/sabazuberi https://www.linkedin.com/pub/gabriel-gaster/19/969/a31 https://www.linkedin.com/pub/neeraj-gaur/a/497/43 https://www.linkedin.com/pub/tong-lu/41/155/a74 https://www.linkedin.com/in/adgaudio https://www.linkedin.com/in/atibaup https://www.linkedin.com/in/wtylerjorgensen https://www.linkedin.com/in/alexpjones https://www.linkedin.com/in/lijenniferx https://www.linkedin.com/pub/situo-liu/38/42a/5b8 https://www.linkedin.com/pub/addhyan-pandey/30/a9/2a0 https://www.linkedin.com/in/jeffakolb https://www.linkedin.com/pub/derek-gossi/a1/45a/45b https://www.linkedin.com/in/jbmunro4 https://www.linkedin.com/in/georgebdavis https://www.linkedin.com/pub/viktoria-rojkova/12/a74/10 https://www.linkedin.com/pub/ben-hamner/12/597/987 https://www.linkedin.com/pub/richard-chiles/2/471/2b1 https://www.linkedin.com/in/bgawalt https://www.linkedin.com/pub/can-jin/40/124/23a https://www.linkedin.com/pub/ashin-mukherjee/35/87b/29 https://www.linkedin.com/in/jmartineau https://www.linkedin.com/pub/serge-berger/25/3bb/93 https://www.linkedin.com/in/andrescorradaemmanuel https://www.linkedin.com/in/sarahaerni https://www.linkedin.com/in/aaronbeach https://www.linkedin.com/in/michaellimhk https://www.linkedin.com/pub/miaoqing-fang-phd/3b/190/2a2 https://www.linkedin.com/in/weixiangchen https://www.linkedin.com/pub/baoning-wu/2/106/54a https://www.linkedin.com/in/mikekuhlen https://www.linkedin.com/in/ahnagirshick https://www.linkedin.com/pub/nicholas-arcolano/50/61b/37b https://www.linkedin.com/in/stephenswedish https://www.linkedin.com/pub/kyle-polich/3/719/504 https://www.linkedin.com/in/jwei512 https://www.linkedin.com/in/alokgupta83 https://www.linkedin.com/in/hanswolters https://www.linkedin.com/pub/paul-stolorz/0/92/915 https://www.linkedin.com/pub/trevor-brennan/46/976/702 https://www.linkedin.com/in/jothiperiasamy https://www.linkedin.com/in/giovanniseni https://www.linkedin.com/in/jessestcharles https://www.linkedin.com/in/lwmsphd https://www.linkedin.com/pub/nick-berry/0/138/337 https://www.linkedin.com/pub/virot-%22ta%22-chiraphadhanakul/.../ba3 https://www.linkedin.com/in/rohitsp https://www.linkedin.com/in/pinardonmez https://www.linkedin.com/pub/john-lee/17/564/161 https://www.linkedin.com/in/derekjychang https://www.linkedin.com/in/jeffreyfossett https://www.linkedin.com/pub/nuria-garcia/20/726/57 https://www.linkedin.com/pub/rajen-subramanian-athreya-phd/3/.../938 https://www.linkedin.com/in/viethathuc https://www.linkedin.com/in/yidewang https://www.linkedin.com/in/archanaramesh https://www.linkedin.com/in/hankssteve https://www.linkedin.com/in/jeffheaton https://www.linkedin.com/pub/claudia-gold/25/4ab/423 https://www.linkedin.com/in/justinparrella https://www.linkedin.com/in/kirkdborne https://www.linkedin.com/pub/david-bayliss/a/556/426 https://www.linkedin.com/pub/aparna-kumar/85/836/8b4 https://www.linkedin.com/in/dclambert https://www.linkedin.com/in/piccolbo https://www.linkedin.com/pub/arash-asadi/1b/bb0/665 https://www.linkedin.com/pub/alexandra-ressler/5/bb8/913 https://www.linkedin.com/in/derekfarren https://www.linkedin.com/pub/siwei-zhu/41/509/57a https://www.linkedin.com/in/randalolson https://www.linkedin.com/in/randalhenne https://www.linkedin.com/pub/adam-cornille/b/689/8aa https://www.linkedin.com/in/drcarlanderson https://www.linkedin.com/in/abelindsey https://www.linkedin.com/in/shawndr https://www.linkedin.com/pub/lance-martin/5/33b/64a https://www.linkedin.com/in/michaelradwin https://www.linkedin.com/pub/emma-zohner/5/206/45a https://www.linkedin.com/in/weihanupenn https://www.linkedin.com/in/andrewjkoo https://www.linkedin.com/in/zhangvickie https://www.linkedin.com/pub/kevin-goetsch/91/993/260 https://www.linkedin.com/in/khadershameer https://www.linkedin.com/in/ivihernandez"))