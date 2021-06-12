<template>
	<main class="ViewComments">
		<LoadingBar v-if="loading==true"/>
		<div v-else class="comment-wrapper">
			<div class="post-highlights">
				<a v-if="post.link!=null" :href="post.link" target="_blank" rel="noopener noreferrer"><h2>{{post.title}}</h2></a>
				<h2 v-else>{{post.title}}</h2>
				<span class="extended-details">
					{{post.points}} {{pointGrammar(this.post)}} by 
					<router-link :to="{name: 'author', params: {username: post.author}}">{{post.author}}</router-link> - {{date}}
				</span>
			</div>		
			<p class="post-selftext" v-html="post.selftext"></p>
			<div class="comment-details">
				<h3>Comments:</h3>
				<p v-if="!this.comments.length" style="color: rgb(180, 180, 180);margin-bottom: 30px;">No Comments</p>
				<CommentItem v-for="(comment, index) in comments" :key="index" :comment="comment" :depth="0"></CommentItem>
			</div>
		</div>
	</main>
</template>

<script>
import * as axios from "axios";
import dateMixin from "../mixins/dateMixin";
import pointMixin from "../mixins/pointMixin";
import CommentItem from "./CommentItem.vue";
import LoadingBar from "./LoadingBar.vue"

export default {
	name: "ViewComments",
	mixins: [pointMixin, dateMixin],
	components: {
		CommentItem,
		LoadingBar
	},
	data(){
		return{
			date: {},
			comments: [],
			post: {},
			loading: {}
		}
	},
	created(){
		this.getPostDetails()
	},
	methods:{
		async getPostDetails(){
			this.loading = true
			var response = await axios.get(`https://hn.algolia.com/api/v1/items/${this.$route.params.id}`)
			this.loading = false
			var result = response.data
			this.post = {
				title: result.title,
				points: result.points,
				comments: result.num_comments,
				date: result.created_at,
				author: result.author,
				selftext: result.text,
				link: result.url
			}
			this.comments = result.children
			this.formatDateSpecific(this.post.date)
		}
	}
}
</script>

<style scoped>
.ViewComments{
	color: var(--text-color);
	min-height: 70vh;
}
.post-highlights{
	margin-top: 20px;
	margin-bottom: 30px;
}
.extended-details{
	color: var(--button-color);
}
.extended-details > a{
	color: var(--button-color);
}
.extended-details > a:hover{
	color: var(--button-hover-color);
}
.comment-details{
	margin-top: 30px;
	margin-bottom: 30px;
}
h3{
	margin-bottom: 15px;
}
@media (max-width: 425px) {
	.extended-details{
		font-size: 12px;
	}
	.post-selftext{
		font-size: 14px;
	}
}
</style>