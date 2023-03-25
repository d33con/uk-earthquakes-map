import React from "react"
import { useTable, useSortBy } from 'react-table'
import Table from 'react-bootstrap/Table';
import { format } from "date-fns";

function QuakeTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  // Render the UI for your table
  return (
    <div className="table-container">
      <Table {...getTableProps()} size="sm">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onMouseEnter={(event) => console.log(event.target.parentNode.id)} id={row.original.id}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

function DisplayTable(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: (props) => (<span>{format(new Date(props.row.original.date), 'dd/MM/yyyy')}</span>)
      },
      {
        Header: 'Time',
        accessor: 'time',
        disableSortBy: true,
      },
      {
        Header: 'Magnitude',
        accessor: 'ml',
      },
      {
        Header: 'Depth (km)',
        accessor: 'depth',
      },
      {
        Header: 'Location',
        accessor: 'locality',
        Cell: (props) => {
          let county
          if(props.row.original.county) {
            county = `, ${props.row.original.county}`
          } else {
            county = ""
          }
          return (<span>{`${props.row.original.locality}${county}`}</span>)
        }
      },
    ],
    []
  )

  return (
    <QuakeTable columns={columns} data={props.dataset} />
  )
}

export default DisplayTable