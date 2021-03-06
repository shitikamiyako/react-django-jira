import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedTask } from "./taskSlice";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

// タスク詳細
const TaskDisplay: React.FC = () => {
  const selectedTask = useSelector(selectSelectedTask);
  const rows = [
    { item: "Task", data: selectedTask.task },
    { item: "Description", data: selectedTask.description },
    { item: "Criteria", data: selectedTask.criteria },
    { item: "Owner", data: selectedTask.owner },
    { item: "Responsible", data: selectedTask.responsible },
    { item: "Estimate [days]", data: selectedTask.estimate },
    { item: "Category", data: selectedTask.category },
    { item: "Status", data: selectedTask.status },
    { item: "Created", data: selectedTask.created_at },
    { item: "Updated", data: selectedTask.updated_at },
  ];

  if (!selectedTask.task) {
    return null;
  }

  return (
    <>
      <h2>Task Details</h2>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item}>
              <TableCell align="center">
                <strong>{row.item}</strong>
              </TableCell>
              <TableCell align="center">{row.data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TaskDisplay;
