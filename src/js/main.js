let removeSpecialCharacters = (string) => {
	return string.replace(/[^a-zA-Z0-9]/g, '')
}

let formatPhoneNumber = (number) => {
  const numberStripped = removeSpecialCharacters(number)
 	const numberTailored = numberStripped.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "$1.$2.$3")
  
  return numberTailored
}

let updateCSVRowCount = () => {
	d3.csv("./signatures-data.csv", function(data) {
	  let team = data,
	  		count = 0

		for (let member of team) {
			count ++
		}

		$("#rowCount span").text(count)
	})
}

$(document).ready(function() {
  updateCSVRowCount()
});

let downloadSignatures = () => {
	d3.csv("./signatures-data.csv", function(data) {
	  let team = data,
	  		count = 0
		for (let member of team) {
			let firstName = member.firstName
			let firstIntial = firstName.charAt(0)
			let fileName = firstIntial + member.lastName + ".htm"
			setupFile( buildSignaturesHTML(member), fileName.toLowerCase() )
			$("#doneCount span").text(count)
			count++
		}

	})
}

let downloadSingleSignature = () => {
	d3.csv("./signatures-data.csv", function(data) {
	  let team = data
		let firstName = team[0].firstName
		let firstIntial = firstName.charAt(0)
		let fileName = firstIntial + team[0].lastName + ".htm"

		setupFile( buildSignaturesHTML(team[0]), fileName.toLowerCase() )

	})
}

let setupFile = (html, fileName) => {
	let blob = new Blob([html], {type: "text/plaincharset=utf-8"})
	saveAs(blob, fileName)
}

let buildSignaturesHTML = (data) => {
	let first = data.firstName,
			last =  data.lastName,
			creds =  data.credentials,
			title = data.title,
			phone = formatPhoneNumber( data.phone ),
			cell = data.cell

  if(creds !== '') creds = ', ' + creds
  if(cell !== '')formatPhoneNumber(cell)

  // divided signature ***
  let sigNameCreds = '<meta name="format-detection" content="telephone=no"><br><table width="320" id="sig" cellspacing="0" cellpadding="0" border-spacing="0" style="margin:0padding:0"><tr><td width="100" style="width:86pxmargin:0padding-right:9px"><a href="http://www.atacpa.net/"><img border="0" width="100" height="100" src="http://atacpa.net/signature/assets/images/ata-logo.jpg"></a></td><td width="10" style="width:5px">&nbsp</td><td valign="top" style="margin:0padding:0padding-top:10px"><table id="sig2" cellspacing="0" cellpadding="0" border-spacing="0" style="line-height: 1.4emborder:nonetext-decoration:nonepadding:0margin:0font-family:helvetica,arial,sans-seriffont-size:12pxcolor:#b0b0b0border-collapse:collapse-webkit-text-size-adjust:none"><tr style="margin:0padding:0"><td style="margin:0padding:0font-family:helvetica,arial,sans-serifwhite-space:nowrap"><b><span style="font-size:11.0ptcolor:#00AEEA">'+ first + ' ' + last +'</span></b><span style="font-size:11.0ptcolor:#919191">'+ creds +'</span></td></tr>',
		  sigTitle = '<tr style="margin:0padding:0"><td style="margin:0padding:0font-family:helvetica,arial,sans-serifwhite-space:nowrap"><span style="font-size:10.0ptcolor:#919191">'+ title +'</span></td></tr>',
		  sigPhone = '<tr style="margin:0padding:0color:#b0a49b"><td style="margin:0padding:0white-space:nowrap"><span style="font-size:10.0ptcolor:#00AEEA">P&nbsp</span><a href="tel:'+ phone +'" target="_blank" style="border:nonetext-decoration:none"><span style="border:nonefont-size:10.0ptcolor:#919191text-decoration:none">'+ phone +'</a></td></tr>',
		  sigCell = '<tr style="margin:0padding:0color:#b0a49b"><td style="margin:0padding:0white-space:nowrap"><span style="font-size:10.0ptcolor:#00AEEA">C&nbsp</span><a href="tel:'+ cell +'" target="_blank" style="border:nonetext-decoration:none"><span style="border:nonefont-size:10.0ptcolor:#919191text-decoration:none">'+ cell +'</a></td></tr>',
		  sigEnding = '<tr style="margin:0padding:0color:#b0a49b"><td style="margin:0padding:0white-space:nowrap"><span style="font-size:10.0ptcolor:#919191">Alexander Thompson Arnold PLLC</span></td></tr><tr style="margin:0padding:0color:#b0a49b"><td style="margin:0padding:0white-space:nowrap"><a href="http://www.atacpa.net/" target="_blank" style="border:nonetext-decoration:none"><span style="font-size:10.0ptcolor:#919191text-decoration:none">www.atacpa.net</span></a></span></td></tr></table></td></tr></table><br>'

  // concat parts of signature together
  if (cell !== '')
    return signature = sigNameCreds + sigTitle + sigPhone + sigCell + sigEnding
  else
  	return signature = sigNameCreds + sigTitle + sigPhone + sigEnding
}