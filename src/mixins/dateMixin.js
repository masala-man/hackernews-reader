import { DateTime } from "luxon"

export default {
	methods: {
		formatDateRelative(date){
			var readableDate = DateTime.fromISO(date);
			this.date = readableDate.toRelative();
		},
		formatDateSpecific(date){
			var readableDate = DateTime.fromISO(date);
			this.date = readableDate.toLocaleString(DateTime.DATETIME_MED);
		}
	}
  };

