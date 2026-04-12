async function searchStock() {
  const symbol = document.getElementById("input").value.toUpperCase();

  if (symbol === "") {
    alert("Please enter stock name!");
    return;
  }

  const container = document.getElementById("display");
  container.innerHTML = "";

  try {
    const url = `https://api.marketstack.com/v1/eod?access_key=57d1f86de6a181fb179b6c0e6c408f97&symbols=${symbol}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.data.length === 0) {
      alert("No data found!");
      return;
    }

    let stocks = data.data.map(stock => {
      let diff = stock.close - stock.open;
      return {
        ...stock,
        diff: diff,
        absDiff: Math.abs(diff)
      };
    });

    stocks.sort((a, b) => b.absDiff - a.absDiff);


    stocks.forEach(stock => {
      let div = document.createElement("div");
      div.className = "card";

  
      if (stock.diff > 0) {
        div.style.backgroundColor = "#69c39b"; 
      } else {
        div.style.backgroundColor = "#c25962"; 
      }

      div.innerHTML = `
        <h3>${stock.symbol}</h3>
        <p>Open: ${stock.open}</p>
        <p>Close: ${stock.close}</p>
        <p>Difference: ${stock.diff.toFixed(2)}</p>
        <p>Date: ${new Date(stock.date).toLocaleDateString()}</p>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.log(error);
    alert("Error in fetching data");
  }
}