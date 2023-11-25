<template>
    <div>
        <div>
            <router-link v-for="d in data" :key="d.index" :to="{name:'sortCont',params:{url:d.url}}">
                <span >{{ d.name }}</span>
            </router-link>
        </div>
        <router-view/>
    </div>
</template>


<script>
import { bigTowSortBooks } from '../../apis/sortBooks'
export default {
    props: ['id', 'url'],
    data() {
        return {
            data: ''
        }
    },
    methods: {
        async bigTowSortBooks(url) {
            let data = await bigTowSortBooks(url);
            this.data = data.list[0].labels;
            console.log('labels', data.list[0].labels)
        },
    },
    mounted() {
        if (this.url != '') {
            this.bigTowSortBooks(this.url);
        }
    },
    watch: {
        url() {
            this.bigTowSortBooks(this.url);
        }
    }
}
</script>