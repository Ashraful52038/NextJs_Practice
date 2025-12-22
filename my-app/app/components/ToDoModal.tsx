'use client';

import { DatePicker, Form, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}
//
interface TodoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data : Todo)=>void;
  initialData?: Todo | null;
  isEdit: boolean;
}
//
const TodoModal: React.FC<TodoModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isEdit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        title:initialData.title,
        dueDate:dayjs(initialData.dueDate),
      });
    } else {
        form.resetFields(),
        form.setFieldsValue({
          dueDate:dayjs(),
        })
      };
    }, [initialData, form, open]);

//async , await
  const handleOk = async() => {
    try {
      const values = await form.validateFields();
      const todoData:Todo={
      id: initialData?.id || Date.now(),
        title: values.title,
        dueDate: dayjs(values.dueDate).format('YYYY-MM-DD'),
        completed: initialData?.completed || false,
    };
    onSubmit(todoData);
     
    onClose(); 
    form.resetFields();
   } catch (error) {
       console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
    title={isEdit ? 'Edit Todo' : 'Add New Todo'}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText={isEdit ? 'Update' : 'Add'}
      cancelText="Cancel"
      centered
      afterClose={() => form.resetFields()}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="Task Title"
          rules={[
            { required: true, message: 'Please enter task title' },
            { min: 3, message: 'At least 3 characters' },
          ]}
        >
          <Input placeholder="What needs to be done?" />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: 'Please select date' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            disabledDate={(current) => current < dayjs().startOf('day')}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoModal;