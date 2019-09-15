export default {
  // state
  state: {
    list: [],
    name: '',
    textcontent: '',
    menuList: [],
    menu: {
      title: '',
      category: [],
      money: '',
      file: '',
      content: ''
    },
    babyList: [
      {
        'text': '옷',
        'value': false
      },
      {
        'text': '신발',
        'value': false
      },
      {
        'text': '장난감',
        'value': false
      },
      {
        'text': '가방',
        'value': false
      },
      {
        'text': '탈것',
        'value': false
      },
      {
        'text': '악세서리',
        'value': false
      },
      {
        'text': '특별한 옷',
        'value': false
      }
    ],
    valueCount: [],
    isHasValue: false,
    isFirstList: false,
    lastValue: null,
    isPopup: false,
    popupValue: '',
    changeIndex: undefined
  },
  // getters
  getters: {
    getName (state) {
      return state.name
    },
    getBabyList (state) {
      return state.babyList
    },
    getIsHasValue (state) {
      return state.isHasValue
    },
    getContent (state) {
      return state.textcontent
    },
    getLastValue (state) {
      return state.lastValue
    },
    getMenuList (state) {
      return state.menuList
    },
    getMenuTitle (state) {
      return state.menu.title
    },
    getMenuCategory (state) {
      return state.menu.category
    },
    getMenuMoney (state) {
      return state.menu.money
    },
    getMenuFile (state) {
      return state.menu.file
    },
    getMenuContent (state) {
      return state.menu.content
    },
    getPopupValue (state) {
      return state.popupValue
    },
    getIsPopup (state) {
      return state.isPopup
    },
    getFirstList (state) {
      return state.isFirstList
    },
    getChangeIndex (state) {
      return state.changeIndex
    }
  },
  // mutations
  mutations: {
    // 아기 물품 이름 저장
    setName (state, payload) {
      state.name = payload
    },
    // 값이 있는지 없는지 바꿔주는 부분
    setChageHasValue (state, payload) {
      if (payload === false) {
        state.isHasValue = false
      } else {
        state.isHasValue = true
      }
    },
    // 강점 리스트에서 체크된 상황 변화
    setChangeCategory (state, payload) {
      payload = payload * 1
      let babyList = state.babyList
      for (var i = 0; i < babyList.length; i++) {
        if (payload === i) {
          if (babyList[i].value === false) {
            babyList[i].value = true
            state.menu.category.push(babyList[i].text)
          } else {
            babyList[i].value = false
            state.menu.category.splice(state.menu.category.indexOf(babyList[i].text), 1)
          }
        }
      }
    },
    // 값의 변화
    setChangeContent (state, payload) {
      switch (payload) {
        case 'true':
          state.isHasValue = true
          break
        case 'false':
          state.isHasValue = false
          break
      }
    },
    // edit 내용
    setSaveContent (state, payload) {
      state.textcontent = payload
    },
    // 리스트 중 마지막에 특정 클래스 넣음
    setValueLastIndex (state) {
      let babyList = state.babyList
      let count = state.valueCount
      for (var i = 0; i < babyList.length; i++) {
        if (babyList[i].value === true) {
          count.push(i)
        }
      }
      state.lastValue = count[count.length - 1]
    },
    // 리스트 저장
    setSave (state, payload) {
      let stateMenuList = state.menuList
      let setPayload = {
        'title': payload.title,
        'category': payload.category,
        'money': payload.money,
        'file': payload.file,
        'content': payload.content
      }
      if (payload.index === undefined) {
        stateMenuList.push(setPayload)
      } else if (payload.index !== undefined) {
        stateMenuList.splice(payload.index, 1, setPayload)
        state.changeIndex = undefined
      }
    },
    // 값을 v-model로 연결하는 방법
    setValue (state, payload) {
      let value = payload.value
      if (payload.index !== undefined) {
        state.changeIndex = payload.index
      }
      switch (payload.type) {
        case 'title':
          state.menu = {...state.menu, title: value}
          break
        case 'category':
          value = value * 1
          let babyList = state.babyList
          for (var i = 0; i < babyList.length; i++) {
            if (value === i) {
              if (babyList[i].value === false) {
                babyList[i].value = true
                state.menu.category.push(babyList[i].text)
              } else {
                babyList[i].value = false
                state.menu.category.splice(state.menu.category.indexOf(babyList[i].text), 1)
              }
            }
          }
          break
        case 'money':
          state.menu = { ...state.menu, money: value }
          break
        case 'file':
          state.menu = { ...state.menu, file: value }
          break
        case 'content':
          state.menu = {...state.menu, content: value}
          break
      }
    },
    // 값을 저장후 초기화
    setClear (state) {
      let babyList = state.babyList
      let statemenu = state.menu
      statemenu.title = ''
      statemenu.category = []
      statemenu.money = ''
      statemenu.file = ''
      statemenu.content = ''
      for (var i = 0; i < babyList.length; i++) {
        babyList[i].value = false
      }
    },
    // 팝업 관련
    setPopup (state, payload) {
      state.isPopup = true
      state.popupValue = payload
    },
    setClose (state) {
      state.isPopup = false
    },
    // 해당 리스트 삭제
    setDelete (state, payload) {
      let stateMenuList = state.menuList
      let idx = stateMenuList.indexOf(payload)
      if (idx === -1) {
        stateMenuList.splice(payload, 1)
      }
    },
    setFirstList (state) {
      state.isFirstList = true
    },
    setSaveAll (state) {
      let payload = {
        'name': state.name,
        'menuList': state.menuList
      }
      state.list.push(payload)
    },
    setClearAll (state) {
      state.list = []
      state.name = ''
      state.textcontent = ''
      state.menuList = []
      state.menu = {
        title: '',
        category: [],
        money: '',
        file: '',
        content: ''
      }
      state.babyList = [
        {
          'text': '옷',
          'value': false
        },
        {
          'text': '신발',
          'value': false
        },
        {
          'text': '장난감',
          'value': false
        },
        {
          'text': '가방',
          'value': false
        },
        {
          'text': '탈것',
          'value': false
        },
        {
          'text': '악세서리',
          'value': false
        },
        {
          'text': '특별한 옷',
          'value': false
        }
      ]
      state.valueCount = []
      state.isHasValue = false
      state.isFirstList = false
      state.lastValue = null
      state.isPopup = false
      state.popupValue = ''
      state.changeIndex = undefined
    }
  },
  // actions
  actions: {
    setName ({commit}, payload) {
      commit('setName', payload)
    },
    // 값이 있는지 없는지 바꿔주는 부분
    setChageHasValue ({commit}, payload) {
      commit('setChageHasValue', payload)
    },
    // 강점 리스트에서 체크된 상황 변화
    // setChangeCategory ({commit}, payload) {
    //   commit('setChangeCategory', payload)
    // },
    // 값의 변화
    setChangeContent ({commit}, payload) {
      commit('setChangeContent', payload)
    },
    // edit 내용
    setSaveContent ({commit}, payload) {
      commit('setSaveContent', payload)
    },
    // 리스트 중 마지막에 특정 클래스 넣음
    setValueLastIndex ({commit}) {
      commit('setValueLastIndex')
    },
    // 리스트 저장
    setSave ({commit}, payload) {
      commit('setSave', payload)
    },
    // 값을 v-model로 연결하는 방법
    setValue ({commit}, payload) {
      commit('setValue', payload)
    },
    // 값을 저장후 초기화
    setClear ({commit}) {
      commit('setClear')
    },
    // 팝업 관련
    setPopup ({commit}, payload) {
      commit('setPopup', payload)
    },
    setClose ({commit}) {
      commit('setClose')
    },
    // 해당 리스트 삭제
    setDelete ({commit}, payload) {
      commit('setDelete', payload)
    },
    // 수정
    setRewrite ({commit, state}, payload) {
      let changePayload = state.menuList[payload]
      let changePayloadTitle = {
        'type': 'title',
        'value': changePayload.title,
        'index': payload
      }
      let changePayloadCategory = {
        'type': 'category',
        'value': changePayload.category,
        'index': payload
      }
      let changePayloadMoney = {
        'type': 'money',
        'value': changePayload.money,
        'index': payload
      }
      let changePayloadFile = {
        'type': 'file',
        'value': changePayload.file,
        'index': payload
      }
      let changePayloadContent = {
        'type': 'content',
        'value': changePayload.content,
        'index': payload
      }
      commit('setValue', changePayloadTitle)
      commit('setValue', changePayloadCategory)
      commit('setValue', changePayloadMoney)
      commit('setValue', changePayloadFile)
      commit('setValue', changePayloadContent)
    },
    // 리스트에 값이 처음인지 확인
    setFirstList ({commit}) {
      commit('setFirstList')
    },
    setJoinValue ({ commit }) {
      commit('setJoinValue')
    },
    setSaveAll ({commit}) {
      commit('setSaveAll')
    },
    setClearAll ({commit}) {
      commit('setClearAll')
    }
  }
}
