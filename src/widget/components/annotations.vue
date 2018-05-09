<template>
  <div class="semann-annotations">
    <div class="semann-annotation" v-for="(annotation, i) in annotations" :key="i">
      <i class="el-icon-info"></i>
      {{options.type[annotation.type]}} with
      {{options.property[annotation.property]}}
      <el-button type="text" icon="el-icon-delete"></el-button>
    </div>
    <el-button
      v-if="!adding"
      type="text"
      icon="el-icon-plus"
      size="small"
      @click="adding = {property: null, type: null}"
    >{{$t('annotations.embed')}}</el-button>
    <div v-else class="semann-annotations-form">
      <el-select
        v-for="(opts, name) in options"
        :key="name"
        v-model="adding[name]"
        :placeholder="name === 'type' ? 'Annotation' : 'Source'"
        size="small"
      >
        <el-option
          v-for="(label, value) in opts"
          :key="name + '-' + value"
          :value="value"
          :label="label"
        ></el-option>
      </el-select>
      <el-button-group>
        <el-button
          type="info"
          size="small"
          icon="el-icon-close"
          plain
          @click="adding = false"
        ></el-button>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-check"
          @click="add(adding); adding = false"
          :disabled="!adding.property || !adding.type"
        ></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<style lang="scss" src="./annotations.scss"></style>

<script>

export default {
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      adding: false,
      annotations: []
    }
  },
  computed: {
    options () {
      const property = {'*': 'All'}
      for (let key of Object.keys(this.result.properties)) {
        property[key] = key[0].toUpperCase() + key.substr(1)
      }
      return {
        type: {
          'wa-body': 'Web annotation on body',
          'wa-container': 'Web annotation on container',
          'wa-occurence': 'Web annotation on occurrence' + (this.result.occurrences.length > 1 ? 's' : ''),
          'merge': 'Add property to entity'
        },
        property
      }
    }
  },
  methods: {
    add (annotation) {
      this.annotations.push(annotation)
      this.$root.widget.$emit('annotation-added')
    }
  }
}
</script>
