<template>
	<header class="AppHeader">
		<h1>
			<span v-if="this.$parent.theme=='lightMode'" class="unselectable">👨‍💻</span>
			<span v-else class="unselectable">🦸‍♂️</span>		
			<router-link :to="{name: 'Front Page'}">HNR</router-link> / 
			<router-link :to="{name: 'Ask'}">ASK</router-link> / 
			<router-link :to="{name: 'Show'}">SHOW</router-link> / 
			<router-link :to="{name: 'Jobs'}">JOBS</router-link>
		</h1>
	</header>
</template>

<script>
export default {
	name: "AppHeader"
}
</script>

<style scoped>
.AppHeader{
	margin-top: 20px;
	margin-bottom: 20px;
	font-family: "Roboto Mono", monospace;
	color: var(--text-color)
}
@media (max-width: 768px) {
	h1{
		font-size: 28px;
	}
}
@media (max-width: 425px) {
	h1{
		font-size: 22px;
	}
}
@media (max-width: 375px) {
	h1{
		font-size: 19px;
	}
}
@media (max-width: 320px) {
	h1{
		font-size: 18px;
	}
}
</style>
