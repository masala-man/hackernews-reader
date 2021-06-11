<template>
	<div id="App">
		<router-view name="header"></router-view>
		<router-view :key="$route.fullPath" name="content"></router-view>
		<router-view name="footer"></router-view>
	</div>
</template>

<script>
export default {
	name: "App",
	data(){
		return{
			theme: {}
		}
	},
	mounted(){
		if (localStorage.theme){
			this.changeTheme(localStorage.theme)
		}
		else{
			const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
			if (prefersDarkScheme.matches) this.changeTheme("darkMode")
			else this.changeTheme("lightMode")
		}
	},
	created(){
		window.addEventListener("keydown", (e) => {
			if (e.shiftKey && e.key == "D") {
				if (this.theme == "lightMode") {
					this.changeTheme("darkMode")
					localStorage.theme = "darkMode";
				}
				else {
					this.changeTheme("lightMode")
					localStorage.theme = "lightMode";
				}
			}
		})
	},
	methods: {
		changeTheme(theme) {
				this.theme = theme
				document.documentElement.setAttribute("data-theme", this.theme);
		}
	}
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

[data-theme="lightMode"] {
	--background-color: rgb(240, 240, 240);
	--text-color: black;
	--button-color: gray;
	--button-hover-color: darkgray;
	--accent-color: rgb(47, 153, 73);
	--accent-color-dark: rgb(41, 131, 64);
}
[data-theme="darkMode"] {
	--background-color: rgb(26, 25, 25);
	--text-color: white;
	--button-color: darkgray;
	--button-hover-color: gray;
	--accent-color: rgb(47, 153, 73);
	--accent-color-dark: rgb(41, 131, 64);
}
* { 
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	-moz-tap-highlight-color: rgba(0, 0, 0, 0);
	font-family: "Roboto Mono", monospace;
}
.unselectable{
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
a{
	color: var(--text-color);
	text-decoration: none;
}
a:hover{
	color: var(--accent-color);
	transition: 400ms;
}
p{
	margin-bottom: 12px;
}
::-moz-selection {
	color: var(--background-color);
	background: var(--accent-color);
}
::selection {
	color: var(--background-color);
	background: var(--accent-color);
}
::-webkit-scrollbar {
	width: 5px;
	height: 1px;
	color: var(--background-color);
}
::-webkit-scrollbar-thumb {
	background: var(--accent-color);
	border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
	color: var(--accent-color-dark);
}
body{
	background-color: var(--background-color);
	transition: 400ms;
}
#App{
	display:grid;
	grid-template-columns: auto 30px 800px 30px auto;
	grid-template-rows: 10vh 10vh auto 75px;
}
#theme-button{
	grid-area: 2/3/3/4;
	width: 5px;
	float: right;
}
.AppHeader{
	grid-area: 2/3/3/4;
}
.ViewPosts{
	grid-area: 3/3/3/4;
}
.ViewComments{
	grid-area: 3/3/3/4;
}
.ViewAuthor{
	grid-area: 3/3/3/4;
}
.Error404{
	grid-area: 3/3/3/4;
}
.AppFooter{
	grid-area: 4/3/5/3;
}
@media (max-width: 860px) {
	#App{
		grid-template-columns: auto 10px 90vw 10px auto;
	}
}
@media (max-width: 425px) {
	#App{
		grid-template-rows: 5vh 10vh auto 75px;
	}
}
</style>
