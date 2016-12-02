<template>
    <md-list-item>
        <md-checkbox v-model="settings.active">{{config.title || id}}</md-checkbox>
        <md-list-expand v-if="$options.settings && settings.active">
            <settings-form v-model="settings" :config="$options.settings"></settings-form>
        </md-list-expand>
    </md-list-item>
</template>

<script>
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
            var settings = {
                active: true
            }
            if (this.$options.settings) {
                Object.keys(this.$options.settings).forEach(field => {
                    if (field === 'active') {
                        throw new Error('Field name active is reserved')
                    }
                    if (!this.$options.settings[field].hasOwnProperty('label')) {
                        this.$options.settings[field].label = this.$t(field)
                    }
                    settings[field] = this.$options.settings[field].value
                })
            }
            return {
                settings
            }
        },
        watch: {
            settings: {
                deep: true,
                handler(settings) {
                    console.log('Settings should be stored/restored in/from LocalStorage', settings)
                }
            }
        },
        components: {
            'settings-form': Form
        }
    }
</script>