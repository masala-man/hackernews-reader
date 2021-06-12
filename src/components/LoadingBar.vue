<template>
	<div class="LoadingBar">
		{{content}}
	</div>
</template>

<script>
export default {
	name: "LoadingBar",
	data(){
		return{
			content: "       "
		}
	},
	mounted() {
	window.setInterval(() => {
			this.updateLoader()
		}, 200)
	},
	methods: {
		updateLoader(){
			if (this.content == "#######")
				this.content = this.content.replace(/#/g,' ');
			this.content = this.content.replace(/ /,'#');
		}
	}
}
</script>

<style scoped>
.LoadingBar{
	color: var(--text-color);
	font-size: 30px;
	text-align: center;
	margin-top: 30vh;
	font-weight: bold;
}
@media (max-width: 425px) {
	.LoadingBar{
		font-size: 20px;
	}
}
</style>