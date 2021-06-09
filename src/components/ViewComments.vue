<template>
	<main class="ViewComments">
		<div class="post-highlights">
			<a v-if="post.link!=null" :href="post.link"><h2>{{post.title}}</h2></a>
			<h2 v-else>{{post.title}}</h2>
			<span class="extended-details">
				{{post.points}} {{pointGrammar}} by 
				<router-link :to="{path: '/author/' + post.author}">{{post.author}}</router-link> - {{date}}
			</span>
		</div>		
		<p class="post-selftext" v-html="post.selftext"></p>
		<div class="comment-details">
			<h3>Comments:</h3>
			<p v-if="!this.comments.length" style="color: rgb(180, 180, 180);margin-bottom: 30px;">No Comments</p>
			<CommentItem v-for="(comment, index) in comments" :key="index" :comment="comment" :depth="0"></CommentItem>
		</div>
	</main>
</template>

<script>
import * as axios from "axios";
import dateMixin from "../mixins/dateMixin";
import pointMixin from "../mixins/pointMixin";
import CommentItem from "./CommentItem.vue";

export default {
	name: "ViewComments",
	mixins: [pointMixin, dateMixin],
	components: {
		CommentItem
	},
	computed: {
		pointGrammar(){
			if (this.points == 1)
			return "pt"
			else return "pts"
		}
	},
	data(){
		return{
			date: {},
			comments: [],
			post: {}
		}
	},
	created(){
		this.getPostDetails()
	},
	updated(){
		// this.getPostDetails()
	},
	methods:{
		async getPostDetails(){
			var response = await axios.get(`http://hn.algolia.com/api/v1/items/${this.$route.params.id}`)
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
	color: var(--text-color)
}
.post-highlights{
	margin-top: 20px;
	margin-bottom: 30px;
}
.extended-details{
	color: darkgray;
}
.extended-details > a{
	color: darkgray;
}
.extended-details > a:hover{
	color: gray;
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