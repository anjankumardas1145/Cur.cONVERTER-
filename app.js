const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const btn = document.querySelector("form button");

const updateExchangeRate = async () => {
  try {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    
    const URL = `${BASE_URL}/${fromCurr.value}`;
    const response = await fetch(URL);
    
    if (!response.ok) throw new Error("Failed to fetch exchange rate data.");
    
    const data = await response.json();
    const rate = data.rates[toCurr.value];
    
    if (!rate) throw new Error("Currency rate not found.");
    
    const finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error: " + error.message;
  }
};

const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

const populateDropdown = (selectElement) => {
  Object.keys(countryList).forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.textContent = currency;
    selectElement.appendChild(option);
  });
};

window.addEventListener("load", () => {
  const fromSelect = document.querySelector(".from select");
  const toSelect = document.querySelector(".to select");
  
  populateDropdown(fromSelect);
  populateDropdown(toSelect);

  fromSelect.value = "USD";
  toSelect.value = "INR";

  updateFlag(fromSelect);
  updateFlag(toSelect);
  updateExchangeRate();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

fromCurr.addEventListener("change", () => updateFlag(fromCurr));
toCurr.addEventListener("change", () => updateFlag(toCurr));
