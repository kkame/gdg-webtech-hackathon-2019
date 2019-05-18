const initState = {
  SearchResult: {
    data: []
  }
}

const Common = {
  state: initState,
  mutations: {
    setSearchResult (state, SearchResult) {
      state.SearchResult = SearchResult
    }
  }
}

export default Common
