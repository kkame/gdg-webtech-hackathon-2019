<template>
  <div class="search-form">
    <h1>{{ title }}</h1>
    <div>
      <input type="text" class="form-input" v-model="keyword">
      <div class="btn btn-primary" @click="searchKeyword">Search</div>
    </div>
    <div class="text-danger" v-if="error">{{ error }}</div>
    <div class="text-info" v-if="notice">{{ notice}}</div>
    <search-result />
  </div>
</template>

<script>
import SearchResult from './SearchResult'

export default {
  components: {
    SearchResult
  },
  name: 'SearchForm',
  data () {
    return {
      title: '검색어를 입력해주세요',
      keyword: '',
      status: 'waiting',
      error: '',
      notice: ''
    }
  },
  beforeMount () {
    window.axios.get('https://gdg-webtech-hackathon-backend.firebaseapp.com/api/gif/random50')
      .then(response => {
        this.$store.commit('setSearchResult', response.data)
        this.notice = '랜덤 검색 결과 입니다. 검색어를 입력해보세요'
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data)
        } else {
          alert('Error ' + error.message)
        }
      })
  },
  methods: {
    searchKeyword () {
      this.error = ''
      this.notice = ''
      if (!this.keyword) {
        this.error = '검색어를 입력해주세요'
        return
      }

      this.notice = '검색중입니다'
      this.status = 'searching'

      window.axios.get('https://gdg-webtech-hackathon-backend.firebaseapp.com/api/gif/search?q=' + this.keyword)
        .then(response => {
          this.$store.commit('setSearchResult', response.data)
          if (!response.data.data.length) { this.error = '검색 결과가 없습니다' }
        })
        .catch(error => {
          if (error.response) {
            this.error = error.response.data
          } else {
            this.error = 'Error ' + error.message
          }
        })
        .then(() => {
          this.notice = ''
          this.status = 'waiting'
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
