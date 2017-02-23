<script type="application/ecmascript">
    /**
     * Stanbol adapter
     *
     * @author   Christian Opitz <christian.optiz@netresearch.de>
     * @license  MIT License
     * @link     https://opensource.org/licenses/MIT
     * @version  0.0.1
     */
    import Abstract from './Abstract.vue'

    export default {
        extends: Abstract,
        settings() {
            return new Promise((resolve, reject) => {
                this.$http.get(this.config.url + '/enhancer/chain').then((response) => {
                    let stanbolChains = {}

                    // Remove first element
                    response.body['@graph'].shift()

                    // @todo Use settings for it
                    response.body['@graph'].forEach((data, i) => {
                        stanbolChains[data.label] = {
                            type: 'checkbox',
                            group: 'chain',
                            value: data.label == 'dbpedia-disambiguation' ? true : false,
                            service: data.label
                        }
                    })
                    this.$forceUpdate()
                    resolve(stanbolChains)
                }, (response) => {
                    console.warn(response)
                })
            })
        },
        locales: {
            en: {
                'all-active': 'All active',
                'dbpedia-disambiguation': 'DBPedia disambiguation',
                'dbpedia-fst-linking': 'DBPedia fst linking',
                'dbpedia-proper-noun': 'DBPedia proper-noun',
                'dbpedia-spotlight': 'DBPedia spotlight',
                'default': 'Default',
                'language': 'Language'
            },
            de: {
                chain: 'Kette',
                'all-active': 'Alle Ketten',
                'dbpedia-disambiguation': 'DBPedia Begriffsklärung',
                'dbpedia-fst-linking': 'DBPedia Fst-Verknüpfung',
                'dbpedia-proper-noun': 'DBPedia Eigennamen',
                'dbpedia-spotlight': 'DBPedia Spotlight',
                'default': 'Standard',
                'language': 'Spracherkennung'
            }
        },

        watch: {
            settings: {
                deep: true,
                handler() {
                    if (this.enhancement) {
                        this.handler.clear()
                        this.enhance(this.enhancement)
                    }
                }
            },
            enhancement: function (enhancement) {
                this.handler = enhancement.handle(this.id)
                this.enhance(enhancement)
            }
        },

        methods: {
            /**
             * Load chains
             **/
            load(chainKey, text) {
                this.$http.post(
                    chainKey ? this.config.url + '/enhancer/chain/' + chainKey : this.config.url + '/enhancer',
                    text,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'text/plain'
                        }
                    }
                ).then((response) => {

                    // get body
                    response.body['@graph'].forEach((keyword, i) => {
                        let data = {}

                        // DBpedia
                        if (keyword['@id'].substring(0, 19) === 'http://dbpedia.org/') {
                            data.id = [this.id, i].join('-')
                            data.title = keyword['rdfs:label'][0]['@value']
                            data.foaf = keyword['foaf:depiction']
                            data.comment = keyword['rdfs:comment']['@value']
                        }
                        // Transmit data to view
                        if (typeof data.id !== 'undefined') {
                            this.handler.add(data)
                        }

                    })

                    // Force update
                    this.$forceUpdate()
                    this.handler.done()
                }, (response) => {
                    console.warn(response)
                })

            },

            /**
             * Enhance content
             *
             * @property {string} enhancement Text to enhance
             */
            enhance(enhancement) {
                if (typeof this.config.url === 'undefined') {
                    return console.error('Please configure the standbol url!')
                }
                // @todo Check architecture
                if (this.settings.active === false) {
                    return this.handler.clear()
                }

                this.config.features.chain.forEach((keyword, i) => {
                    if (this.settings[keyword]) {
                        this.load(
                            keyword,
                            enhancement.text
                        )
                    }
                })
            }
        }
    }
</script>
