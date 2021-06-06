<template>
	<header class="AppHeader">
		<h1>
			<span v-if="this.$parent.theme==''" class="unselectable">👨‍💻</span>
			<span v-else class="unselectable">🦸‍♂️</span>		
			<router-link to="/">HNR</router-link> / 
			<router-link to="/ask">ASK</router-link> / 
			<router-link to="/show">SHOW</router-link> / 
			<router-link to="/jobs">JOBS</router-link>
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
	font-family: 'Roboto Mono', monospace;
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
