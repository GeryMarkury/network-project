import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { Loader } from "components/Loader";

const FriendListWidget = ({ userId }) => {
	const dispatch = useDispatch();
	const { palette } = useTheme();
	const [isLoading, setIsLoading] = useState(false);
	const token = useSelector(state => state.token);
	const friends = useSelector(state => state.user.friends);

	const getFriends = async () => {
		setIsLoading(true);
		const response = await fetch(
			`https://network-server-hmarkov.onrender.com/users/${userId}/friends`,
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			},
		);
		const data = await response.json();
		dispatch(setFriends({ friends: data }));
		setIsLoading(false);
	};

	useEffect(() => {
		getFriends();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{isLoading && <Loader />}
			<WidgetWrapper>
				<Typography
					color={palette.neutral.dark}
					variant="h5"
					fontWeight="500"
					sx={{ mb: "1.5rem" }}
				>
					Friend List
				</Typography>
				<Box
					display="flex"
					flexDirection="column"
					gap="1.5rem"
				>
					{friends.map(friend => (
						<Friend
							key={friend._id}
							friendId={friend._id}
							name={`${friend.firstName} ${friend.lastName}`}
							subtitle={friend.occupation}
							userPicturePath={friend.picturePath}
						/>
					))}
				</Box>
			</WidgetWrapper>
		</>
	);
};

export default FriendListWidget;
