<template>
  <div class="semann-results">
    <p v-if="!results.length">{{$t('results.none')}}</p>
    <result v-for="(result, iri) in processedResults" :result="result" :key="iri"></result>
  </div>
</template>

<style lang="scss" src="./results.scss"></style>

<script>
import Result from './result'
import extend from 'extend'

export default {
  components: {Result},
  props: {
    results: {
      type: Array,
      required: true
    }
  },
  computed: {
    processedResults () {
      const processed = {}
      this.results.forEach(res => {
        if (!processed[res.resource]) {
          processed[res.resource] = {properties: {}, occurrences: []}
        }
        extend(true, processed[res.resource].properties, res.properties)
        processed[res.resource].occurrences.push(res)
      })
      return processed
    }
  }
}
</script>
