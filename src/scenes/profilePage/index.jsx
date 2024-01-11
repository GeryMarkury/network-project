import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { Loader } from "components/Loader";

const ProfilePage = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { userId } = useParams();
	const token = useSelector(state => state.token);
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
	const { _id } = useSelector(state => state.user);

	const getUser = async () => {
		setIsLoading(true);
		const response = await fetch(`https://network-server-hmarkov.onrender.com/users/${userId}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		setUser(data);
		setIsLoading(false);
	};

	useEffect(() => {
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!user) {
		return null;
	}

	const showMyPostWidget = Boolean(_id === userId);

	return (
		<>
			{isLoading && <Loader />}
			<Box>
				<Navbar />
				<Box
					width="100%"
					padding="2rem 6%"
					display={isNonMobileScreens ? "flex" : "block"}
					gap="2rem"
					justifyContent="center"
				>
					<Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
						<UserWidget
							userId={userId}
							picturePath={user.picturePath}
						/>
						<Box m="2rem 0" />
						<FriendListWidget userId={userId} />
					</Box>
					<Box
						flexBasis={isNonMobileScreens ? "42%" : undefined}
						mt={isNonMobileScreens ? undefined : "2rem"}
					>
						{showMyPostWidget && <MyPostWidget picturePath={user.picturePath} />}
						<Box m="2rem 0" />
						<PostsWidget
							userId={userId}
							isProfile
						/>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default ProfilePage;
