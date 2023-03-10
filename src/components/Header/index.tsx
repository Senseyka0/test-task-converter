import { memo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { getCurrencies } from "../../api/exchanges";

interface HeaderProps {
	error: string;
	setError: (erorr: string) => void;
}

export const Header = memo((props: HeaderProps) => {
	const { error, setError } = props;
	const [eur, setEur] = useState<number>(0);
	const [usd, setUsd] = useState<number>(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const eur = await getCurrencies("EUR", "UAH");
				const usd = await getCurrencies("USD", "UAH");

				setEur(Object.values(eur.rates)[0]);
				setUsd(Object.values(usd.rates)[0]);
			} catch (e) {
				setError(e as string);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" sx={{ mb: "30px" }}>
					<Toolbar>
						<Box
							sx={{
								width: "100%",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography variant="h6" component="div">
								React Convertor
							</Typography>

							<Typography variant="h6" component="div">
								<Box>Euro: {eur.toFixed(2)}</Box>
								Dollar: {usd.toFixed(2)}
							</Typography>
						</Box>
					</Toolbar>
				</AppBar>
			</Box>
			<Box sx={{ maxWidth: "900px", m: "0 auto" }}>
				{error && (
					<Typography variant="h2" sx={{ color: "red", mb: "50px", fontSize: "30px" }}>
						{error}
					</Typography>
				)}
			</Box>
		</>
	);
});
