import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data, Filters } from "react-data-grid-addons";

import "./styles.css";

const defaultColumnProperties = {
  filterable: true,
  resizable: true,
  width: 250
};

const selectors = Data.Selectors;
const { NumericFilter, AutoCompleteFilter, MultiSelectFilter } = Filters;
const columns = [
  {
    key: "id",
    name: "ID",
    filterRenderer: NumericFilter
  },
  {
    key: "date",
    name: "Date",
    filterRenderer: MultiSelectFilter
  },
  {
    key: "particular",
    name: "Particular",
    filterRenderer: AutoCompleteFilter
  },
  {
    key: "amount",
    name: "Amount",
    filterRenderer: NumericFilter
  }
].map(c => ({ ...c, ...defaultColumnProperties }));

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getValidFilterValues(rows, columnId) {
  return rows
    .map(r => r[columnId])
    .filter((item, i, a) => {
      return i === a.indexOf(item);
    });
}

function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}

export function DataGrid({ rows }) {
  console.log(rows);
  const [filters, setFilters] = useState({});
  const filteredRows = getRows(rows, filters);
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => filteredRows[i]}
      rowsCount={filteredRows.length}
      minHeight={500}
      toolbar={<Toolbar enableFilter={true} />}
      onAddFilter={filter => setFilters(handleFilterChange(filter))}
      onClearFilters={() => setFilters({})}
      getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}
    />
  );
}
