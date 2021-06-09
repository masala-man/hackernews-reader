<template>
	<main class="ViewAuthor">
		<div class="user-details">
			<h1>{{user.username}}<span class="user-karma">({{user.karma}})</span></h1>
			<p class="user-bio"  v-html="user.about"/>
		<table class="user-stats">
			<tr>
				<td><b>Joined:</b></td>
				<td>{{date}}</td>
			</tr>
			<tr>
				<td><b>Posts:</b></td>
				<td>{{user.submission_count}}</td>
			</tr>
			<tr>
				<td><b>Comments:</b></td>
				<td>{{user.comment_count}}</td>
			</tr>
		</table>
		
		</div>
		<div class="user-posts">
		<h2>Posts:</h2>
		<PostItem v-for="(post, index) in posts" :key="index" :post="post"></PostItem>
		</div>
	</main>
</template>

<script>
import PostItem from "./PostItem.vue"
import * as axios from "axios"
import dateMixin from "../mixins/dateMixin"

export default {
	name: "ViewAuthor",
	mixins: [dateMixin],
	components: {
		PostItem
	},
	data(){
		return{
			user: {},
			date: {},
			posts: []
		}
	},
	created(){
		this.getPosts()
		this.getUser()
	},
	updated(){
		// this.getPosts()
		// this.getUser()
	},
	methods: {
		async getUser(){
			var response = await axios.get(`https://hn.algolia.com/api/v1/users/${this.$route.params.username}`)
			this.user = response.data
			this.formatDateSpecific(response.data.created_at)
		},
		async getPosts(){	
			var response = await axios.get(`http://hn.algolia.com/api/v1/search?tags=story,author_${this.$route.params.username}`)
			this.posts = response.data["hits"]
		}
	}
}
</script>

<style scoped>
.ViewAuthor{
	color: var(--text-color)
}
.user-karma{
	font-size: 18px;
}
.user-details{
	margin-top: 20px;
	margin-bottom: 30px;
}
td {
  padding-right: 10px;
}
</style>