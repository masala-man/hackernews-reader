import Vue from "vue"
import VueRouter from "vue-router"

// import components
import App from "./App.vue"
import AppHeader from "./components/AppHeader.vue"
import AppFooter from "./components/AppFooter.vue"
import ViewPosts from "./components/ViewPosts.vue"
import ViewComments from "./components/ViewComments.vue"
import ViewAuthor from "./components/ViewAuthor.vue"
import Error404 from "./components/Error404.vue"

// vue config
Vue.config.productionTip = false
Vue.use(VueRouter)

// set up router
const router = new VueRouter({
	mode: "history",
	routes: [
		{
			path: "*",
			redirect: "/404"
		},
		{
			name: "Front Page",
			path: "/",
			components: {
				header: AppHeader,
				content: ViewPosts,
				footer: AppFooter
			},
			props: true,
			meta: {
				title: "Front Page | HNR"
			}
		},
		{ 
			name: "Ask",
			path: "/ask",
			components:{
					header: AppHeader,
					content: ViewPosts,
					footer: AppFooter
			},
			props: true,
			meta: {
				title: "Ask | HNR"
			}
		},
		{ 
			name: "Show",
			path: "/show",
			components:{
				header: AppHeader,
				content: ViewPosts,
				footer: AppFooter
			},
			props: true,
			meta: {
				title: "Show | HNR"
			}
		},
		{ 
			name: "Jobs",
			path: "/jobs",
			components:{
				header: AppHeader,
				content: ViewPosts,
				footer: AppFooter
			},
			props: true,
			meta: {
				title: "Jobs | HNR"
			}
		},
		{
			name: "comments",
			path: "/comments/:id",
			components: {
				header: AppHeader,
				content: ViewComments,
				footer: AppFooter
			},
			props: true,
		},
		{
			name: "author",
			path: "/user/:username",
			components: {
				header: AppHeader,
				content: ViewAuthor,
				footer: AppFooter
			},
			props: true
		},
		{
			name: "404",
			path: "/404",
			components: {
				header: AppHeader,
				content: Error404,
				footer: AppFooter
			}
		}
	],
	scrollBehavior () {
		return {
			x: 0,
			y: 0,
			behavior: 'smooth'
		}
	}
})

// create vue
new Vue({
render: h => h(App),
router}).$mount("#app")
