var exchangeRate = null;



if (document.getElementById("balanceInject") == null) {
    inject();
    fetchExchangeRate();
}
setInterval(() => {
    update();
}, 10000);

function inject() {
    fetch(chrome.runtime.getURL('/inject.html'))
        .then(response => response.text())
        .then(data => {
            var inject = document.createElement("li");
            inject.innerHTML = data;
            var widgetGroup = document.getElementsByClassName("widgets-group")[0];
            widgetGroup.prepend(inject);
            update();
        }).catch(err => {
            // handle error
        });

}

function update() {
    var balanceInject = document.getElementById('Balance__label');
    if (balanceInject == null) return;
    fetch('https://unbabel.com/editor/dashboard/account/').then(e => e.text()).then(body => {
        var domParser = new DOMParser();
        var dom = domParser.parseFromString(body, "text/html");
        var balance = dom.getElementsByClassName('money')[0].innerText;
        var balanceNmbr = Number.parseFloat(balance.split("$")[1]);
        var balanceText = "$" + balanceNmbr.toFixed(2);
        
        if(exchangeRate != null){
            balanceText = "" + (balanceNmbr * exchangeRate).toFixed(2) + "€";
        }
        
        balanceInject.innerText = balanceText;

    })

}

function fetchExchangeRate(){
    fetch("https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=USD&to=EUR&amount=1", {
        "method": "GET",
        "headers": apiHeaders
    })
    .then(res => res.json()).then(json=>{
        exchangeRate = Number.parseFloat(json.rates.EUR.rate) * 0.965;
    });
}