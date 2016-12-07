// count row on excel sheet


var downloadSignatures = () => {
	var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "hello world.txt");
}