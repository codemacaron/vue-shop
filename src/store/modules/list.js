import axios from 'axios'

export default {
  // state
  state: {
    // state 관련
    changePageState: false,
    textState: true,
    adState: true,
    filterState: true,
    // 리스트 불러올 넘버
    listNum: 1,
    listsNum: 1,
    // 광고 리스트 불러올 넘버
    adListNum: 1,
    // 광고 리스트 중에 몇개를 가져올지 정하는 숫자
    adListGetNum: 10,
    // 리스트 관련
    // 필터
    filter: [],
    // 광고
    ad: [],
    // 포스트
    savepost: {
      'asc': [],
      'desc': [],
      'ascCategory': [],
      'descCategory': [],
      'ascCategory1': [],
      'ascCategory2': [],
      'ascCategory3': [],
      'descCategory1': [],
      'descCategory2': [],
      'descCategory3': []
    },
    // 포스트
    post: {
      'asc': [],
      'desc': [],
      'ascCategory': [],
      'descCategory': [],
      'ascCategory1': [],
      'ascCategory2': [],
      'ascCategory3': [],
      'descCategory1': [],
      'descCategory2': [],
      'descCategory3': []
    },
    // 믹스
    mix: {
      'post': [],
      'asc': [],
      'desc': [],
      'ascCategory': [],
      'descCategory': [],
      'ascCategory1': [],
      'ascCategory2': [],
      'ascCategory3': [],
      'descCategory1': [],
      'descCategory2': [],
      'descCategory3': []
    },
    // 필터 체크박스
    radio: {
      'category0': false,
      'category1': false,
      'category2': false,
      'category3': false
    },
    // 정렬 방법
    sort: {
      'asc': true,
      'desc': false
    },
    // 리스트의 종류
    whatIsPost: {},
    // 리스트를 더이상 가져올 수 없으면 false가 된다.
    stopList: true,
    // 로딩 관련
    loading: false,
    // 어떤 포스트를 가져와야 할지에 대한 기본 값
    textWhatIsPost: {
      'asc': true,
      'desc': false,
      'category': 'reset'
    },
    // 마지막 리스트인지 감지
    endList: false,
    // 인피니티 스크롤 감지
    canDoit: true
  },
  // getters
  getters: {
    // 리스트 이동에 대한 값 가져오기
    getTextWhatIsPost (state) {
      return state.textWhatIsPost
    },
    // 리스트 이동에 대한 값 가져오기
    getChangePage (state) {
      return state.changePageState
    },
    // 믹스 리스트 값 가져오기
    getMixList (state) {
      return state.mix.post
    },
    // 리스트 값
    getLists (state) {
      return state.post.asc
    },
    // 필터 값
    getFilter (state) {
      return state.filter
    },
    // 광고 값
    getAd (state) {
      return state.ad
    },
    // 값 확인
    getRadioValue (state) {
      return state.radio
    },
    // 값 확인
    getSortValue (state) {
      return state.sort
    },
    // 리스트를 더이상 불러오지 않음
    getStopList (state) {
      return state.stopList
    },
    // 로딩 감지
    getLoading (state) {
      return state.loading
    },
    // 인피니티 스크롤 실행 감지
    getCanDoit (state) {
      return state.canDoit
    }
  },
  // mutations
  mutations: {
    // 필터 리스트 가져오기
    setFilterData (state, payload) {
      state.filterState = false
      state.filter = payload.data.list
    },
    // 광고 리스트 가져오기
    setAdData (state, payload) {
      for (let i = 0; i < payload.data.list.length; i++) {
        state.ad.push(payload.data.list[i])
      }
      state.adState = false
    },
    // 데이터 리스트 가져오기
    setListData (state, payload) {
      if (payload.filter.asc === true) {
        switch (payload.filter.category) {
          case 'reset':
            for (let i = 0; i < payload.data.list.length; i++) {
              state.post.asc.push(payload.data.list[i])
            }
            break
          case 'apple':
            for (let i = 0; i < payload.data.list.length; i++) {
              state.post.ascCategory1.push(payload.data.list[i])
            }
            break
          case 'banana':
            for (let i = 0; i < payload.data.list.length; i++) {
              state.post.ascCategory2.push(payload.data.list[i])
            }
            break
          case 'coconut':
            for (let i = 0; i < payload.data.list.length; i++) {
              state.post.ascCategory3.push(payload.data.list[i])
            }
            break
        }
      }
      if (payload.filter.desc === true) {
        switch (payload.filter.category) {
          case 'reset':
            for (let i = 0; i < payload.data.list.length; i++) {
              state.post.desc.push(payload.data.list[i])
            }
            break
          case 'apple':
            for (let i = 0; i < payload.data.list.length; i++) {
              state.post.descCategory1.push(payload.data.list[i])
            }
            break
          case 'banana':
            for (let i = 0; i < payload.data.list.length; i++) {
              state.post.descCategory2.push(payload.data.list[i])
            }
            break
          case 'coconut':
            for (let i = 0; i < payload.data.list.length; i++) {
              state.post.descCategory3.push(payload.data.list[i])
            }
            break
        }
      }
      state.listNum += 1
      state.textState = false
    },
    // 리스트 4번째 마다 광고로 가공하기
    setMakeList (state, payload) {
      // 리스트의 값을 불러오는게 끝이 난 후에 남은 리스트를 하기 위한 카운트
      state.listsNum += 1
      // 오름차순
      if (payload.asc === true) {
        switch (payload.category) {
          case 'reset':
            if (state.post.asc.length !== 0) {
              if (state.mix.asc.length === 0 || state.listsNum % 2 === 0) {
                for (let i = 0; i < 10; i++) {
                  if (state.post.asc[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 3 || i === 7) {
                    state.mix.asc.push(state.ad.shift(1))
                  } else if (i !== 3 || i !== 7) {
                    state.mix.asc.push(state.post.asc.shift(1))
                  }
                }
              } else {
                for (let i = 0; i < 10; i++) {
                  if (state.post.asc[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 1 || i === 5 || i === 9) {
                    state.mix.asc.push(state.ad.shift(1))
                  } else if (i !== 1 || i !== 5 || i !== 9) {
                    state.mix.asc.push(state.post.asc.shift(1))
                  }
                }
              }
            }
            break
          case 'apple':
            if (state.post.ascCategory1.length !== 0) {
              if (state.mix.ascCategory1.length === 0 || state.listsNum % 2 === 0) {
                for (let i = 0; i < 10; i++) {
                  if (state.post.ascCategory1[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 3 || i === 7) {
                    state.mix.ascCategory1.push(state.ad.shift(1))
                  } else if (i !== 3 || i !== 7) {
                    state.mix.ascCategory1.push(state.post.ascCategory1.shift(1))
                  }
                }
              } else {
                for (let i = 0; i < 10; i++) {
                  if (state.post.ascCategory1[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 1 || i === 5 || i === 9) {
                    state.mix.ascCategory1.push(state.ad.shift(1))
                  } else if (i !== 1 || i !== 5 || i !== 9) {
                    state.mix.ascCategory1.push(state.post.ascCategory1.shift(1))
                  }
                }
              }
            }
            break
          case 'banana':
            if (state.post.ascCategory2.length !== 0) {
              if (state.mix.ascCategory2.length === 0 || state.listsNum % 2 === 0) {
                for (let i = 0; i < 10; i++) {
                  if (state.post.ascCategory2[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 3 || i === 7) {
                    state.mix.ascCategory2.push(state.ad.shift(1))
                  } else if (i !== 3 || i !== 7) {
                    state.mix.ascCategory2.push(state.post.ascCategory2.shift(1))
                  }
                }
              } else {
                for (let i = 0; i < 10; i++) {
                  if (state.post.ascCategory2[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 1 || i === 5 || i === 9) {
                    state.mix.ascCategory2.push(state.ad.shift(1))
                  } else if (i !== 1 || i !== 5 || i !== 9) {
                    state.mix.ascCategory2.push(state.post.ascCategory2.shift(1))
                  }
                }
              }
            }
            break
          case 'coconut':
            if (state.post.ascCategory3.length !== 0) {
              if (state.mix.ascCategory3.length === 0 || state.listsNum % 2 === 0) {
                for (let i = 0; i < 10; i++) {
                  if (state.post.ascCategory3[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 3 || i === 7) {
                    state.mix.ascCategory3.push(state.ad.shift(1))
                  } else if (i !== 3 || i !== 7) {
                    state.mix.ascCategory3.push(state.post.ascCategory3.shift(1))
                  }
                }
              } else {
                for (let i = 0; i < 10; i++) {
                  if (state.post.ascCategory3[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 1 || i === 5 || i === 9) {
                    state.mix.ascCategory3.push(state.ad.shift(1))
                  } else if (i !== 1 || i !== 5 || i !== 9) {
                    state.mix.ascCategory3.push(state.post.ascCategory3.shift(1))
                  }
                }
              }
            }
            break
        }
      }
      // 내림차순
      if (payload.desc === true) {
        switch (payload.category) {
          case 'reset':
            if (state.post.desc.length !== 0) {
              if (state.mix.desc.length === 0 || state.listsNum % 2 === 0) {
                for (let i = 0; i < 10; i++) {
                  if (state.post.desc[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 3 || i === 7) {
                    state.mix.desc.push(state.ad.shift(1))
                  } else if (i !== 3 || i !== 7) {
                    state.mix.desc.push(state.post.desc.shift(1))
                  }
                }
              } else {
                for (let i = 0; i < 10; i++) {
                  if (state.post.desc[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 1 || i === 5 || i === 9) {
                    state.mix.desc.push(state.ad.shift(1))
                  } else if (i !== 1 || i !== 5 || i !== 9) {
                    state.mix.desc.push(state.post.desc.shift(1))
                  }
                }
              }
            }
            break
          case 'apple':
            if (state.post.descCategory1.length !== 0) {
              if (state.mix.descCategory1.length === 0 || state.listsNum % 2 === 0) {
                for (let i = 0; i < 10; i++) {
                  if (state.post.descCategory1[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 3 || i === 7) {
                    state.mix.descCategory1.push(state.ad.shift(1))
                  } else if (i !== 3 || i !== 7) {
                    state.mix.descCategory1.push(state.post.descCategory1.shift(1))
                  }
                }
              } else {
                for (let i = 0; i < 10; i++) {
                  if (state.post.descCategory1[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 1 || i === 5 || i === 9) {
                    state.mix.descCategory1.push(state.ad.shift(1))
                  } else if (i !== 1 || i !== 5 || i !== 9) {
                    state.mix.descCategory1.push(state.post.descCategory1.shift(1))
                  }
                }
              }
            }
            break
          case 'banana':
            if (state.post.descCategory2.length !== 0) {
              if (state.mix.descCategory2.length === 0 || state.listsNum % 2 === 0) {
                for (let i = 0; i < 10; i++) {
                  if (state.post.descCategory2[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 3 || i === 7) {
                    state.mix.descCategory2.push(state.ad.shift(1))
                  } else if (i !== 3 || i !== 7) {
                    state.mix.descCategory2.push(state.post.descCategory2.shift(1))
                  }
                }
              } else {
                for (let i = 0; i < 10; i++) {
                  if (state.post.descCategory2[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 1 || i === 5 || i === 9) {
                    state.mix.descCategory2.push(state.ad.shift(1))
                  } else if (i !== 1 || i !== 5 || i !== 9) {
                    state.mix.descCategory2.push(state.post.descCategory2.shift(1))
                  }
                }
              }
            }
            break
          case 'coconut':
            if (state.post.descCategory3.length !== 0) {
              if (state.mix.descCategory3.length === 0 || state.listsNum % 2 === 0) {
                for (let i = 0; i < 10; i++) {
                  if (state.post.descCategory3[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 3 || i === 7) {
                    state.mix.descCategory3.push(state.ad.shift(1))
                  } else if (i !== 3 || i !== 7) {
                    state.mix.descCategory3.push(state.post.descCategory3.shift(1))
                  }
                }
              } else {
                for (let i = 0; i < 10; i++) {
                  if (state.post.descCategory3[0] === undefined) {
                    state.stopList = false
                    break
                  }
                  if (i === 1 || i === 5 || i === 9) {
                    state.mix.descCategory3.push(state.ad.shift(1))
                  } else if (i !== 1 || i !== 5 || i !== 9) {
                    state.mix.descCategory3.push(state.post.descCategory3.shift(1))
                  }
                }
              }
            }
            break
        }
      }
    },
    // 필터의 카테고리 확인 방법
    setRadio (state, payload) {
      let stateRadio = state.radio
      switch (payload.category) {
        case 'reset':
          state.textWhatIsPost.category = 'reset'
          stateRadio.category0 = true
          stateRadio.category1 = false
          stateRadio.category2 = false
          stateRadio.category3 = false
          break
        case 'apple':
          state.textWhatIsPost.category = 'apple'
          stateRadio.category0 = false
          stateRadio.category1 = true
          stateRadio.category2 = false
          stateRadio.category3 = false
          break
        case 'banana':
          state.textWhatIsPost.category = 'banana'
          stateRadio.category0 = false
          stateRadio.category1 = false
          stateRadio.category2 = true
          stateRadio.category3 = false
          break
        case 'coconut':
          state.textWhatIsPost.category = 'coconut'
          stateRadio.category0 = false
          stateRadio.category1 = false
          stateRadio.category2 = false
          stateRadio.category3 = true
          break
      }
    },
    // 필터의 카테고리 확인 방법
    setSortList (state, payload) {
      let stateSort = state.sort
      let stateTextWhatIsPost = state.textWhatIsPost
      switch (payload.sort) {
        case 'asc':
          state.mix.post = []
          stateSort.asc = true
          stateSort.desc = false
          stateTextWhatIsPost.asc = true
          stateTextWhatIsPost.desc = false
          break
        case 'desc':
          state.mix.post = []
          stateSort.asc = false
          stateSort.desc = true
          stateTextWhatIsPost.asc = false
          stateTextWhatIsPost.desc = true
          break
      }
    },
    // 보여줄 포스터를 넣는다.
    setMixPost (state, payload) {
      let whatIsPost = state.whatIsPost
      if (whatIsPost !== {}) {
        state.mix.post = []
      }
      whatIsPost = payload
      if (whatIsPost.asc === true) {
        switch (whatIsPost.category) {
          case 'reset':
            for (let i = 0; i < state.mix.asc.length; i++) {
              state.mix.post.push(state.mix.asc[i])
            }
            break
          case 'apple':
            for (let i = 0; i < state.mix.ascCategory1.length; i++) {
              state.mix.post.push(state.mix.ascCategory1[i])
            }
            break
          case 'banana':
            for (let i = 0; i < state.mix.ascCategory2.length; i++) {
              state.mix.post.push(state.mix.ascCategory2[i])
            }
            break
          case 'coconut':
            for (let i = 0; i < state.mix.ascCategory3.length; i++) {
              state.mix.post.push(state.mix.ascCategory3[i])
            }
            break
        }
      }
      if (whatIsPost.desc === true) {
        switch (whatIsPost.category) {
          case 'reset':
            for (let i = 0; i < state.mix.desc.length; i++) {
              state.mix.post.push(state.mix.desc[i])
            }
            break
          case 'apple':
            for (let i = 0; i < state.mix.descCategory1.length; i++) {
              state.mix.post.push(state.mix.descCategory1[i])
            }
            break
          case 'banana':
            for (let i = 0; i < state.mix.descCategory2.length; i++) {
              state.mix.post.push(state.mix.descCategory2[i])
            }
            break
          case 'coconut':
            for (let i = 0; i < state.mix.descCategory3.length; i++) {
              state.mix.post.push(state.mix.descCategory3[i])
            }
            break
        }
      }
      // 모든 값이 다 들어간 후 인피니티 스크롤 감지 가능
      state.canDoit = true
    },
    // 필터나 오더가 바뀔 때 리셋
    setResetList (state) {
      state.stopList = true
      state.textState = true
      // 페이지 수 리셋
      state.listNum = 1
      state.listsNum = 1
      // 마지막 리스트 감지 리셋
      state.endList = false
      // 인피니티 스크롤 감지 리셋
      state.canDoit = true
      // 광고
      state.ad = []
      // 리스트
      state.post.asc = []
      state.post.desc = []
      state.post.ascCategory1 = []
      state.post.ascCategory2 = []
      state.post.ascCategory3 = []
      state.post.descCategory1 = []
      state.post.DescCategory2 = []
      state.post.descCategory3 = []
      // 믹스
      state.mix.asc = []
      state.mix.desc = []
      state.mix.ascCategory = []
      state.mix.descCategory = []
      state.mix.ascCategory1 = []
      state.mix.ascCategory2 = []
      state.mix.ascCategory3 = []
      state.mix.descCategory1 = []
      state.mix.descCategory2 = []
      state.mix.descCategory3 = []
    },
    // 광고 리스트가 더이상 없을 때 광고 처음부터 가져온다.
    setResetAdNum (state) {
      state.adListNum = 1
    },
    // 페이지 이동
    setChangePage (state, payload) {
      if (payload) {
        state.changePageState = true
      } else {
        state.changePageState = false
      }
    },
    // 리스트 로딩
    setLoading (state, payload) {
      if (payload === 'show') {
        state.loading = true
      } else if (payload === 'noshow') {
        state.loading = false
      }
    },
    // 리스트의 마지막 감지
    setEndList (state, payload) {
      switch (payload) {
        case true:
          state.endList = true
          break
        case false:
          state.endList = false
          break
      }
    },
    setCanDoit (state) {
      state.canDoit = false
    }
  },
  // actions
  actions: {
    // 광고부터 가져온 후에 리스트를 가져온다.
    setLists ({state, dispatch}, payload) {
      dispatch('setAxiosAll', {'type': 'ad'}).then(() => {
        setTimeout(() => {
          dispatch('setAxiosAll', payload)
        }, 500)
      })
    },
    // axios 이용하여 가져오기
    setAxiosAll (context, payload) {
      // 필터 가져오기
      if (payload.type === 'filter') {
        // 필터 리스트
        let filterApi = 'https://comento.cafe24.com/category.php'
        // 필터 받아오기
        axios.get(filterApi).then((response) => {
          context.dispatch('setFilterData', response)
        }).catch(error => console.error('실행실패 ::: ', error.message))
      }
      // 광고 가져오기
      if (payload.type === 'ad') {
        // 광고 리스트
        let adApi = 'https://comento.cafe24.com/ads.php?page=' + context.state.adListNum + '&limit=' + context.state.adListGetNum
        if (context.state.listNum === 1 || context.state.ad.length < 3) {
          // 광고 받아오기
          axios.get(adApi).then((response) => {
            if (response.data.list.length > 1) {
              let adpayload = {
                'data': response.data,
                'id': response.data.no,
                'list': payload.type
              }
              context.dispatch('setAdData', adpayload)
            }
            if (response.data.list.length < 1) {
              payload.type = 'ad'
              context.dispatch('setResetAdNum').then(() => {
                context.dispatch('setAxiosAll', payload)
              })
            }
          }).catch(error => console.error('실행실패 ::: ', error.message))
        }
      }
      // 리스트 가져오기
      if (payload.type === 'lists') {
        let whatIsPost = payload.whatIsPost
        let api = {
          // 오름차순 데이터
          'asc': {
            'Api': 'https://comento.cafe24.com/request.php?page=' + context.state.listNum + '&ord=asc',
            'list': payload.type,
            'filter': whatIsPost
          },
          // 내림차순 데이터
          'desc': {
            'Api': 'https://comento.cafe24.com/request.php?page=' + context.state.listNum + '&ord=desc',
            'list': payload.type,
            'filter': whatIsPost
          },
          // 오름차순 category 데이터
          'ascCategory1': {
            'Api': 'https://comento.cafe24.com/request.php?page=' + context.state.listNum + '&ord=asc&category=1',
            'list': payload.type,
            'filter': whatIsPost
          },
          'ascCategory2': {
            'Api': 'https://comento.cafe24.com/request.php?page=' + context.state.listNum + '&ord=asc&category=2',
            'list': payload.type,
            'filter': whatIsPost
          },
          'ascCategory3': {
            'Api': 'https://comento.cafe24.com/request.php?page=' + context.state.listNum + '&ord=asc&category=3',
            'list': payload.type,
            'filter': whatIsPost
          },
          // 내림차순 category 데이터
          'descCategory1': {
            'Api': 'https://comento.cafe24.com/request.php?page=' + context.state.listNum + '&ord=desc&category=1',
            'list': payload.type,
            'filter': whatIsPost
          },
          'descCategory2': {
            'Api': 'https://comento.cafe24.com/request.php?page=' + context.state.listNum + '&ord=desc&category=2',
            'list': payload.type,
            'filter': whatIsPost
          },
          'descCategory3': {
            'Api': 'https://comento.cafe24.com/request.php?page=' + context.state.listNum + '&ord=desc&category=3',
            'list': payload.type,
            'filter': whatIsPost
          }
        }
        if (whatIsPost.asc === true) {
          switch (whatIsPost.category) {
            case 'reset':
              // 오름차순 리스트 받아오기
              context.dispatch('setListAxios', api.asc)
              break
            case 'apple':
              // 오름차순 Category1 리스트 받아오기
              context.dispatch('setListAxios', api.ascCategory1)
              break
            case 'banana':
              // 오름차순 Category2 리스트 받아오기
              context.dispatch('setListAxios', api.ascCategory2)
              break
            case 'coconut':
              // 오름차순 Category3 리스트 받아오기
              context.dispatch('setListAxios', api.ascCategory3)
              break
          }
        }
        if (whatIsPost.desc === true) {
          switch (whatIsPost.category) {
            case 'reset':
              // 내림차순 리스트 받아오기
              context.dispatch('setListAxios', api.desc)
              break
            case 'apple':
              // 내림차순 Category1 리스트 받아오기
              context.dispatch('setListAxios', api.descCategory1)
              break
            case 'banana':
              // 내림차순 Category2 리스트 받아오기
              context.dispatch('setListAxios', api.descCategory2)
              break
            case 'coconut':
              // 내림차순 Category3 리스트 받아오기
              context.dispatch('setListAxios', api.descCategory3)
              break
          }
        }
      }
    },
    // 리스트 받아올때 사용하는 Axios
    setListAxios ({dispatch}, payload) {
      axios.get(payload.Api).then((response) => {
        if (response.data.list.length > 1) {
          let axiosPayload = {
            'data': response.data,
            'id': response.data.code,
            'list': payload.list,
            'filter': payload.filter
          }
          dispatch('setListData', axiosPayload).then(() => {
            setTimeout(() => {
              dispatch('setMakeList', axiosPayload.filter)
            }, 100)
          })
        }
        if (response.data.list.length < 1) {
          dispatch('setEndList', true).then(() => {
            dispatch('setMakeList', payload.filter)
          })
        }
      }).catch(error => console.error('실행실패 ::: ', error.message))
    },
    // 데이터 리스트 가져오기
    setListData ({commit}, payload) {
      commit('setListData', payload)
    },
    // 필터 리스트 가져오기
    setFilterData ({commit}, payload) {
      commit('setFilterData', payload)
    },
    // 광고 리스트 가져오기
    setAdData ({commit}, payload) {
      commit('setAdData', payload)
    },
    // 필터의 카테고리 확인 방법
    setRadio ({commit}, payload) {
      window.setTimeout(() => {
        commit('setRadio', payload)
      }, payload.duration)
    },
    // 필터의 카테고리 확인 방법
    setSortList ({commit}, payload) {
      window.setTimeout(() => {
        commit('setSortList', payload)
      }, payload.duration)
    },
    // 리스트 4번째 마다 광고로 가공하기
    setMakeList ({commit}, payload) {
      commit('setMakeList', payload)
    },
    // 보여줄 리스트를 넣는다.
    setMixPost ({commit}, payload) {
      commit('setMixPost', payload)
    },
    // 필터나 오더가 바뀔 때 리셋
    setResetList ({commit}) {
      commit('setResetList')
    },
    // 광고 리스트가 더이상 없을 때 광고 처음부터 가져온다.
    setResetAdNum ({commit}) {
      commit('setResetAdNum')
    },
    // 페이지 이동
    setChangePage ({commit}, payload) {
      commit('setChangePage', payload)
    },
    // 리스트 로딩
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    // 리스트 마지막 감지
    setEndList ({commit}, payload) {
      commit('setEndList', payload)
    },
    setCanDoit ({commit}) {
      commit('setCanDoit')
    }
  }
}
