<template>
	<footer class="AppFooter">
		<b>Made with 💖 in Mumbai</b>
		<span><a href="https://news.ycombinator.com/"><b>HackerNews</b></a> / <a href="https://www.github.com/masala-man"><b>Github</b></a></span>
	</footer>
</template>

<script>
export default {
	name: 'AppFooter'
}
</script>

<style scoped>
.AppFooter{
	font-family : 'Roboto Mono', monospace;
	padding-top: 20px;
	border-top: 1px dotted var(--text-color);
	display: grid;
	display: flex;
	justify-content: space-between;
	color: var(--text-color);
}
a{
	color: var(--text-color);
}
a:hover{
	color: rgb(224, 63, 63);
	transition: 400ms;
}
@media (max-width: 425px) {
	.AppFooter{
		font-size: 12px;
	}
}
</style>