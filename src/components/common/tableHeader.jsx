import React, { Component } from "react";

class TableHeader extends Component {
	raiseSort = (sortOption) => {
		const sortColumn = { ...this.props.sortColumn };
		if (sortColumn.sortOption === sortOption)
			sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
		else {
			sortColumn.sortOption = sortOption;
			sortColumn.order = "asc";
		}

		this.props.onSort(sortColumn);
	};

	renderSortIcon = (column) => {
		const { sortColumn } = this.props;

		if (column.sortOption !== sortColumn.sortOption) return null;
		if (sortColumn.order === "asc")
			return (
				<i
					style={{ cursor: "pointer" }}
					className="fa fa-sort-asc clickable"
				></i>
			);
		return (
			<i
				style={{ cursor: "pointer" }}
				className="fa fa-sort-desc clickable"
			></i>
		);
	};

	render() {
		return (
			<thead>
				<tr>
					{this.props.columns.map((column) => (
						<th
							key={column.sortOption || column.key}
							onClick={() => this.raiseSort(column.sortOption)}
						>
							<span style={{ cursor: "pointer" }}>{column.label}</span>{" "}
							{this.renderSortIcon(column)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;
