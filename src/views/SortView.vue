<template>
    <div class="bigSortBooks">
        <div class="bigSortitle">
            <router-link v-for="d in data" :key="d.id" :to="{ name: 'sortBook', params: { id: d.node[0].id, url: d.node[0].url } }">
                <span>{{ d.name }}</span>
            </router-link>
        </div>
        <router-view />
    </div>
</template>
<script>
import { bigSortBooks } from '../apis/sortBooks'
export default {
    data() {
        return {
            data: '',
            active: 0,
            activeName: 0,
            // smallData: ''
        }
    },
    methods: {
        async bigSortBooks() {
            let data = await bigSortBooks();
            this.data = data.books;
            console.log('data', data.books)
        },
    },
    mounted() {
        this.bigSortBooks();
    },
}
</script>