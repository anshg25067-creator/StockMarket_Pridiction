function searchStock() {
  var symbol = document.getElementById("input").value;

  if (symbol === "") {
    alert("Enter stock name!");
    return;
  }

  const container = document.getElementById("display");
  const loading = document.getElementById("loading");
  const title = document.getElementById("title");

  container.innerHTML = "";
  loading.innerText = "Loading...";
  title.innerText = symbol;
  fetch("https://api.marketstack.com/v1/eod?access_key=620b37f084bb289a80ab24c801e6e2ec&symbols="+symbol)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      loading.innerText = "";
      if (!data.data || data.data.length === 0) {
        loading.innerText = "data not found";
        return;
      }
      let stock = data.data[0];
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML =
        "<h3 style='color:#3bb69d;font-size:40px;'>" + stock.symbol + "</h3>" +
        "<p>OpenPrice: " + stock.open + "</p>" +
        "<p>ClosePrice: " + stock.close + "</p>" +
        "<p>HighLimit: " + stock.high + "</p>" +
        "<p>LowLimit: " + stock.low + "</p>";
      container.appendChild(card);
    })
    .catch(function(error) {
      console.log(error);
      loading.innerText = "Error in fetching data!";
    });
}
