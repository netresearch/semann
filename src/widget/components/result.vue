<template>
  <div class="semann-result" @mouseenter="mark()" @mouseleave="unmark()">
    <div
      class="semann-result-head"
      :class="{'semann-active': !collapsed}"
      @click="collapsed = !collapsed">
      <div class="semann-result-label">{{literal.label}}</div>
      <div class="semann-result-image" :style="{backgroundImage: `url('${literal.picture}`}" v-if="literal.picture"></div>
    </div>
    <div class="semann-result-body" v-if="!collapsed">
      <p v-if="literal.abstract">{{literal.abstract}}</p>
      <annotations :result="result"></annotations>
    </div>
  </div>
</template>

<style lang="scss" src="./result.scss"></style>

<script>
import Annotations from './annotations'

export default {
  components: {Annotations},
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      collapsed: true
    }
  },
  computed: {
    literal () {
      const literal = {}
      for (let key of Object.keys(this.result.properties)) {
        const val = this.result.properties[key]
        literal[key] = typeof val === 'object' ? val.value : val
      }
      return literal
    }
  },
  methods: {
    mark () {
      this.result.occurrences.forEach(occurence => occurence.mark())
    },
    unmark () {
      this.result.occurrences.forEach(occurence => occurence.unmark())
    }
  }
}
</script>
