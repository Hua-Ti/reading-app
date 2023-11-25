<template>
    <div>
        <div>
           {{ url }}
        </div>
    </div>
</template>

<script>
import { bigContent } from '../../apis/sortBooks'
export default {
    props: [ 'url'],
    data() {
        return {
            // smallData: ''
            data: ''
        }
    },
    methods: {
        async bigContent(url) {
            let data = await bigContent(url);
            this.data = data;
            console.log('data3', data)
        },
    },
    mounted() {
        if (this.url != '') {
            this.bigContent(this.url);
        }
    },
    watch: {
        url() {
            this.bigContent(this.url);
        }
    }
}
</script>