async function searchStock() {
  const symbol = document.getElementById("input").value;

  if (symbol === "") {
    alert("Enter stock name!");
    return;
  }

  const container = document.getElementById("display");
  const loading = document.getElementById("loading");
  const title = document.getElementById("title");

  container.innerHTML = "";
  title.innerText = symbol;

  const url = `https://api.marketstack.com/v1/eod?access_key=57d1f86de6a181fb179b6c0e6c408f97&symbols=${symbol}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    loading.innerText = "";

    if (data.data.length === 0) {
      loading.innerText = "Data not found";
      return;
    }

    const stock = data.data[0];

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3 style="color:#3bb69d;font-size:40px;">Real-Time Data for ${stock.symbol}</h3>
      <p>OpenPrice: ${stock.open}</p>
      <p>ClosePrice: ${stock.close}</p>
      <p>HighLimit: ${stock.high}</p>
      <p>LowLimit: ${stock.low}</p>
    `;

    container.appendChild(card);

  } catch (error) {
    console.log(error);
    loading.innerText = "Error in fetching data!";
  }
}

function toggleTheme() {
  document.body.classList.toggle("light");
}