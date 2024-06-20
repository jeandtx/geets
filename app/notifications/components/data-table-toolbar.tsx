"use client";

import { ListRestart } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { types } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({
	table,
}: Readonly<DataTableToolbarProps<TData>>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Search by time"
					value={
						(table.getColumn("time")?.getFilterValue() as string) ??
						""
					}
					onChange={(event) =>
						table
							.getColumn("time")
							?.setFilterValue(event.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{table.getColumn("type") && (
					<DataTableFacetedFilter
						column={table.getColumn("type")}
						title="Type"
						options={types}
					/>
				)}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Reset
						<ListRestart className="ml-2 h-4 w-4" />
					</Button>
				)}
				<Button
					variant="outline"
					size="sm"
					className="ml-auto hidden h-8 lg:flex"
				>
					Mark all read
				</Button>
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
