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
			<p v-if="!this.posts.length" style="color: rgb(180, 180, 180);margin-bottom: 30px;">No Posts</p>
			<PostItem v-for="(post, index) in posts" :key="index" :post="post"></PostItem>
		</div>
		<div class="user-comments">
			<h2>Comments:</h2>
			<CommentItem v-for="(comment, index) in comments" :key="index" :comment="comment" :depth="0"></CommentItem>
		</div>
	</main>
</template>

<script>
import PostItem from "./PostItem.vue"
import CommentItem from "./CommentItem.vue"
import * as axios from "axios"
import dateMixin from "../mixins/dateMixin"

export default {
	name: "ViewAuthor",
	mixins: [dateMixin],
	components: {
		PostItem,
		CommentItem
	},
	data(){
		return{
			user: {},
			date: {},
			posts: [],
			comments: []
		}
	},
	created(){
		document.title = `${this.$route.params.username} | HNR`;
		this.getPosts()
		this.getUser()
		this.getComments()
	},
	methods: {
		async getUser(){
			var response = await axios.get(`https://hn.algolia.com/api/v1/users/${this.$route.params.username}`)
			this.user = response.data
			this.formatDateSpecific(response.data.created_at)
		},
		async getPosts(){	
			var response = await axios.get(`https://hn.algolia.com/api/v1/search?tags=story,author_${this.$route.params.username}`)
			this.posts = response.data.hits
		},
		async getComments(){
			var response = await axios.get(`https://hn.algolia.com/api/v1/search?tags=comment,author_${this.$route.params.username}`)
			var results = response.data.hits
			this.comments = results.map(comment => ({
				author: comment.author,
				text: comment.comment_text,
				points: comment.points,
				created_at: comment.created_at,
				parent: {
					title: comment.story_title,
					id: `${comment.story_id}`
				}
			}))
		}
	}
}
</script>

<style scoped>
.ViewAuthor{
	color: var(--text-color);
	min-height: 70vh;
}
.user-karma{
	font-size: 18px;
}
.user-details{
	margin-top: 20px;
	margin-bottom: 30px;
}
.user-posts{
	margin-bottom: 30px;
}
.user-comments{
	margin-bottom: 30px;
}
td {
  padding-right: 10px;
}
h2{
	margin-bottom: 15px;
}
</style>