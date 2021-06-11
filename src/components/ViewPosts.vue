<template>
	<main class=ViewPosts>
		<PostItem v-for="(post, index) in posts" :key="index" :post="post"></PostItem>
		<a class="unselectable next-button" v-if="page<pageLimit" v-on:click="fetchMore">[MORE]</a>
	</main>
</template>

<script>
import * as axios from "axios";
import PostItem from "./PostItem.vue"

export default {
	name: "ViewPosts",
	components: {
		PostItem
	},
	data() {
		return{ 
			posts: [],
			page: 0,
			pageLimit: 0
		}
	},
	created() {
		document.title = this.$route.meta.title;
		this.fetchNews()
	},
	updated(){
		document.title = this.$route.meta.title;
		// this.fetchNews()
	},
	methods: {
		async fetchNews() {
			let url = ""
			if (this.$route.path === "/ask") url = `https://hn.algolia.com/api/v1/search_by_date?tags=ask_hn&page=${this.page}`;
			if (this.$route.path === "/polls") url = `https://hn.algolia.com/api/v1/search_by_date?tags=poll&page=${this.page}`;
			if (this.$route.path === "/show") url = `https://hn.algolia.com/api/v1/search_by_date?tags=show_hn&page=${this.page}`;
			if (this.$route.path === "/") url = `https://hn.algolia.com/api/v1/search?tags=front_page&page=${this.page}`;
			var response = await axios.get(url)
			if (this.pageLimit==0){
				this.pageLimit = response.data.nbPages
			}
			response.data.hits.forEach(hit => {
				this.posts.push(hit)	
			});
		},
		fetchMore(){
			this.fetchNews()
			this.page += 1
		}
	}
}
</script>

<style scoped>
.ViewPosts{
	min-height: 70vh;
	margin-bottom: 30px;
}
a.next-button{
	color: var(--button-color);
}
a.next-button:hover{
		color: var(--button-hover-color);
		cursor: pointer;
}
</style>