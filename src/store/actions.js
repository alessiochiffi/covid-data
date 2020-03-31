import axios from 'axios';

export const actions = {
  fetchData() {
    axios.get('https://pomber.github.io/covid19/timeseries.json').then(result => {
      this.commit('SET_DATA', result.data);
      this.commit('SET_LOADING_STATE', false);
    }).catch(error => {
      throw new Error(`API ${error}`);
    });
  },
  changeNation({ commit }, value) {
    commit('SET_SELECTED_STATE', value);
  }
}