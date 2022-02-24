import { useDispatch } from 'react-redux'
import { useTable,  } from 'react-table';
import { TableAppProps } from '../../../store/interfaces';
import styles from './styles.module.scss'

const TableApp = ({title, columns, data }:  TableAppProps) => {

  const dispatch = useDispatch();

  const handleDeleteCar = (carId: number | string) => {
    dispatch({type: "DELETE_CAR", payload: {carId}})
  }
  
  const tableInstance = useTable({ columns, data })
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
    <h3>{title}</h3>
    <table {...getTableProps()} className={styles.wholeTable} >
          <thead className={styles.thead} >
            {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className={styles.th}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody {...getTableBodyProps()} className={styles.tbody}>
             { rows.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {
                    row.cells.map((cell, index, a) => {
                      return (
                        <>
                          <td className={styles.td} {...cell.getCellProps()}>
                            {cell.render('Cell')}
                            {index == a.length-1 ? <div onClick = {() => handleDeleteCar(row.original._id)}>Delete car</div> : ''}
                          </td>
                        </>
                      )
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>
    </div>
  )
}

export default TableApp