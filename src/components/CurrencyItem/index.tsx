import { ChangeEventHandler, memo } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface CurrencyItemProps {
	amount: number;
	onChangeAmount: ChangeEventHandler<HTMLInputElement>;
	selectedCurrency: string;
	onChangeCurrency: (e: SelectChangeEvent) => void;
}

export const CurrencyItem = memo((props: CurrencyItemProps) => {
	const { selectedCurrency, onChangeCurrency, onChangeAmount, amount } = props;

	return (
		<Box sx={{ display: "flex", justifyContent: "space-between" }}>
			<TextField
				sx={{ width: "48%" }}
				value={amount}
				type="text"
				onChange={onChangeAmount}
				label="Input"
				variant="outlined"
			/>
			<FormControl sx={{ width: "48%", mb: "30px" }}>
				<InputLabel id="demo-simple-select-label">Currency</InputLabel>

				<Select value={selectedCurrency} label="Currency" onChange={onChangeCurrency}>
					<MenuItem value="UAH">UAH</MenuItem>

					<MenuItem value="EUR">EUR</MenuItem>

					<MenuItem value="USD">USD</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
});
