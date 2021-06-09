<template>
	<div class="CommentItem">
		<div v-if="comment.author!=null" :style="indent" class="comment-content">
			<span class="comment-highlights">
				<a class="unselectable expand-button" v-if="comment.children.length" v-on:click="toggleChildren">[{{button}}]</a> <router-link :to="{path: '/author/' + comment.author}">{{comment.author}}</router-link>
				<span class="comment-points" v-if="comment.points!=null"> / {{comment.points}} {{pointGrammar}}</span>
				<span class="comment-date"> / {{date}}</span>
			</span>
			<br>
			<p class="comment-text" v-html="comment.text"></p>
		</div>
		<div :style="childDisplay" class="comment-children" v-if="comment.children && comment.children.length">
			<CommentItem  v-for="(child, index) in comment.children" :key="index" :comment="child" :depth="depth + 1"></CommentItem>
		</div>
	</div>
</template>

<script>
import dateMixin from "../mixins/dateMixin"
import pointMixin from "../mixins/pointMixin"

export default {
	name: "CommentItem",
	mixins: [dateMixin,pointMixin],
	props: {
		comment: {
			type: Object,
			required: true
		},
		depth: {
			type: Number,
			required: true
		}
	},
	data(){
		return{
			date: {},
			childDisplay: {display: "none"},
			button: "+"
		}
	},
	created(){
		this.formatDateRelative(this.comment.created_at)
	},
	updated(){
	},
	computed: {
		indent() {
			var indentColors = ["#de3a3c", "#f702ca", "#6e3ade", "#5ab0ed", "#21b555", "#d5db1f", "#db831f", "#db2e1f"]
			var computedStyle = {
				transform: `translate(${this.depth * 25}px)`,
				"border-left": `3px solid ${indentColors[this.depth]}`
			}
			return computedStyle
		},
		padding() {
			if (this.depth == 0){
				return {"padding-left": "0px"}
			}
			else return {"padding-left": "10px"}
		}
	},
	methods: {
		toggleChildren(){
			if (this.childDisplay.display == "none") this.childDisplay.display = "unset"
			else this.childDisplay.display = "none";
			if (this.button == "+") this.button = "-"
			else this.button = "+";
		}
	}
}
</script>

<style scoped>
.comment-highlights{
	color: gray;
}
.comment-highlights a{
	color: gray;
}
.comment-highlights a:hover{
	color: var(--accent-color)
}
a.expand-button:hover{
	color: darkgray;
}
.comment-content{
	padding-left: 10px;
	margin-bottom: 15px;
}
p{
	font-size: 14px;
}
.comment-content{
	border-left: 3px solid var(--accent-color);
	border-radius: 3px;
}
.comment-children{
	display: none;
}
.comment-children:hover{
	display: unset;
}
@media (max-width: 425px) {
	.comment-text{
		font-size: 12px;
	}
	.comment-highlights{
		font-size: 14px;
	}
}
</style>