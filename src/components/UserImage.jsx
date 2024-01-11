import { Box } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const UserImage = ({ image, size = "60px" }) => {
	return (
		<Box
			width={size}
			height={size}
		>
			<LazyLoadImage
				width={size}
				height={size}
				alt="user"
				effect="opacity"
				src={image}
				style={{ objectFit: "cover", borderRadius: "50%" }}
			/>
		</Box>
	);
};

export default UserImage;
