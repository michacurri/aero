import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

export default function WorkorderDisplay({ currentProfile }) {
  console.log(currentProfile);
  const classes = useStyles();
  const { workorders } = currentProfile;

  useEffect(() => {
    console.log('refresh');
  }, [workorders])

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="workorder display table">
          <TableHead>
            <TableRow>
              <TableCell>Workorder Number</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Model</TableCell>
              <TableCell align="right">Colour</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workorders.map((workorder) => (
              <TableRow key={workorder._id}>
                <TableCell component="th" scope="workorder">
                  {workorder._id}
                </TableCell>
                <TableCell align="right">{workorder.brand}</TableCell>
                <TableCell align="right">{workorder.model}</TableCell>
                <TableCell align="right">{workorder.colour}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

}
