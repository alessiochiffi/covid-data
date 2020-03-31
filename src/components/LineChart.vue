<template>
  <div>
    <h2 class="nation">{{ nation }}</h2>
    <v-row align="center" justify="start">
      <v-col cols="6" md="3">
        <InfoBox :detail="'+'+increaseNum()" description="'Last 24h"></InfoBox>
      </v-col>
      <v-col cols="6" md="3">
        <InfoBox :detail="confirmedCasesNum()" description="Confirmed cases"></InfoBox>
      </v-col>
    </v-row>
    <canvas :id="nation" ref='chart'></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';
import InfoBox from './InfoBox';
import format from 'date-fns/format';

export default {
  props: {
    nation: String,
  },
  components: {
    InfoBox
  },
  data: () => ({
    labels: [],
    confirmedCases: [],
    deaths: [],
    myChart: '',
  }),
  mounted() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'SET_DATA'){
        this.setData();
        this.initChart();
      }
      if (mutation.type === 'SET_SELECTED_STATE'){
        this.replaceData();
      }
    })
  },
  methods: {
    setData() {
      this.$store.state.data[this.$props.nation].forEach(({date, confirmed, deaths}) => {
        if (date.indexOf('-2-') === -1 && date.indexOf('-1-') === -1) {
          if (date) {
            const dateNew = new Date(date);
            const formattedDate = format(dateNew, 'MMMM dd');
            this.labels.push(formattedDate);
          }
          this.confirmedCases.push(confirmed);
          this.deaths.push(deaths);
        }
      });
    },
    replaceData() {
      this.labels = [];
      this.confirmedCases = [];
      this.deaths = [];
      this.$store.state.data[this.$store.state.selectedState].forEach(({date, confirmed, deaths}) => {
        if (date.indexOf('-2-') === -1 && date.indexOf('-1-') === -1) {
          if (date) {
            const dateNew = new Date(date);
            const formattedDate = format(dateNew, 'MMMM dd');
            this.labels.push(formattedDate);
          }
          this.confirmedCases.push(confirmed);
          this.deaths.push(deaths);
          this.myChart.destroy();
          this.initChart();
        }
      });
    },
    increaseNum() {
      const cases = this.confirmedCases;
      const totalCases = cases[cases.length - 1];
      const previousDayCases = cases[cases.length - 2];
      return this.numberWithDot(totalCases - previousDayCases)
    },
    confirmedCasesNum() {
      const cases = this.confirmedCases;
      const totalCases = cases[cases.length - 1];
      return this.numberWithDot(totalCases)
    },
    numberWithDot(number) {
      if (!number) {
        return
      }
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    initChart() {
      const ctx = document.getElementById(`${this.nation}`);
      // eslint-disable-next-line
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [{
              label: 'Deaths',
              data: this.deaths,
              backgroundColor: [
                'rgba(255, 0, 0)',
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
                '#e67e22',
              ],
              borderColor: [
                '#36dsad',
              ],
              borderWidth: 1
            }]
        },
        options: {
          responsive: true,
          lineTension: 21,
          scales: {
              xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0.02)",
                }
              }],
              yAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0.02)",
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
.nation {
  color: #172c61;
  font-weight: 500;
  margin-left: 1rem;
}
.box {
  align-items: center;
  border-radius: 12px;
  border: 1px solid #dfe0e7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem 0;
  padding: 1.3rem 1rem;
  text-align: center;
  width: auto;

  p {
    margin-bottom: 0 !important;
    color: #666666;
  }

  &__figure {
    font-size: 1.7rem;
    font-weight: 500;
    color: #182C61;
  }

  @media (min-width: 690px) {
    margin: 1rem 0 4rem;
  }
}
</style>