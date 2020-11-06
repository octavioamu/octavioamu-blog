export const state = () => ({
  menu: {}
})

export const mutations = {
  SET_MENU(state, menu) {
    state.menu = menu
  },
  SET_ERROR(state, error) {
    state.menu = error
  }
}

export const actions = {
  async fetchMenu({ commit }, $prismic, params) {
    try {
      const menu = (await $prismic.api.getSingle('menu'))
      console.log('menu', params)

      commit('SET_MENU', menu.data)
    } catch (e) {
      const error = 'Please create a menu document'

      commit('SET_ERROR', error);
    }
  }
}
