import React from "react";
import { useTable, useSortBy } from "react-table";
import Table from "react-bootstrap/Table";
import { format } from "date-fns";

function QuakeTable({
  columns,
  data,
  updateCurrentlySelectedQuake,
  currentlySelectedQuake,
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  // table UI
  return (
    <div className="table-container">
      <Table {...getTableProps()} size="sm" hover>
        <thead>
          {headerGroups.map((headerGroup, idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                >
                  {column.render("Header")}
                  <span
                    className={`sorting ${
                      column.isSorted
                        ? column.isSortedDesc
                          ? "desc"
                          : "asc"
                        : ""
                    }`}
                  >
                    {column.isSorted && " <"}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => updateCurrentlySelectedQuake(row.original.id)}
                id={row.original.id}
                className={`pointer ${
                  row.original.id === currentlySelectedQuake ? "selected" : ""
                }`}
                key={row.original.id}
              >
                {row.cells.map((cell) => {
                  return (
                    <td key={cell.row.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

function DisplayTable(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: (props) => (
          <span>{format(new Date(props.row.original.date), "dd/MM/yyyy")}</span>
        ),
      },
      {
        Header: "Time",
        accessor: "time",
        disableSortBy: true,
      },
      {
        Header: "Magnitude",
        accessor: "ml",
      },
      {
        Header: "Depth (km)",
        accessor: "depth",
      },
      {
        Header: "Location",
        accessor: "locality",
        Cell: (props) => {
          let county;
          if (props.row.original.county) {
            county = `, ${props.row.original.county}`;
          } else {
            county = "";
          }
          return <span>{`${props.row.original.locality}${county}`}</span>;
        },
      },
    ],
    []
  );

  return (
    <QuakeTable
      columns={columns}
      data={props.dataset}
      updateCurrentlySelectedQuake={props.updateCurrentlySelectedQuake}
      currentlySelectedQuake={props.currentlySelectedQuake}
    />
  );
}

export default DisplayTable;
