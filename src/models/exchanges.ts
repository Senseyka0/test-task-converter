export interface ISymbol {
	[key: string]: number;
}

export interface ICurrency {
	base: string;
	date: string;
	rates: ISymbol;
	success: boolean;
	timestamp: number;
}
