<template>
  <div class="semann-widget" v-loading="saving || !ready || analysis && analysis.running">
    <header>
      <h3>{{results ? $tc('annotation', 2) : $t('appTitle') }}</h3>
      <el-button type="text" size="small" icon="el-icon-refresh" v-if="results" @click="analyse()"></el-button>
      <el-button type="primary" size="medium" v-if="annotationsChanged" @click="commitAnnotations()" icon="el-icon-circle-check"></el-button>
    </header>
    <div class="semann-analysis-start" v-if="!results">
      <p>{{$t('appIntro')}}</p>
      <el-button
        type="primary"
        :disabled="!ready || analysis && analysis.running"
        @click="analyze()"
      >{{$t('analyze')}}</el-button>
    </div>
    <results v-if="results" :results="results"></results>
  </div>
</template>

<style lang="scss" src="./widget.scss"></style>

<script>
import extend from 'extend'
import Analyzer from '../analyzer'
import Analysis from '../analysis'
import Results from './results'
const defaultConfig = {
  lang: 'en'
}

export default {
  components: {Results},
  data () {
    return {
      config: {},
      ready: false,
      analysis: undefined,
      results: undefined,
      annotationsChanged: false,
      saving: false
    }
  },
  created () {
    this.$root.widget = this
    this.$on('annotation-added', () => {
      this.annotationsChanged = true
    })
  },
  methods: {
    configure (config) {
      try {
        config = extend(true, defaultConfig, config)

        // Set i18n config
        if (config.translations) {
          extend(true, this.$i18n.messages, config.translations)
        }
        this.$i18n.locale = config.lang

        // Setup analyzers
        if (!config.analyzers || !config.analyzers.length) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error('No analyzer(s) provided!')
        }
        const ids = []
        config.analyzers.forEach((definition, i) => {
          const analyzer = new Analyzer(definition)
          if (ids.indexOf(analyzer.id) > -1) {
            throw new Error('Duplicate analyzer')
          }
          ids.push(analyzer.id)
          config.analyzers[i] = analyzer
        })

        // Setup analysis
        this.analysis = undefined

        // Remove eventual old listeners and add new ones
        for (let listenerType of ['on', 'once']) {
          for (let event of Object.keys(this.config[listenerType] || {})) {
            this.$off(event, this.config[listenerType][event])
          }
          for (let event of Object.keys(config[listenerType] || {})) {
            this['$' + listenerType](event, config[listenerType][event])
          }
        }

        this.config = config
        this.ready = true
        this.$emit('ready')
      } catch (error) {
        this.ready = false
        this.error(error)
      }
    },
    analyze (...args) {
      if (args.length) {
        this.analysis = new Analysis(args, this.config.analyzers)
      } else if (!this.analysis) {
        if (!this.config.targets) {
          const error = new Error('Don\'t have any targets to analyse')
          this.error(error)
          return Promise.reject(error)
        }
        this.analysis = new Analysis(this.config.targets, this.config.analyzers)
      }
      return this.analysis.run().then(
        r => {
          this.$emit('analyzed', r)
          this.results = r
          return r
        },
        e => {
          if (!this.results) {
            this.results = []
          }
          this.error(e)
          return Promise.reject(e)
        }
      )
    },
    error (error) {
      if (!(error instanceof Error)) {
        error = new Error(error)
      }
      console.error(error)
      this.$emit('error', error)
    },
    commitAnnotations () {
      this.saving = true
      this.$emit('annotations-commit', [], () => {
        this.annotationsChanged = false
        this.saving = false
      }, (e) => {
        this.saving = false
        this.error(e)
      })
    }
  }
}
</script>
