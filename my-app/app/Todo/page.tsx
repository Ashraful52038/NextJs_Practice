'use client';

import { CheckOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Input, List, message, Select, Typography } from 'antd';
import { useState } from 'react';
import TodoModal from '../components/ToDoModal';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { addTodo, deleteTodo, selectFilteredTodos, selectTodoStats, toggleTodo, updateTodo } from './ToDoSlice';

const { Title,Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface Todo {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean; 
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

export default function TodoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch= useAppDispatch();
  const todos = useAppSelector(selectFilteredTodos);
  const stats = useAppSelector(selectTodoStats);

  const handleSubmit = (todo: Todo) => {
    if (isEdit && currentTodo) {
      // Update existing
      dispatch(updateTodo({ ...todo, id: currentTodo.id }));
      message.success('Todo updated successfully!');
    } else {
      // Add new
      dispatch(addTodo(todo));
      message.success('Todo added!');
    }
    setModalOpen(false);
    setCurrentTodo(null);
  };

  const handleEdit = (todo: Todo) => {
    setCurrentTodo(todo);
    setIsEdit(true);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
    message.success('Todo deleted!');
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className="p-8">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <Title level={2}>My Todos</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => {
              setCurrentTodo(null);
              setIsEdit(false);
              setModalOpen(true);
            }}
          >
            Add Todo
          </Button>
        </div>

        <List
          itemLayout="horizontal"
          dataSource={todos}
          locale={{ emptyText: 'No todos yet. Add your first todo!' }}
          renderItem={(todo) => (
            <List.Item
              actions={[
                <Button type="text" icon={<EditOutlined/>} 
                        onClick={() => handleEdit(todo)} key="edit"
                >
                  Edit
                </Button>,
                <Button type="text" icon={<CheckOutlined/>} 
                onClick={() => handleToggleComplete(todo.id)}
                style={{ color: todo.completed ? '#52c41a' : '#1890ff' }}
                  key="complete"
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </Button>,
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(todo.id)}
                  key="delete"
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={todo.title}
                description={`Due: ${todo.dueDate}`}
              />
            </List.Item>
          )}
        />
      </Card>

      <TodoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={currentTodo}
        isEdit={isEdit}
      />
    </div>
  );
}