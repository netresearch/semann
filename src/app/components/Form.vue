<template>
    <div class="form">
        <div v-for="(item, field) in config">
            <md-input-container v-if="item.type === 'textarea' || item.type === 'input'">
                <label>{{item.label}}</label>
                <component :is="'md-' + item.type"
                    v-model="value[field]"
                    :disabled="disabled"
                    :required="required"
                    :placeholder="placeholder"
                    :maxlength="maxlength"
                    @change="$emit('change', field)"
                ></component>
            </md-input-container>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            config: {
                type: Object,
                required: true
            },
            value: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        created() {
            Object.keys(this.config).forEach(field => {
                if (!this.value.hasOwnProperty(field)) {
                    this.value[field] = this.config[field].value
                }
            })
        }
    }
</script>