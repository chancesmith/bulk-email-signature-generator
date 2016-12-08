let removeSpecialCharacters = (string) => {
	return string.replace(/[^a-zA-Z0-9]/g, '')
}

let formatPhoneNumber = (number) => {
  const numberStripped = removeSpecialCharacters(number),
  			numberTailored = numberStripped.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "$1.$2.$3")
  
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
			let firstName = member.firstName,
					firstIntial = firstName.charAt(0),
					fileName = firstIntial + member.lastName + ".htm"
			setupFile( buildSignaturesHTML(member), fileName.toLowerCase() )
			$("#doneCount span").text(count)
			count++
		}

	})
}

let downloadSingleSignature = () => {
	d3.csv("./signatures-data.csv", function(data) {
	  let team = data,
	  		firstName = team[0].firstName,
	  		firstIntial = firstName.charAt(0),
	  		fileName = firstIntial + team[0].lastName + ".htm",
	  		signature = buildSignaturesHTML(team[0])

		setupFile( signature, fileName.toLowerCase() )

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
  let sigNameCreds = '<head><style>table{margin:0;padding:0;}tr{margin:0;padding:0;}.font{font-family:helvetica,arial,sans-serif;}.inner-td{margin:0;padding:0;white-space:nowrap;}.color-tr{color:#b0a49b;}.logo-td1{width:86px;margin:0;padding-right:9px;}.logo-td2{width:5px;}.right-top-td{margin:0;padding:0;padding-top:10px;}.right-table{border:none;text-decoration:none;font-family:helvetica,arial,sans-serif;font-size:12px;color:#b0b0b0;border-collapse:collapse;-webkit-text-size-adjust:none;margin-left: 8px;}.name-span{font-size:11.0pt;color:#00AEEA;}.cred-span{font-size:11.0pt;color:#919191;}.position-span{font-size:10.0pt;color:#919191;}.phone-letter{font-size:10.0pt;color:#00AEEA;}.no-dec{border:none;text-decoration:none;}.phone-number{border:none;font-size:10.0pt;color:#919191;text-decoration:none;}.web-link{font-size:10.0pt;color:#919191;text-decoration:none;}</style></head><body><meta name="format-detection" content="telephone=no"><br><table width="320" id="sig" cellspacing="0" cellpadding="0" border-spacing="0" style="margin: 0;padding: 0;"><tr style="margin: 0;padding: 0;"><td width="100" class="top-td"><a href="http://www.atacpa.net/"><img border="0" width="100" height="100" src="http://atacpa.net/signature/assets/images/ata-logo.jpg"></a></td><td width="10" class="logo-td2" style="width: 5px;">&nbsp;</td><td valign="top" class="right-top-td" style="margin: 0;padding: 0;padding-top: 10px;"><table id="sig2" cellspacing="0" cellpadding="0" border-spacing="0" class="right-table" style="margin: 0;margin-left: 8px;padding: 0;border: none;text-decoration: none;font-family: helvetica,arial,sans-serif;font-size: 12px;color: #b0b0b0;border-collapse: collapse;-webkit-text-size-adjust: none;"><tr style="margin: 0;padding: 0;"><td class="inner-td font" style="font-family: helvetica,arial,sans-serif;margin: 0;padding: 0;white-space: nowrap;"><b><span class="name-span" style="font-size: 11.0pt;color: #00AEEA;">'+ first + ' ' + last +'</span></b><span class="cred-span" style="font-size: 11.0pt;color: #919191;">'+ creds +'</span></td></tr>',
  		sigTitle = '<tr style="margin: 0;padding: 0;"><td class="inner-td font" style="font-family: helvetica,arial,sans-serif;margin: 0;padding: 0;white-space: nowrap;"><span class="position-span" style="font-size: 10.0pt;color: #919191;">'+ title +'</span></td></tr>',
  		sigPhone = '<tr class="color-tr" style="margin: 0;padding: 0;color: #b0a49b;"><td class="inner-td" style="margin: 0;padding: 0;white-space: nowrap;"><span class="phone-letter" style="font-size: 10.0pt;color: #00AEEA;">P&nbsp;</span><a href="tel:'+ phone +'" target="_blank" class="no-dec" style="border: none;text-decoration: none;"><span class="phone-number" style="border: none;font-size: 10.0pt;color: #919191;text-decoration: none;">'+ phone +'</span></a></td></tr>',
  		sigCell = '<tr class="color-tr" style="margin: 0;padding: 0;color: #b0a49b;"><td class="inner-td" style="margin: 0;padding: 0;white-space: nowrap;"><span class="phone-letter" style="font-size: 10.0pt;color: #00AEEA;">C&nbsp;</span><a href="tel:'+ cell +'" target="_blank" class="no-dec" style="border: none;text-decoration: none;"><span class="phone-number" style="border: none;font-size: 10.0pt;color: #919191;text-decoration: none;">'+ cell +'</span></a></td></tr>',
  		sigEnding = '<tr class="color-tr" style="margin: 0;padding: 0;color: #b0a49b;"><td class="inner-td" style="margin: 0;padding: 0;white-space: nowrap;"><span class="position-span" style="font-size: 10.0pt;color: #919191;">Alexander Thompson Arnold PLLC</span></td></tr><tr class="color-tr" style="margin: 0;padding: 0;color: #b0a49b;"><td class="inner-td" style="margin: 0;padding: 0;white-space: nowrap;"><a href="http://www.atacpa.net/" target="_blank" class="no-dec" style="border: none;text-decoration: none;"><span class="web-link" style="font-size: 10.0pt;color: #919191;text-decoration: none;">www.atacpa.net</span></a></td></tr></table></td></tr></table><br></body>';

  // concat parts of signature together
  if (cell !== '')
    return signature = sigNameCreds + sigTitle + sigPhone + sigCell + sigEnding
  else
  	return signature = sigNameCreds + sigTitle + sigPhone + sigEnding
}