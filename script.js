
async function getWeeklyData() {
  const US_DOLLARS = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const url = "./data.json";
  const reply = await fetch(url);
  const weeklySpending = await reply.json(); /*array of objects*/

  let maxSpent = -1;
  let maxDay = "mon";

  weeklySpending.forEach(obj => {
    const day = obj["day"];
    const amount = obj["amount"];
    maxDay = maxSpent > amount ? maxDay : day;
    maxSpent = maxSpent > amount ? maxSpent : amount;
  })

  weeklySpending.forEach((obj, idx) => {
    const element = document.querySelector(`.${obj["day"]}`);
    element.style.height = `${200 * obj["amount"] / maxSpent}px`;
    document.querySelector(`.p${idx}`).textContent = "" + US_DOLLARS.format(obj["amount"]);
  })
  document.querySelector(`.${maxDay}`).classList.add('max');
}

getWeeklyData();
