import { api } from "./axios";

import { ICurrency } from "../models/exchanges";

export const getCurrencies = async (base?: string, symbols?: string) => {
	const { data } = await api.request<Promise<ICurrency>>({
		method: "GET",
		url: "/latest",
		params: {
			base,
			symbols,
		},
	});

	return data;
};
