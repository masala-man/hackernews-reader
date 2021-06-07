<template>
	<main class=ViewPosts>
		<PostItem v-for="(post, index) in posts" :key="index" :post="post"></PostItem>
	</main>
</template>

<script>
import * as axios from 'axios';
import PostItem from './PostItem.vue'

export default {
	name: "ViewPosts",
	components: {
		PostItem
	},
	data() {
		return{ 
			posts: []
		}
	},
	watch: {
		pageNo: function(){
			this.fetchNews()
		}
	},
	created() {
			this.fetchNews()
	},
	updated(){
		this.fetchNews()
	},
	methods: {
		async fetchNews() {
			try {
				let url = ""
				if (this.$route.path === '/ask') {
					url = "http://hn.algolia.com/api/v1/search?tags=ask_hn"
				}
				if (this.$route.path === '/jobs') {
					url = "http://hn.algolia.com/api/v1/search?tags=hn_jobs"
				}
				if (this.$route.path === '/show') {
					url = "http://hn.algolia.com/api/v1/search?tags=show_hn"
				}
				if (this.$route.path === '/') {
					url = 'http://hn.algolia.com/api/v1/search?tags=front_page'
				}
				var response = await axios.get(url)
				this.posts = response.data['hits']
			}
			catch (err) {
				if (err.response) {
					// client received an error response (5xx, 4xx)
					console.log("Server Error:", err)
				}
				else if (err.request) {
					// client never received a response, or request never left
					console.log("Network Error:", err)
				}
				else {
					console.log("Client Error:", err)
				}
			}
		}
	}
}
</script>

<style scoped>

</style>