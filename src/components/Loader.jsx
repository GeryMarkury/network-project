import { bouncy } from "ldrs";
import { useTheme } from "@mui/material";
import { Backdrop } from "@mui/material";

bouncy.register();

export const Loader = () => {
	const { palette } = useTheme();

	return (
		<Backdrop
			open
			sx={{
				opacity: "50%",
				background: palette.background.default,
				zIndex: 999,
			}}
		>
			<l-bouncy
				size="150"
				speed="1.75"
				color={palette.primary.main}
			></l-bouncy>
		</Backdrop>
	);
};
