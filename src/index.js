const $chart = document.getElementById("chart");
const $submit = document.getElementById("submit");
const $slider = document.getElementById("slider");
const $principal = document.getElementById("principal");
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
      title: "Term"
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
    total_return: "Expected Return"
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

const formatMoney = number => `$${Number(number).toFixed(2)}`;

const main = async () => {
  const handleSubmit = async () => {
    const risk = document.querySelector('input[name="risk"]:checked').value;
    const data = await getCharts($principal.value, risk);

    plotChart(format(data));
  };

  const handleSlide = () => {
    const $savings = document.getElementById("savings");
    const $interest = document.getElementById("interest");
    const $return = document.getElementById("return");
    const $term = document.getElementById("term");
    console.log("here");

    const selectedTerm = $slider.value;
    const { total_interest, expected_savings, total_return } = chartData.find(
      ({ terms }) => terms === parseInt(selectedTerm)
    );

    $term.textContent = `${selectedTerm} months`;
    $savings.textContent = formatMoney(expected_savings);
    $return.textContent = formatMoney(total_return);
    $interest.textContent = formatMoney(total_interest);
  };

  $principal.value = 100000;

  const data = await getCharts(100000, "medium_risk");

  plotChart(format(data));

  $submit.addEventListener("click", handleSubmit);
  $slider.addEventListener("input", handleSlide);
};

main();
