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

(cleanup("https://www.linkedin.com/in/gadibenzvi https://www.linkedin.com/in/paulthomsen https://www.linkedin.com/in/harshjitsethi https://www.linkedin.com/pub/zindzi-mccormick/b/8a4/a35 https://www.linkedin.com/in/ksenya https://www.linkedin.com/pub/john-nack/0/87b/b38 https://www.linkedin.com/in/adamazzara https://www.linkedin.com/in/sibozhao https://www.linkedin.com/in/amandabeuckelaere https://www.linkedin.com/in/katieschmalzried https://www.linkedin.com/pub/isi-azeke/8/6b9/29a https://www.linkedin.com/in/lahini https://www.linkedin.com/in/jonkrafcik https://www.linkedin.com/in/ericarios https://www.linkedin.com/pub/aubrey-gray/63/613/2a3 https://www.linkedin.com/in/alexandrelee https://www.linkedin.com/in/merlindowse73 https://www.linkedin.com/in/toddsherman https://in.linkedin.com/in/prodman https://www.linkedin.com/pub/wei-luo/9/805/7a3 https://in.linkedin.com/pub/product-manager/7a/b92/644 https://gr.linkedin.com/pub/ product-manager/48/259/415 https://ca.linkedin.com/pub/product-manager/b4/8b8/695 https://www.linkedin.com/pub/cédric-hutchings/0/99a/886 https://www.linkedin.com/pub/judith-van-der-star/3/651/872 https://uk.linkedin.com/pub/john-robins/36/321/ab6 https://pk.linkedin.com/pub/shahzad-faisal/a/440/88a https://il.linkedin.com/pub/amir-cohen/14/5b4/99a https://www.linkedin.com/pub/fabian-portehaut/58/588/419 https://www.linkedin.com/pub/angelique-smolinski/1/635/b7a https://uk.linkedin.com/pub/natalie-hopkins/7/bb4/b97 https://www.linkedin.com/pub/david-darg/12/2a/956/es https://in.linkedin.com/pub/abhishek-chandhock/14/852/a50 https://www.linkedin.com/in/rachaelwilcox1/fr https://fr.linkedin.com/pub/hadja-kane/4/b93/870 https://www.linkedin.com/pub/akin-oladipo/a4/925/b98 https://tw.linkedin.com/pub/hsien-yi-stanley-huang/8/b5b/33 https://uk.linkedin.com/pub/rickwood-dave/4/67a/266 https://www.linkedin.com/pub/alec-motamed/86/aaa/9b4 https://www.linkedin.com/pub/stuart-mcguigan/4/751/b46/nl https://www.linkedin.com/pub/ulla-cocke/5/410/240 https://www.linkedin.com/pub/jace-quayle/42/585/300/it https://www.linkedin.com/pub/stefan-goedegebure/18/a34/623 https://se.linkedin.com/pub/egon-danielsson/0/1b4/644/es https://www.linkedin.com/in/calvinclee https://www.linkedin.com/pub/julia-katz/4a/270/aa0 https://www.linkedin.com/pub/edel-tryse/4b/272/a10 https://www.linkedin.com/pub/emelie-tibblin/55/742/4ab https://www.linkedin.com/pub/maya-moléa/4b/943/9b0 https://www.linkedin.com/in/madejongh/nl https://www.linkedin.com/pub/damon-hopley/1/797/ab2 https://nz.linkedin.com/pub/zhaokun-zong/55/142/264 https://www.linkedin.com/pub/zein-el-etnawy/6a/209/9aa https://www.linkedin.com/pub/narelle-whiteley/22/708/54b https://www.linkedin.com/pub/jennifer-gabel/9/b24/a91 https://www.linkedin.com/pub/arun-sundaram/18/447/a5a https://www.linkedin.com/pub/freddy-corlier/12/838/361 https://www.linkedin.com/pub/antes-digiesi/72/b32/390 https://www.linkedin.com/pub/stefan-smith/36/276/931 https://www.linkedin.com/pub/gregory-mccabe/6/a09/14a https://www.linkedin.com/pub/john-schouwman/88/220/231 https://www.linkedin.com/pub/edith-kock/19/3a1/225 https://www.linkedin.com/pub/daphne-van-dijk-blom/15/651/853 https://www.linkedin.com/pub/henrik-iversen/8a/4b9/594 https://www.linkedin.com/pub/marco-buggle/b1/179/91a https://www.linkedin.com/pub/peterson-bruce/23/457/b05"))