
if (document.getElementById("balanceInject") == null) {
    inject();
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
        balanceInject.innerText = balance;
    })

}
