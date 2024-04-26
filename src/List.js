import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  Dialog,
  TextField,
} from '@mui/material';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import './style.css';

const List = () => {
  const [taskList, setTaskList] = useState([
    {
      name: 'Task 1',
      priority: 'Medium',
      incompleteStatus: false,
    },
  ]);
  const [dialogue, setDialogOpen] = useState(false);
  const [taskName, setTaskName] = useState();
  const [priorityType, setPriority] = useState();
  const [editDialogue, setEditDialogue] = useState(false);
  const [itemToEdit, setItemToEdit] = useState();
  const [deleteDialogue, setDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  const handleTodoClick = (item) => {
    const itemTocomplete = taskList?.filter(
      (task) => task?.name === item?.name && item?.priority === task?.priority
    );
    const itemTocompleteIndex = taskList?.findIndex(
      (task) => task?.name === item?.name && item?.priority === task?.priority
    );
    if (itemTocomplete?.length > 0) {
      itemTocomplete[0] = {
        ...itemTocomplete[0],
        incompleteStatus: !itemTocomplete[0].incompleteStatus,
      };
    }
    taskList.splice(itemTocompleteIndex, 1, itemTocomplete[0]);
    setTaskList([...taskList]);
  };

  return (
    <Box className="list-container">
      <Box
        sx={{
          marginLeft: 'auto',
          width: 'fit-content',
        }}
      >
        <Button
          onClick={() => setDialogOpen(true)}
          sx={{
            color: 'white',
            backgroundColor: 'blue',
          }}
        >
          <IconPlus />
          Add new
        </Button>
      </Box>
      {taskList?.length > 0 &&
        taskList?.map((item, index) => (
          <Card
            sx={{
              width: 'calc(100% - 5vw)',
              height: 'auto',
              margin: '2vw',
              borderRadius: '20px',
              padding: '2vw',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1vw',
                  textDecoration: `${
                    item?.incompleteStatus ? 'line-through' : 'none'
                  }`,
                }}
              >
                <Typography size="l" variant="heading">
                  Task
                </Typography>
                <Typography size="m" variant="body">
                  {item?.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1vw',
                  textDecoration: `${
                    item?.incompleteStatus ? 'line-through' : 'none'
                  }`,
                }}
              >
                <Typography size="l" variant="heading">
                  Priority
                </Typography>
                <Typography
                  size="m"
                  variant="body"
                  sx={{
                    color:
                      item?.priority?.toUpperCase() === 'HIGH'
                        ? 'red'
                        : item?.priority?.toUpperCase() === 'MEDIUM'
                        ? 'orange'
                        : 'green',
                  }}
                >
                  {item?.priority}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1vw',
                }}
              >
                <Typography size="l" variant="heading">
                  Status
                </Typography>
                <Button
                  sx={{
                    color: 'white',
                    backgroundColor: `${
                      item?.incompleteStatus ? 'green' : 'red'
                    }`,
                    borderRadius: '10px',
                    height: '3vw',
                  }}
                  onClick={() => handleTodoClick(item)}
                >
                  {item?.incompleteStatus ? 'Done' : 'To Do'}
                </Button>
              </Box>
              {!item?.incompleteStatus && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1vw',
                  }}
                >
                  <IconEdit
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setItemToEdit(index);
                      setPriority(item?.priority);
                      setTaskName(item?.name);
                      setEditDialogue(true);
                    }}
                  />
                  <IconTrash
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setDeleteDialog(true);
                      setItemToDelete(index);
                    }}
                  />
                </Box>
              )}
            </Box>
          </Card>
        ))}
      {dialogue && (
        <Dialog
          open={dialogue}
          onClose={() => {
            setDialogOpen(false);
            setTaskName();
            setPriority();
          }}
        >
          <Box
            sx={{
              height: '80vw',
              width: '70vw',
              padding: '10vw',
            }}
          >
            <Typography variant="h5">Add Task</Typography>
            <TextField
              name="Task"
              value={taskName}
              fullWidth
              placeholder="Enter task name"
              sx={{
                marginTop: '1vw',
              }}
              onChange={(e) => setTaskName(e?.target?.value)}
            />
            <Typography
              variant="h6"
              sx={{
                marginTop: '1vw',
              }}
            >
              Priority
            </Typography>
            <Button
              onClick={(e) => setPriority('High')}
              className="priority-btn"
              sx={{
                color: priorityType === 'High' ? 'white' : 'red',
                border: '1px solid red',
                margin: '0 1vw',
                backgroundColor: priorityType === 'High' ? 'red' : 'white',
              }}
            >
              High
            </Button>
            <Button
              onClick={(e) => setPriority('Medium')}
              className="priority-btn"
              sx={{
                color: priorityType === 'Medium' ? 'white' : 'orange',
                border: '1px solid orange',
                margin: '0 1vw',
                backgroundColor: priorityType === 'Medium' ? 'orange' : 'white',
              }}
            >
              Medium
            </Button>
            <Button
              onClick={(e) => setPriority('Low')}
              className="priority-btn"
              sx={{
                color: priorityType === 'Low' ? 'white' : 'green',
                border: '1px solid green',
                margin: '0 1vw',
                backgroundColor: priorityType === 'Low' ? 'green' : 'white',
              }}
            >
              Low
            </Button>
            <Box
              sx={{
                width: 'fit-content',
                marginLeft: 'auto',
                marginTop: '2vw',
              }}
            >
              <Button
                onClick={() => {
                  setTaskList(() => [
                    ...taskList,
                    {
                      name: taskName,
                      priority: priorityType,
                    },
                  ]);
                  setDialogOpen(false);
                  setPriority();
                  setTaskName();
                }}
                sx={{
                  color: 'white',
                  backgroundColor: 'violet',
                }}
              >
                Add task
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
      {editDialogue && (
        <Dialog
          open={editDialogue}
          onClose={() => {
            setEditDialogue(false);
            setTaskName();
            setPriority();
          }}
        >
          <Box
            sx={{
              height: '80vw',
              width: '70vw',
              padding: '10vw',
            }}
          >
            <Typography variant="h5">Edit Task</Typography>
            <TextField
              name="Task"
              fullWidth
              placeholder="Enter task name"
              value={taskName}
              sx={{
                marginTop: '1vw',
              }}
              onChange={(e) => setTaskName(e?.target?.value)}
            />
            <Typography
              variant="h6"
              sx={{
                marginTop: '1vw',
              }}
            >
              Priority
            </Typography>
            <Button
              onClick={(e) => setPriority('High')}
              className="priority-btn"
              sx={{
                color: priorityType === 'High' ? 'white' : 'red',
                border: '1px solid red',
                margin: '0 1vw',
                backgroundColor: priorityType === 'High' ? 'red' : 'white',
              }}
            >
              High
            </Button>
            <Button
              onClick={(e) => setPriority('Medium')}
              className="priority-btn"
              sx={{
                color: priorityType === 'Medium' ? 'white' : 'orange',
                border: '1px solid orange',
                margin: '0 1vw',
                backgroundColor: priorityType === 'Medium' ? 'orange' : 'white',
              }}
            >
              Medium
            </Button>
            <Button
              onClick={(e) => setPriority('Low')}
              className="priority-btn"
              sx={{
                color: priorityType === 'Low' ? 'white' : 'green',
                border: '1px solid green',
                margin: '0 1vw',
                backgroundColor: priorityType === 'Low' ? 'green' : 'white',
              }}
            >
              Low
            </Button>
            <Box
              sx={{
                width: 'fit-content',
                marginLeft: 'auto',
                marginTop: '2vw',
              }}
            >
              <Button
                onClick={() => {
                  const itemEdited = taskList?.filter(
                    (item, index) => index === itemToEdit
                  )?.[0];
                  itemEdited['name'] = taskName;
                  itemEdited['priority'] = priorityType;
                  taskList?.splice(itemToEdit, 1, itemEdited);
                  setEditDialogue(false);
                  setPriority();
                  setTaskName();
                }}
                sx={{
                  color: 'white',
                  backgroundColor: 'violet',
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
      {deleteDialogue && (
        <Dialog
          open={deleteDialogue}
          onClose={() => {
            setDeleteDialog(false);
          }}
        >
          <Box
            sx={{
              height: '30vw',
              width: '40vw',
              padding: '10vw',
            }}
          >
            <Typography variant="h5">
              Are you sure you want to delete this task?
            </Typography>
            <Box
              sx={{
                width: 'fit-content',
                display: 'flex',
                marginTop: '4vw',
                gap: '3vw',
                justifyContent: 'space-around',
              }}
            >
              <Button
                onClick={() => {
                  taskList?.splice(itemToDelete, 1);
                  setTaskList([...taskList]);
                  setDeleteDialog(false);
                  setPriority();
                  setTaskName();
                }}
                sx={{
                  color: 'white',
                  backgroundColor: 'violet',
                }}
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  // const itemEdited = taskList?.filter(
                  //   (item, index) => index === itemToEdit
                  // )?.[0];
                  // itemEdited['name'] = taskName;
                  // itemEdited['priority'] = priorityType;
                  setDeleteDialog(false);
                  setPriority();
                  setTaskName();
                }}
                sx={{
                  color: 'violet',
                  backgroundColor: 'white',
                  border: '1px solid violet',
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default List;
