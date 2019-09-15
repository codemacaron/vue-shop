export default {
  // state
  state: {
    // state 관련
    loginArea: false,
    joinArea: false
  },
  // getters
  getters: {
    // 로그인 영역 오픈
    getLoginArea (state) {
      return state.loginArea
    },
    // 회원가입 영역 오픈
    getJoinArea (state) {
      return state.joinArea
    }
  },
  // mutations
  mutations: {
    setLoginArea (state, payload) {
      switch (payload) {
        case 'open':
          state.loginArea = true
          break
        case 'close':
          state.loginArea = false
          break
      }
    },
    setJoinArea (state, payload) {
      switch (payload) {
        case 'open':
          state.joinArea = true
          break
        case 'close':
          state.joinArea = false
          break
      }
    }
  },
  // actions
  actions: {
    setLoginArea ({commit}, payload) {
      commit('setLoginArea', payload)
    },
    setJoinArea ({commit}, payload) {
      commit('setJoinArea', payload)
    }
  }
}
