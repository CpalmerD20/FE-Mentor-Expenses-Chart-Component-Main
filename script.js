
const url = "./data.json";

async function getWeeklyData() {
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
    element.style.height = `${100 * obj["amount"] / maxSpent}px`;
    document.querySelector(`.p${idx}`).textContent = "$" + obj["amount"];
  })
  document.querySelector(`.${maxDay}`).classList.add('max');
}

getWeeklyData();
