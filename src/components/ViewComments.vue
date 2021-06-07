<template>
	<main class="ViewComments">
		<div class="post-highlights">
			<a v-if="post.link!=null" :href="post.link"><h2>{{post.title}}</h2></a>
			<h2 v-else>{{post.title}}</h2>
			<span class="extended-details">
				{{post.points}} {{pointGrammar}} by 
			<router-link :to="{path: '/author/' + post.author}">{{post.author}}</router-link> - {{readableDateString}}
			</span>
		</div>		
		<p class="post-selftext" v-if="this.post.selftext" v-html="this.post.selftext">
		<p v-else style="color: rgb(180, 180, 180);	margin-bottom: 30px;">Empty Post</p>
		<div class="comment-details">
			<!-- <h3>Comments:</h3> -->
			<!-- {{comments}} -->
		</div>
	</main>
</template>

<script>
import * as axios from 'axios';

export default {
	name: "ViewComments",
	computed: {
		pointGrammar(){
			if (this.points == 1)
			return "pt"
			else return "pts"
		}
	},
	data(){
		return{
			comments: [],
			post: {
				title: {},
				points: {},
				comments: {},
				date: {},
				author: {},
				selftext: {},
				link: {}
			},
			readableDateString: {}
		}
	},
	created(){
		this.getPostDetails()
		// this.organizeComments()
	},
	updated(){
		this.getPostDetails()
		// this.organizeComments()
	},
	methods:{
		async getPostDetails(){
			var response = await axios.get(`http://hn.algolia.com/api/v1/search?tags=story_${this.$route.params.id}`)
			var result = response.data['hits']
			this.post = {
				title: result[0].title,
				points: result[0].points,
				comments: result[0].num_comments,
				date: result[0].created_at,
				author: result[0].author,
				selftext: result[0].story_text,
				link: result[0].url
			}
			result.shift()
			this.comments = result
			var readableDate = new Date(this.post.date);
			this.readableDateString = readableDate.toLocaleString('en-IN', {"dateStyle": "medium","timeStyle": "short"});
		},
		search(id, myArray){
			for (var i=0; i < myArray.length; i++) {
				if (myArray[i].objectID === id) {
					return i;
				}
			}
		},
		organizeComments(){
			//TODO
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