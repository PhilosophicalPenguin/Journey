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

(cleanup("https://www.linkedin.com/pub/zhibiao-rao-data-scientist/58/9b/12b https://www.linkedin.com/pub/jason-french/98/767/9b1 https://www.linkedin.com/pub/sara-smoot/37/3b4/a72 https://www.linkedin.com/in/lutzfinger https://www.linkedin.com/in/jacobarnold https://www.linkedin.com/pub/leah-mcguire/47/270/70a https://www.linkedin.com/in/georgexing https://www.linkedin.com/pub/satadru-sengupta/9/a37/628 https://www.linkedin.com/in/jeremystanley https://www.linkedin.com/pub/michelangelo-d-agostino/6/283/36 https://www.linkedin.com/pub/fahad-shah/9/540/968 https://www.linkedin.com/pub/shubha-nabar/36/542/b1b https://www.linkedin.com/in/amygershkoff https://www.linkedin.com/in/charmychhichhia https://www.linkedin.com/pub/josh-wills/0/82b/138 https://www.linkedin.com/in/dariasorokina https://www.linkedin.com/pub/boris-chen/14/1a2/b92 https://www.linkedin.com/in/yaelelmatad https://www.linkedin.com/in/aaronsander https://www.linkedin.com/pub/zhunan-joanne-chen/10/592/583 https://www.linkedin.com/in/danfrankj https://www.linkedin.com/pub/catherine-williams/35/745/3aa https://www.linkedin.com/pub/gideon-mann/12/a29/223 https://www.linkedin.com/in/panwu https://www.linkedin.com/in/priyadarshy https://www.linkedin.com/pub/jacob-sisk/0/7/1a9 https://www.linkedin.com/pub/john-zedlewski/19/891/105 https://www.linkedin.com/pub/max-song/28/350/727 https://www.linkedin.com/in/cwlloyd https://www.linkedin.com/in/treycausey https://www.linkedin.com/in/katharinematsumoto https://www.linkedin.com/in/gwtang https://www.linkedin.com/in/sankethkatta https://www.linkedin.com/in/brianwilt https://www.linkedin.com/in/albertmannes https://www.linkedin.com/in/zhangsimon https://www.linkedin.com/pub/elena-grewal/20/b23/664 https://www.linkedin.com/pub/jack-y-chen/78/189/b0b https://www.linkedin.com/pub/andrew-pascoe/3b/993/b2a https://www.linkedin.com/pub/gang-chen/2b/609/22a https://www.linkedin.com/in/blakeshaw https://www.linkedin.com/pub/brinda-thomas/4/672/11b https://www.linkedin.com/pub/joshua-schwartz/51/571/715 https://www.linkedin.com/in/nakulsathaye https://www.linkedin.com/pub/huijun-feng/24/3b6/ba7 https://www.linkedin.com/pub/nihar-bhupalam/49/676/a58 https://www.linkedin.com/in/russelljurney https://www.linkedin.com/in/bentaylordata https://www.linkedin.com/in/mnysewan https://www.linkedin.com/in/christophergutierrez https://www.linkedin.com/pub/christopher-chan/6/524/bb8 https://www.linkedin.com/pub/michael-els/1b/6aa/409 https://www.linkedin.com/in/mmalter31 https://www.linkedin.com/pub/mike-develin/59/16b/206 https://www.linkedin.com/in/josiahdavis https://www.linkedin.com/in/eymwang https://www.linkedin.com/in/zhaoyuchen https://www.linkedin.com/in/polimath https://www.linkedin.com/in/edpodojil https://www.linkedin.com/pub/saikat-mukherjee/1/484/388 https://www.linkedin.com/in/mohammadsabah https://www.linkedin.com/in/joshualande https://www.linkedin.com/in/eggevanderpoel https://www.linkedin.com/pub/christina-zou/9/151/b96 https://www.linkedin.com/in/rbandyopadhyay https://www.linkedin.com/in/berkeleyjess https://www.linkedin.com/pub/nachum-shacham/1/9b9/64 https://www.linkedin.com/in/ddeepakkumar https://www.linkedin.com/pub/eliana-feasley/21/574/b73 https://www.linkedin.com/in/karthikmramasamy https://www.linkedin.com/in/chrissimokat https://www.linkedin.com/pub/amit-phansalkar/4/3a6/44 https://www.linkedin.com/pub/kaushik-das/1/581/519 https://www.linkedin.com/in/danmallinger https://www.linkedin.com/pub/vinay-satish-kumar/9/b56/828 https://www.linkedin.com/in/raghavmadhavan https://www.linkedin.com/pub/yuan-ren/7/75/aa9 https://www.linkedin.com/in/pedroalvesds https://www.linkedin.com/pub/arun-veettil/14/70b/b83 https://www.linkedin.com/pub/zhigang-hua/3/bb7/b50 https://www.linkedin.com/pub/rohit-mittal/6/30a/58a https://www.linkedin.com/pub/lisa-qian/26/43/98b https://www.linkedin.com/pub/dave-holtz/20/262/4 https://www.linkedin.com/pub/ricardo-bion/2a/537/4b5 https://www.linkedin.com/in/erincoffman https://www.linkedin.com/pub/markus-emsermann/b/412/5b8 https://www.linkedin.com/in/jbenjamincook https://www.linkedin.com/pub/catherine-o-neil/23/b38/24 https://www.linkedin.com/in/igorelbert https://www.linkedin.com/pub/ryan-milligan/2b/824/629 https://www.linkedin.com/in/miketamir"))