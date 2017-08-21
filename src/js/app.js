// Coordinates the interaction of elements on the page
(function() {

    var DOM = {};

    DOM.secret = $("#secret");
    DOM.generate = $("#generate");
    DOM.result = $("#result");

    function init() {
        // Events
        DOM.generate.addEventListener("click", generateCode);
    }

    function generateCode() {
        // Clear old generated
        DOM.result.innerHTML = "";
        // Get the input values
        var secret = DOM.secret.value;
        var code = generateSteamGuardCode(secret);

        DOM.result.innerHTML = code;
    }

    init();

})();
