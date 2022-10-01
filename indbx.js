// Primary js data file

//reads html with regular expression for applicable tags
function bxCycle(){
	var bxRegEx =  /bx\d*y\d*w\d*h\d*/i
	var bxStore = new Array()
	//checks all DIV tags for an acceptable ID
	for (i in document.getElementsByTagName('div')) {
		if (bxRegEx.test(i)){
			bxStore.push(bxRegEx.exec(i))
		}
	}
	return bxStore
}

//converts found ID strings to the appropriate CSS data
function bxInd(){
	for (n in bxCycle()){
		var bxVar = '#' + bxCycle()[n] //stores the full ID string as a variable
		var bxHorizonRg = /[xX]\d*[yY]/ //horizontal amnt of elements identifier
		var bxVertRg = /[yY]\d*[wW]/ //vertical amnt of elements identifier
		var bxHeightRg = /[hH]\d*/ //element height identifier
		var bxWidthRg = /[wW]\d*[hH]/ //element width identifier
		
		//stores elements as usable values based off RegEx findings
		//bxNameEXEC variables use RegEx to isolate the applicable value. bxNameGET convers that value to a string for css injection.
		var bxHorizonExec = bxHorizonRg.exec(bxVar) //horizontal amnt of elements value
		var bxHorizonGet = bxHorizonExec.toString().match(/\d+/g) //convert to string
		var bxVertExec = bxVertRg.exec(bxVar) //vertical amnt of elements value
		var bxVertGet = bxVertExec.toString().match(/\d+/g) //convert to string
		var bxHeightExec = bxHeightRg.exec(bxVar) //box height
		var bxHeightGet = bxHeightExec.toString().match(/\d+/g)
		var bxWidthExec = bxWidthRg.exec(bxVar)
		var bxWidthGet = bxWidthExec.toString().match(/\d+/g)
		var bxWidthStr = bxWidthGet + 'px'
		var bxHeightStr = bxHeightGet + 'px'
		//create new ID specific to each applicable DIV
		for (h = 0; h < parseInt(bxHorizonGet) * parseInt(bxVertGet); h++) {
			bxElement = document.createElement('div')
			bxElement.setAttribute('id','bxEle'+h)
			$(bxVar).append(bxElement)
		}
		//calculate width margin and sizing
		function bxMargin(){
			var bxAllMargin = parseInt($('.indbx'+n).css('margin')) * (parseInt(bxHorizonGet) * 2)
			var bxHorizonAcc = (parseInt(bxHorizonGet) *  parseInt(bxWidthGet)) + bxAllMargin
			var bxMarginTot = bxHorizonAcc.toString() + 'px'
			return bxMarginTot
		}
		//calculate height margin and sizing
		function bxBowlDepth(){
			var bxAllMargin = parseInt($('.indbx'+n).css('margin')) * (parseInt(bxHorizonGet) * 2)
			var bxVertAcc = (parseInt(bxVertGet) * parseInt(bxHeightGet) + bxAllMargin)
			var bxMarginTot = bxVertAcc.toString() + 'px'
		}
		//apply generated strings to CSS elements
		$(bxVar).children().addClass('indbx indbx' + n)
		$(bxVar).css('width', bxMargin())
		$(bxVar).css('height', bxBowlDepth())
		$(bxVar).children().css('width', bxWidthStr)
		$(bxVar).children().css('height', bxHeightStr)
		bxBowlDepth()
	}
}

$(document).ready(function(){
	bxInd()
})
