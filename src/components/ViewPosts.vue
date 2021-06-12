<template>
	<main class=ViewPosts>
		<LoadingBar v-if="loading==true"/>
		<div class="post-list-wrapper">
			<PostItem v-for="(post, index) in posts" :key="index" :post="post"></PostItem>
			<a class="unselectable next-button" v-if="posts.length<postLimit && loading==false" v-on:click="fetchMore">[MORE]</a>
		</div>
	</main>
</template>

<script>
import * as axios from "axios";
import PostItem from "./PostItem.vue"
import LoadingBar from "./LoadingBar.vue"

export default {
	name: "ViewPosts",
	components: {
		PostItem,
		LoadingBar
	},
	data() {
		return{ 
			posts: [],
			page: 0,
			postLimit: 0,
			loading: true
		}
	},
	created() {
		this.fetchNews()
	},
	updated(){
		document.title = this.$route.meta.title;
	},
	methods: {
		async fetchNews() {
			let url = ""
			if (this.$route.path === "/ask") url = `https://hn.algolia.com/api/v1/search_by_date?tags=ask_hn&page=${this.page}`;
			if (this.$route.path === "/polls") url = `https://hn.algolia.com/api/v1/search_by_date?tags=poll&page=${this.page}`;
			if (this.$route.path === "/show") url = `https://hn.algolia.com/api/v1/search_by_date?tags=show_hn&page=${this.page}`;
			if (this.$route.path === "/") url = `https://hn.algolia.com/api/v1/search?tags=front_page&page=${this.page}`;
			this.loading = true
			var response = await axios.get(url)
			this.postLimit = response.data.nbHits
			this.loading = false
			response.data.hits.forEach(hit => {
				this.posts.push(hit)	
			});
		},
		fetchMore(){
			this.page += 1
			this.fetchNews()
		}
	}
}
</script>

<style scoped>
.ViewPosts{
	min-height: 70vh;
	margin-bottom: 30px;
}
.LoadingBar{
	grid-area: 1 ;
}
a.next-button{
	color: var(--button-color);
}
a.next-button:hover{
		color: var(--button-hover-color);
		cursor: pointer;
}
</style>