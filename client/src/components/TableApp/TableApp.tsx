import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTable, useSortBy} from "react-table";
import {TableAppProps} from "../../../store/interfaces";
import styles from "./styles.module.scss";
import {columnsTableApp as columns} from "../../constants"
import { selectCarsOfUser } from '../../../store/slices/cars';

const TableApp: FC<TableAppProps> = ({title, data}) => {
  const dispatch = useDispatch();

  const carsOfUser = useSelector(selectCarsOfUser);
  const handleDeleteCar = (carId: number | string) => {
    dispatch({type: "DELETE_CAR", payload: {carId}});
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data});

  return (
    <div
      style={{display: "flex", flexDirection: "column", alignItems: "center"}}
    >
      <h3>{title}</h3>
      {carsOfUser.status === 'loading...' || carsOfUser.status === 'empty'
        ? <div className="spinner-border text-dark" role="status"/>
        : <table {...getTableProps()} className={styles.wholeTable}>
        <thead className={styles.thead}>
          {headerGroups.map((headerGroup) => (
            <>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className={styles.th}>
                    <div className={styles.inner}>
                      <div>
                        {column.render("Header")}
                      </div>
                      {
                        column.id === "vehicalWeare" 
                          ? <div className={styles.arrowDown}></div> 
                          : ''
                      }
              
                    </div>
                  </th>
                ))}
              </tr>
            </>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={styles.tbody}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index, a) => {
                  return (
                    <>
                      <td className={styles.td} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                        {index == a.length - 1 ? (
                          <div
                            onClick={() => handleDeleteCar(row.original._id)}
                          >
                            Delete car
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      }
    </div>
  );
};

export default TableApp;
