export const mutations = {
  SET_DATA(state , payload){
    state.data = payload;
  },
  SET_LOADING_STATE(state , payload){
    state.isLoading = payload;
  },
  SET_SELECTED_STATE(state , payload){
    state.selectedState = payload;
  },
};