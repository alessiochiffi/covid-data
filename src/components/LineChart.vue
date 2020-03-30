<template>
  <div>
    <h2>{{ nation }}</h2>
    <div class="box">
      <span class="box__figure">{{ this.confirmedCases[confirmedCases.length - 1] }}</span>
      <p>Confirmed cases</p>
    </div>
    <canvas :id="nation"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  props: {
    nation: String,
  },
  data: () => ({
    labels: [],
    confirmedCases: [],
    deaths: []
  }),
  mounted() {
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then(response => response.json())
      .then(data => {
        data[this.$props.nation].forEach(({date, confirmed, deaths}) => {
          if (date.indexOf('-2-') === -1 && date.indexOf('-1-') === -1) {
            this.labels.push(date);
            this.confirmedCases.push(confirmed);
            this.deaths.push(deaths);
          }
        });
      })
      .then(() => {
        this.initChart();
      });
  },
  methods: {
    initChart() {
      const ctx = document.getElementById(`${this.$props.nation}`);
      // eslint-disable-next-line
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [{
              label: 'Deaths',
              data: this.deaths,
              backgroundColor: [
                'rgb(255, 0, 0)', // red
              ],
              borderColor: [
                '#000',
              ],
              borderWidth: 1
            },
            { // one line graph
              label: 'Number of Confirmed cases',
              data: this.confirmedCases,
              backgroundColor: [
                '#e67e22', // Blue
              ],
              borderColor: [
                '#36dsad',
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 21,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                padding: 5,
              }
            }]
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
.box {
  align-items: center;
  border-radius: 20px;
  border: 1px solid #dedede;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem 0;
  max-width: 200px;
  padding: 1rem .3rem;
  text-align: center;
  width: auto;

    p {
      margin-bottom: 0 !important;
    }

    &__figure {
      font-size: 1.7rem;
      font-weight: bold;
      color: #933c0d;
    }
}
</style>