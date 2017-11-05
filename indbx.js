function bxCycle(){ //cycle html for indbx identifiers
	var bxRegEx =  /bx\d*y\d*w\d*h\d*/i //identifier expression for bxStore
	var bxStore = new Array()
	for (i in document.getElementsByTagName('div')) {
		if (bxRegEx.test(i)){
			bxStore.push(bxRegEx.exec(i))
		}
	}
	return bxStore
}
function bxInd(){
	for (n in bxCycle()){
		var bxVar = '#' + bxCycle()[n]
		var bxHorizonRg = /[xX]\d*[yY]/ //horizontal amnt of elements
		var bxVertRg = /[yY]\d*[wW]/ //vertical amnt of elements
		var bxHeightRg = /[hH]\d*/ //element height
		var bxWidthRg = /[wW]\d*[hH]/ //element width
		var bxHorizonExec = bxHorizonRg.exec(bxVar)
		var bxHorizonGet = bxHorizonExec.toString().match(/\d+/g)
		var bxVertExec = bxVertRg.exec(bxVar)
		var bxVertGet = bxVertExec.toString().match(/\d+/g)
		var bxHeightExec = bxHeightRg.exec(bxVar)
		var bxHeightGet = bxHeightExec.toString().match(/\d+/g)
		var bxWidthExec = bxWidthRg.exec(bxVar)
		var bxWidthGet = bxWidthExec.toString().match(/\d+/g)
		var bxWidthStr = bxWidthGet + 'px'
		var bxHeightStr = bxHeightGet + 'px'
		for (h = 0; h < parseInt(bxHorizonGet) * parseInt(bxVertGet); h++) {
			bxElement = document.createElement('div')
			bxElement.setAttribute('id','bxEle'+h)
			$(bxVar).append(bxElement)
		}
		function bxMargin(){
			var bxAllMargin = parseInt($('.indbx'+n).css('margin')) * (parseInt(bxHorizonGet) * 2)
			var bxHorizonAcc = (parseInt(bxHorizonGet) *  parseInt(bxWidthGet)) + bxAllMargin
			var bxMarginTot = bxHorizonAcc.toString() + 'px'
			return bxMarginTot
		}
		function bxBowlDepth(){
			var bxAllMargin = parseInt($('.indbx'+n).css('margin')) * (parseInt(bxHorizonGet) * 2)
			var bxVertAcc = (parseInt(bxVertGet) * parseInt(bxHeightGet) + bxAllMargin)
			var bxMarginTot = bxVertAcc.toString() + 'px'
		}
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