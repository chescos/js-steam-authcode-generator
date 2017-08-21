// Coordinates the interaction of elements on the page
(function() {

    var DOM = {};

    DOM.secret = $("#secret");
    DOM.generate = $("#generate");
    DOM.result = $("#result");

    function init() {
        // events
        DOM.generate.addEventListener("click", generateCode);
    }

    function generateCode() {
        // clear old result
        DOM.result.innerHTML = "";

        // get the input secret
        var secret = DOM.secret.value;
        var code = '';

        // secret key is too short or does not end with "="
        if(secret.length > 10 || secret.substr(secret.length - 1) !== '=') {
            code = 'Invalid secret key';
        }
        else {
            code = generateSteamGuardCode(secret);
        }

        DOM.result.innerHTML = code;
    }

    init();

})();
