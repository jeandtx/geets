import {
	MessageCircleHeart,
	MessageCircleMore,
	UserRoundPlus,
	Handshake,
} from "lucide-react";

export const types = [
	{
		value: "like",
		label: "Like",
		icon: MessageCircleHeart,
	},
	{
		value: "comment",
		label: "Comment",
		icon: MessageCircleMore,
	},
	{
		value: "follow",
		label: "Follow",
		icon: UserRoundPlus,
	},
	{
		value: "join",
		label: "Join",
		icon: Handshake,
	},
];
