<template>
    <md-list-item>
        <md-checkbox v-model="settings.active">{{config.title || id}}</md-checkbox>
        <md-list-expand v-if="$options.settings && settings.active">
            <settings-form v-model="settings"
                           v-if="settingsOptions"
                           :config="settingsOptions"></settings-form>
        </md-list-expand>
    </md-list-item>
</template>

<script type="application/ecmascript">
    import Form from '../components/Form.vue'

    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            config: {
                type: Object,
                required: true
            },
            enhancement: {
                type: Object
            }
        },

        data() {
            return {
                settingsOptions: undefined,
                settings: {
                    'active': true
                }
            }
        },

        created() {
            if (this.$options.settings) {
                const takeOverSettings = (settingsOptions) => {
                    this.settingsOptions = settingsOptions
                    Object.keys(settingsOptions).forEach(field => {
                        if (field === 'active') {
                            throw new Error('Field name active is reserved')
                        }
                        if (!settingsOptions[field].hasOwnProperty('label')) {
                            settingsOptions[field].label = this.$t(field)
                        }
                        this.$set(this.settings, field, settingsOptions[field].value)
                    })
                }
                if (typeof this.$options.settings === 'function') {
                    this.$options.settings.call(this).then(takeOverSettings)
                } else {
                    takeOverSettings(this.$options.settings)
                }
            }
        },

        watch: {
            settings: {
                deep: true,
                handler(settings) {
                    // @todo Settings should be stored/restored in/from LocalStorage
                    // @link https://www.npmjs.com/package/vue-localstorage
                    console.warn('Settings should be stored/restored in/from LocalStorage', settings)
                }
            }
        },
        components: {
            'settings-form': Form
        }
    }
</script>
