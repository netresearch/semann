<template>
    <div class="form">
        <div v-for="(item, field) in config">

            <md-input-container
                v-if="item.type === 'textarea' || item.type === 'input'">
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

            <div v-if="item.type === 'checkbox'">
                <div>
                    <md-switch
                        v-model="value[field]"
                        id="field"
                        name="field"
                        @change="$emit('change', field)"
                        class="md-primary">{{item.label}}
                    </md-switch>
                </div>
            </div>

            <div v-if="item.type === 'radio'">
                <div>{{item}}
                    <md-radio
                        v-model="item[value]"
                        name="standbol-chain"
                        md-value="value[field]">{{item.label}}
                    </md-radio>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="application/ecmascript">
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
                // console.log(field, this.value.hasOwnProperty(field), this.value)
                if (!this.value.hasOwnProperty(field)) {
                    this.value[field] = this.config[field].value
                }
            })
        }
    }
</script>
