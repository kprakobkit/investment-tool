const $chart = document.getElementById("chart");
const $submit = document.getElementById("submit");
const $slider = document.getElementById("slider");
const $principal = document.getElementById("principal");
const $savings = document.getElementById("savings");
const $interest = document.getElementById("interest");
const $return = document.getElementById("return");
const $term = document.getElementById("term");
const $rate = document.getElementById("rate");
const $payment = document.getElementById("payment");

let chartData;

const getCharts = async (principal, risk) => {
  const response = await fetch(`/results?amount=${principal}&risk=${risk}`);
  const data = await response.json();
  chartData = data;

  return data;
};

const plotChart = data => {
  Plotly.newPlot($chart, data, {
    margin: { t: 0 },
    xaxis: {
      title: "Term (months)"
    },
    yaxis: {
      title: "Dollars ($)"
    }
  });
};

const format = data => {
  const labelsAndKeys = {
    expected_savings: "Expected Savings",
    total_interest: "Total Interest",
    expected_return: "Expected Return"
  };
  const terms = data.map(({ terms }) => terms);

  return Object.keys(labelsAndKeys).reduce(
    (memo, key) =>
      memo.concat({
        x: terms,
        y: data.map(entry => entry[key]),
        name: labelsAndKeys[key]
      }),
    []
  );
};

const formatMoney = number => {
  const numberWithCommas = x =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `$${numberWithCommas(Number(number).toFixed(0))}`;
};

populateLoanProfile = selectedTerm => {
  const {
    total_interest,
    expected_savings,
    expected_return,
    pmt,
    rate = Math.random()
  } = chartData.find(({ terms }) => terms === parseInt(selectedTerm));

  $term.textContent = `${selectedTerm} months`;
  $savings.textContent = formatMoney(expected_savings);
  $return.textContent = formatMoney(expected_return);
  $interest.textContent = formatMoney(total_interest);
  $rate.textContent = `${rate}%`;
  $payment.textContent = formatMoney(pmt);
};

const main = async () => {
  const handleSubmit = async () => {
    const risk = document.querySelector('input[name="risk"]:checked').value;
    const data = await getCharts($principal.value, risk);

    plotChart(format(data));
  };

  const handleSlide = () => {
    const selectedTerm = $slider.value;

    populateLoanProfile(selectedTerm);
  };

  $principal.value = 100000;
  $term.textContent = 120;

  const data = await getCharts(100000, "medium_risk");

  plotChart(format(data));

  $submit.addEventListener("click", handleSubmit);
  $slider.addEventListener("input", handleSlide);

  populateLoanProfile(120);
};

main();
