<template>
  <div id="result" v-if="result.data">
    <img v-bind:src="row.url" v-bind:key="row.id" v-for="row in pageData" class="img-zoomable" alt="로딩중입니다" />

    <div v-if="result.data.length > 5">
      <div class="btn btn-xs btn-outline-primary p-1 m-1" v-bind:key="index" v-for="index in maxPage" @click="pageChange(index)">
        {{ index }} / {{ maxPage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  data () {
    return {
      nowPage: 1
    }
  },
  computed: {
    result () {
      return this.$store.state.Common.SearchResult
    },
    maxPage () {
      return this.result.data.length / 4
    },
    pageData () {
      let startIndex = (this.nowPage - 1) * 4
      return this.result.data.slice(startIndex, startIndex + 4)
    }

  },

  watch: {
    result: this.handleListChange
  },
  methods: {
    handleListChange () {
      window.zooming.listen('.img-zoomable')
    },
    pageChange (page) {
      this.nowPage = page
    }
  }
}
</script>

<style lang="scss" scoped>

#result {
  img {
    width: 100px;
    min-height:30px;
    margin: 20px;
    border:1px solid #eee;
  }
}
</style>
