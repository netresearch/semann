<template>
    <div id="app">
        <img src="./assets/logo.png">
        <hello></hello>
    </div>
</template>

<script>
import Hello from './components/Hello'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

export default {
    name: 'app',
    mixins: [require('./mixins/api')],
    mounted: function() {
        this.api.setDimensions(this.$el.offsetWidth, this.$el.offsetHeight)
        this.resizeSensor = new ResizeSensor(this.$el, () => {
            this.api.setDimensions(this.$el.offsetWidth, this.$el.offsetHeight)
        })
    },
    components: {
        Hello
    }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
