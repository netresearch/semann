<script type="application/ecmascript">
    /**
     * Dummy adapter
     *
     * @author   Christian Opitz <christian.optiz@netresearch.de>
     * @license  MIT License
     * @link     https://opensource.org/licenses/MIT
     * @version  0.0.1
     */
    import Abstract from './Abstract.vue'

    export default {
        extends: Abstract,
        settings: {
            replace: {
                type: 'textarea',
                value: 'guide, science'
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
            'settings.replace': function (replace) {
                if (this.handler) {
                    this.handler.clear()
                    this.enhance(this.enhancement)
                }
            },
            enhancement: function (enhancement) {
                this.handler = enhancement.handle(this.id)
                this.enhance(enhancement)
            }
        },
        methods: {
            /**
             * Enhance content
             *
             * @property {string} enhancement Text to enhance
             */
            enhance(enhancement) {
                let text = enhancement.text.toLowerCase()
                this.settings.replace
                    .toLowerCase()
                    .replace(/\s*,\s*/g, ',')
                    .split(',')
                    .forEach((keyword, i) => {
                        let pos = text.indexOf(keyword)
                        if (pos >= 0) {
                            this.handler.add(
                                {
                                    id: [this.id, keyword, i].join('-'),
                                    title: keyword,
                                    start: pos,
                                    length: keyword.length
                                }
                            )
                        }
                    })

                this.handler.done()
            }
        }
    }
</script>
