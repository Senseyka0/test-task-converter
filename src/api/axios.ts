import axios from "axios";

export const api = axios.create({
	baseURL: "https://api.apilayer.com/exchangerates_data",
	headers: {
		apikey: "tFDUMBobWPXapd31EoSbdZxt0qjwTs4v",
	},
});
