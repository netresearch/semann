<template>
    <div id="app" v-md-theme="'default'">
        <md-toolbar class="md-dense">
            <h2 class="md-title" style="flex: 1">{{config.title}}</h2>
            <md-button class="md-icon-button" @click="$refs.sidenav.toggle()">
                <md-icon>menu</md-icon>
            </md-button>
        </md-toolbar>
        <md-sidenav class="md-right" ref="sidenav">
            <md-toolbar class="md-dense md-accent">
                <div class="md-toolbar-container">
                    <h3 class="md-title" style="flex: 1">{{$t('settings')}}</h3>
                    <md-button class="md-icon-button"
                               @click="$refs.sidenav.toggle()">
                        <md-icon>chevron_right</md-icon>
                    </md-button>
                </div>
            </md-toolbar>
            <md-tabs class="md-transparent">
                <md-tab
                    :md-label="$tc('connector', Object.keys(config.connectors).length)">
                    <md-list>
                        <template
                            v-for="(connectorConfig, connectorId) in config.connectors">
                            <component :is="'adapter-' + connectorConfig.adapter"
                                       :config="connectorConfig"
                                       :id="connectorId"
                                       :enhancement="enhancement"></component>
                        </template>
                    </md-list>
                </md-tab>
                <md-tab :md-label="$tc('others')"></md-tab>
            </md-tabs>
        </md-sidenav>
        <md-list v-if="enhancement">
            <md-list-item v-for="(entities, entityId) in enhancement.results">
                <span>{{entityId}}</span>
                <md-list-expand>
                    <md-list>
                        <md-list-item v-for="entry in entities" class="md-inset">
                            Source: {{entry.source}}
                        </md-list-item>
                    </md-list>
                </md-list-expand>
            </md-list-item>
        </md-list>
    </div>
</template>

<script type="application/ecmascript">
    import Config from './config'
    import Vue from 'vue'

    export default {
        name: 'app',
        mixins: [require('./mixins/api')],
        data: function () {
            return {
                config: Config,
                enhancement: undefined
            }
        },
        created() {
            this.api.registerServer('app', {

                /**
                 * Enhance content
                 * @property {string} text - Text to enhance
                 * */
                enhance: (text) => {
                    if (!this.enhancement || this.enhancement.text !== text) {
                        let newId = this.enhancement ? this.enhancement.id + 1 : 1
                        this.enhancement = {
                            text,
                            id: newId,
                            queue: [],
                            results: {},

                            /**
                             *
                             */
                            handle: function (id) {
                                this.enhancement.queue.push(id)
                                return {
                                    /**
                                     * Add enhancement on position
                                     *
                                     * @property {*} entity
                                     * @return void
                                     */
                                    add: (entity) => {
                                        if (!this.enhancement.results.hasOwnProperty(entity.id)) {
                                            Vue.set(this.enhancement.results, entity.id, [])
                                        }
                                        this.enhancement.results[entity.id].push({
                                            source: id,
                                            entity: entity
                                        })
                                        this.api.dispatch('enhancement-entity-add', this.enhancement.id, entity)
                                    },

                                    /**
                                     * Clear all enhancements
                                     */
                                    clear: () => {
                                        let results = {}
                                        Object.keys(this.enhancement.results).forEach(entityId => {
                                            let entities = []
                                            this.enhancement.results[entityId].forEach(entity => {
                                                if (entity.source !== id) {
                                                    entities.push(entity)
                                                } else {
                                                    this.api.dispatch('enhancement-entity-remove', this.enhancement.id, entity)
                                                }
                                            })
                                            if (entities.length) {
                                                results[entityId] = entities
                                            }
                                        })
                                        this.enhancement.results = results
                                    },

                                    /**
                                     * Return enhancements
                                     */
                                    done: () => {
                                        this.enhancement.queue = this.enhancement.queue.filter(value => {
                                            return value !== id
                                        })
                                        this.api.dispatch('enhancement-done', this.enhancement.id, this.enhancement.results)
                                    }
                                }
                            }.bind(this)
                        }
                    }
                    return this.enhancement.id
                }
            })
        },
        components: {
            'adapter-dummy': require('./adapters/Dummy.vue'),
            'adapter-mummy': require('./adapters/Mummy.vue')
        }
    }

</script>

<style lang="scss" rel="stylesheet/scss">
    #app {
        > .md-sidenav > .md-sidenav-content {
            left: 0
        }
        > .md-sidenav {
            .md-tab {
                padding: 0;
            }
            .form {
                padding: 1px 16px;
                border-top: 1px solid rgba(0, 0, 0, .12);
            }
        }
    }
</style>
