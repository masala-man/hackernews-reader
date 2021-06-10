<template>
	<div class="PostItem">
		<router-link v-if="isSelf" :to="{path: '/comments/' + post.objectID}"><h3>{{post.title}}</h3></router-link>
		<a v-else :href="post.url"><h3>{{post.title}}</h3></a>
		<div class="details">{{post.points}} {{pointGrammar(this.post)}} by 
			<router-link :to="{path: '/user/' + post.author}">{{post.author}}</router-link>
			/ {{date}} / 
			<router-link :to="{path: '/comments/' + post.objectID}">Comments</router-link>
		</div>
	</div>
</template>

<script>
import dateMixin from "../mixins/dateMixin"
import pointMixin from "../mixins/pointMixin";

export default {
	name: "PostItem",
	mixins: [pointMixin,dateMixin],
	props: {
		post: {
			type: Object,
			required: true
		}
	},
	data(){
		return{
			date: {}
		}
	},
	created(){
		this.formatDateRelative(this.post.created_at)
	},
	computed: {
		isSelf(){
			if (this.post.url == null)
				return true
			else
				return false
		}
	}
}
</script>

<style scoped>
.PostItem{
	font-family: "Roboto Mono", monospace;
	margin-top: 15px;
	margin-bottom: 15px;
	color: var(--text-color)
}
@media (max-width: 768px) {
	h3{
		font-size: 16px;
	}
	.details{
		font-size: 14px;
	}
}
@media (max-width: 425px) {
	h3{
		font-size: 14px;
	}
	.details{
		font-size: 12px;
	}
}
/* @media (max-width: 375px) {
	h1{
		font-size: 19px;
	} */
/* } */
</style>
