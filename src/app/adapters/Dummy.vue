<script>
    import Abstract from './Abstract.vue'

    export default {
        extends: Abstract,
        settings: {
            replace: {
                type: 'textarea',
                value: 'science, comedy, radio, formats'
            }
        },
        locales: {
            en: {
                replace: 'List of words to find'
            },
            de: {
                replace: 'Liste zu ersetzender Worte'
            }
        },
        watch: {
            'settings.replace': function(replace) {
                if (this.handler) {
                    this.handler.clear()
                    this.enhance(this.enhancement)
                }
            },
            enhancement: function(enhancement) {
                this.handler = enhancement.handle(this.id)
                this.enhance(enhancement)
            }
        },
        methods: {
            enhance(enhancement) {
                var text = enhancement.text.toLowerCase()
                this.settings.replace.toLowerCase().replace(/\s*,\s*/, ',').split(',').forEach((keyword, i) => {
                    var pos = text.indexOf(keyword)
                    if (pos > 0) {
                        this.handler.add(
                            {
                                id: [this.id, keyword, i].join('-'),
                                start: pos
                            }
                        )
                    }
                })

                this.handler.done()
            }
        }
    }
</script>