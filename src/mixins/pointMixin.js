export default {
	computed: {
		pointGrammar(){
			if (this.points == 1)
			return "pt"
			else return "pts"
		}
	}
};