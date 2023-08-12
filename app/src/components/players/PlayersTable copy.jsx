import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

import { EditIcon } from "../../assets/icons/EditIcon";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import { EyeIcon } from "../../assets/icons/EyeIcon";
import { useState } from "react";
import { useEffect } from "react";

const PlayersTable = ({ players }) => {
  //   let columns = [{}];

  //   const playersColumn = Object.keys(players[0]);
  //   useEffect(() => {
  //     playersColumn.map((playerColumn) => {
  //         columns.push({ key: playerColumn, label: playerColumn.toUpperCase() });
  //     });
  //   }, []);
  //   columns.splice(0,1)

  const columns = [
    { key: "name", label: "NAME" },
    { key: "position", label: "POSITION" },
    { key: "birthday", label: "BIRTHDAY" },
  ];

  return (
    <>
      Tabla
      <Table aria-label="Example of table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={players}>
          {(player) => (
            <TableRow key={player.id}>
              {(columnKey) => 
                <TableCell>{getKeyValue(player, columnKey)}</TableCell>
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default PlayersTable;
