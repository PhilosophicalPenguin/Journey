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

(cleanup("https://www.linkedin.com/in/natemoch https://www.linkedin.com/in/paomichael https://www.linkedin.com/in/mavturnerproductmanager https://www.linkedin.com/in/cetinok https://www.linkedin.com/in/quyle https://www.linkedin.com/in/jaybergesen https://www.linkedin.com/in/rajeevtk https://www.linkedin.com/pub/gary-adams/17/b01/911 https://www.linkedin.com/pub/alex-collins/25/671/31 https://www.linkedin.com/pub/thibault-imbert/17/958/631 https://www.linkedin.com/in/sshanker https://www.linkedin.com/in/vidyachandra https://www.linkedin.com/in/ryanhcassidy https://www.linkedin.com/in/ashleycarroll https://www.linkedin.com/pub/sarah-highcove/4/622/330 https://www.linkedin.com/in/baonguyennguyen https://www.linkedin.com/in/christinawodtke https://www.linkedin.com/in/sriramkrishnan01 https://www.linkedin.com/pub/arjun-shrinath/4/44b/803 https://www.linkedin.com/in/asaha https://www.linkedin.com/in/braddickason https://www.linkedin.com/in/ramrajagopalan1 https://www.linkedin.com/in/richardformidoni https://www.linkedin.com/in/markusmichalewicz https://www.linkedin.com/pub/yi-bing-shi/3/a34/90b https://www.linkedin.com/in/paulklee https://www.linkedin.com/in/janetryu https://www.linkedin.com/in/tomtate https://www.linkedin.com/in/deckelisraeli https://ch.linkedin.com/in/raphaelleiteritz https://www.linkedin.com/in/nitashawalia https://www.linkedin.com/in/tmobrien https://www.linkedin.com/in/rstellar https://www.linkedin.com/in/livevc https://www.linkedin.com/in/eimangwu https://www.linkedin.com/in/nfrench https://www.linkedin.com/pub/ellana-fortuna/16/176/5a https://www.linkedin.com/pub/tim-kendall/0/2/657 https://www.linkedin.com/pub/craig-loomis-main/5/4/6b8 https://www.linkedin.com/in/msiliski https://www.linkedin.com/in/hacharya https://www.linkedin.com/pub/david-sinsky/5/177/339 https://www.linkedin.com/in/katieschmalzried https://www.linkedin.com/in/chadkeck https://www.linkedin.com/in/adithiyer https://www.linkedin.com/in/anshudas https://www.linkedin.com/in/lizreaveswalker https://www.linkedin.com/in/ricks https://www.linkedin.com/in/rohitbakhshi https://www.linkedin.com/in/macrakis https://www.linkedin.com/in/andrewjohns https://www.linkedin.com/in/adamazzara https://www.linkedin.com/pub/joy-chang/29/a84/9a6 https://www.linkedin.com/in/michaelkassal https://www.linkedin.com/pub/eric-han/6/825/300 https://www.linkedin.com/pub/jori-bell/17/873/b52 https://www.linkedin.com/in/pepperagusa https://www.linkedin.com/pub/matt-driscoll/7/91a/775 https://www.linkedin.com/in/ctgilley https://www.linkedin.com/in/rohinivibha https://www.linkedin.com/in/oimeokparia https://www.linkedin.com/pub/justin-cao/9/8a8/8a5 https://www.linkedin.com/in/emerkirrane https://www.linkedin.com/in/vanessalarco https://www.linkedin.com/pub/wolfgang-lochner/0/3a5/b80 https://www.linkedin.com/pub/anna-schneider/4/695/497 https://www.linkedin.com/pub/david-colantuoni/0/11a/899 https://www.linkedin.com/in/markchang https://www.linkedin.com/in/jeslinjacob https://www.linkedin.com/in/harshjitsethi https://www.linkedin.com/pub/yina-arenas/12/686/746 https://www.linkedin.com/in/jbacus https://www.linkedin.com/pub/jaikaran-sawhny/8/4a6/b64 https://www.linkedin.com/in/zakariahnasser https://www.linkedin.com/in/skatugampola https://www.linkedin.com/in/markchien https://www.linkedin.com/in/scottjohnston https://www.linkedin.com/pub/kelton-lynn/3/470/661 https://www.linkedin.com/in/paulhy https://www.linkedin.com/pub/christopher-williams/20/186/383 https://www.linkedin.com/in/otakevin https://www.linkedin.com/in/duncanosborn https://www.linkedin.com/pub/lindsay-silverman/2b/a35/92a https://www.linkedin.com/in/moneshpunjabi https://www.linkedin.com/in/mattholden1 https://www.linkedin.com/in/doronichev https://www.linkedin.com/in/donahuejason https://www.linkedin.com/pub/bryan-tublin/10/489/35 https://www.linkedin.com/in/soundaryachandar https://www.linkedin.com/in/andrewjchang1 https://www.linkedin.com/pub/kaia-laursen/2/165/a39 https://www.linkedin.com/in/ishaishamir https://www.linkedin.com/in/ksenya https://www.linkedin.com/pub/josh-butler/1/b5/563 https://www.linkedin.com/in/pankajm https://www.linkedin.com/in/govaibhav https://uk.linkedin.com/in/piersjones https://www.linkedin.com/in/andriheidar https://www.linkedin.com/in/gadibenzvi https://www.linkedin.com/pub/isi-azeke/8/6b9/29a"))