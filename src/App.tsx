import "./App.css";

import { useEffect, useState } from "react";
import { CurrencyItem } from "./components/CurrencyItem";
import { getCurrencies } from "./api/exchanges";

import { Box, SelectChangeEvent } from "@mui/material";
import { Header } from "./components/Header";

const App = () => {
	const [fromCurrency, setFromCurrency] = useState<string>("EUR");
	const [toCurrency, setToCurrency] = useState<string>("UAH");
	const [exchangeRate, setExchangeRate] = useState<number>(0);
	const [amount, setAmount] = useState<number>(1);
	const [amountInFromCurrency, setAmountInFromCurrency] = useState<boolean>(true);

	let toAmount: number;
	let fromAmount: number;

	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = amount * exchangeRate;
	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRate;
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getCurrencies();
				const uah = Object.keys(data.rates)[148];
				setFromCurrency(data.base);
				setToCurrency(uah);
				setExchangeRate(data.rates[uah]);
			} catch (e) {
				console.error(e);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (fromCurrency != null && toCurrency != null) {
			const fetchData = async () => {
				try {
					const data = await getCurrencies(fromCurrency, toCurrency);
					setExchangeRate(data.rates[toCurrency]);
				} catch (e) {
					console.error(e);
				}
			};
			fetchData();
		}
	}, [fromCurrency, toCurrency]);

	const handleFromAmountChange = (e: any) => {
		setAmount(e.target.value);
		setAmountInFromCurrency(true);
	};

	const handleToAmountChange = (e: any) => {
		setAmount(e.target.value);
		setAmountInFromCurrency(false);
	};

	const handleFromCurrencyChange = (e: SelectChangeEvent) => {
		setFromCurrency(e.target.value);
	};

	const handleToCurrencyChange = (e: SelectChangeEvent) => {
		setToCurrency(e.target.value);
	};

	return (
		<>
			<Header />
			<Box
				sx={{
					maxWidth: 900,
					m: "50px auto",
				}}
			>
				<CurrencyItem
					selectedCurrency={fromCurrency}
					onChangeCurrency={handleFromCurrencyChange}
					// @ts-ignore
					onChangeAmount={handleFromAmountChange}
					amount={fromAmount}
				/>
				<CurrencyItem
					selectedCurrency={toCurrency}
					onChangeCurrency={handleToCurrencyChange}
					// @ts-ignore
					onChangeAmount={handleToAmountChange}
					amount={toAmount}
				/>
			</Box>
		</>
	);
};

export default App;
