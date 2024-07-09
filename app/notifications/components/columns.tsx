"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Img from "next/image";
import { types } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Interaction } from "@/types/tables";
import Read from "./read";
import HandleInvitation from "./handleInvitation";

export const columns: ColumnDef<Interaction>[] = [
	{
		accessorKey: "read",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Lu" />
		),
		cell: ({ row }) => <Read row={row} />,
		enableSorting: false,
		enableHiding: true,
	},
	{
		accessorKey: "time",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
		cell: ({ row }) => (
			<div className="w-[80px] text-sm text-muted-foreground overflow-hidden">
				{row.getValue("time")}
			</div>
		),
		enableSorting: true,
		enableHiding: true,
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		id: "userId",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Utilisateur" />
		),
		cell: ({ row }) => (
			<div className="flex items-center space-x-2 align-center overflow-hidden max-w-[250px]">
				<Img
					src={row.original.userAvatar}
					alt="User avatar"
					className="w-8 h-8 rounded-full"
					width={32}
					height={32}
				/>
				<div>{row.original.userId}</div>
			</div>
		),
		enableSorting: true,
		enableHiding: true,
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "type",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
		cell: ({ row }) => {
			const type = types.find(
				(label) => label.value === row.original.type
			);

			return (
				<div className="flex space-x-2 align-center">
					{type && (
						<Badge
							variant="outline"
							className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs bg-muted-background text-muted-foreground"
						>
							<type.icon className="h-4 w-4 text-muted-foreground" />
							<div>{type.label}</div>
						</Badge>
					)}
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
		enableHiding: true,
		enableSorting: false,
	},
	{
		id: "message",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Message" />
		),
		cell: ({ row }) => {
			if (row.original.type === "comment") {
				return (
					<div className="text-sm text-muted-foreground">
						<Link
							href={`/${row.original.userId}`}
							className="text-blue-600"
						>
							{row.original.userId}{" "}
						</Link>
						commented {row.original.comment?.content} on your post{" "}
						{row.original.comment?.postId}
					</div>
				);
			} else if (row.original.type === "like") {
				return (
					<div className="text-sm text-muted-foreground">
						<Link
							href={`/${row.original.userId}`}
							className="text-blue-600"
						>
							{row.original.userId}{" "}
						</Link>
						liked your post {row.original.like?.postContent}
					</div>
				);
			} else if (row.original.type === "follow") {
				return (
					<div className="text-sm text-muted-foreground">
						<Link
							href={`/${row.original.userId}`}
							className="text-blue-600"
						>
							{row.original.userId}{" "}
						</Link>
						followed you{" "}
					</div>
				);
			} else {
				return <HandleInvitation row={row} />;
			}
		},
		enableHiding: false,
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
		enableHiding: false,
	},
];
