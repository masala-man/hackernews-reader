<template>
	<main class="ViewAuthor">
		<PostItem v-for="(post, index) in posts" :key="index" :post="post"></PostItem>
	</main>
</template>

<script>
import PostItem from './PostItem.vue'
import * as axios from 'axios'

export default {
	name: "ViewAuthor",
	components: {
		PostItem
	},
	data(){
		return{
			posts: []
		}
	},
	created(){
		this.getPosts()
	},
	updated(){
		this.getPosts()
	},
	methods: {
		async getPosts(){	
			var response = await axios.get(`http://hn.algolia.com/api/v1/search?tags=story,author_${this.$route.params.username}`)
			this.posts = response.data['hits']
		}
	}
}
</script>

<style scoped>

</style>