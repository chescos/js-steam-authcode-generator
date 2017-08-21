function generateSteamGuardCode(sharedSecret)
{
    var decodedSharedSecret = atob(sharedSecret);
    var steamTime = getSteamTime();
    var timeHash = createTimeHash(steamTime);
    var hmac = createHmac(timeHash, decodedSharedSecret);

    hmac = Object.keys(hmac).map(function (key) {
        return hmac[key];
    });

    hmac = startArrayToZero(hmac);

    var b = intToByte((hmac[19] & 0xF));
    var codePoint = (hmac[b] & 0x7F) << 24 | (hmac[b+1] & 0xFF) << 16 | (hmac[b+2] & 0xFF) << 8 | (hmac[b+3] & 0xFF);

    var steamChars = '23456789BCDFGHJKMNPQRTVWXY';
    var code = '';

    for(i = 0; i < 5; i++) {
        code = code + steamChars[Math.floor(codePoint) % steamChars.length];
        codePoint /= steamChars.length;
    }

    return code;
}

function intToByte(integer)
{
	return integer & (0xff);
}

function createTimeHash(timestamp)
{
	timestamp /= 30;
	var timeArray = [];

	for(i = 8; i > 0; i--) {
		timeArray[i - 1] = intToByte(timestamp);
		timestamp >>= 8;
	}

	var newTimeArray = '';

	timeArray.forEach(function(val) {
		newTimeArray += String.fromCharCode(val);
	});

	return newTimeArray;
}

function createHmac(timeHash, sharedSecretDecoded)
{
    var shaObj = new jsSHA("SHA-1", "BYTES");
    shaObj.setHMACKey(sharedSecretDecoded, "BYTES");
    shaObj.update(timeHash);
    var hash = shaObj.getHMAC("HEX");
    var hmac = unpack('C*', pack('H*', hash));

    return hmac;
}

function startArrayToZero(array)
{
    var mode = [];
    var intModeArray = 0;

    array.forEach(function(val) {
        mode[intModeArray] = intToByte(val);
        intModeArray++;
    });

    return mode;
}

function getSteamTime()
{
    return Math.floor(Date.now() / 1000) + 10;
}

function debugString(data)
{
    for(i = 0; i < data.length; i++) {
       console.log(data[i].charCodeAt(0));
    }
}
