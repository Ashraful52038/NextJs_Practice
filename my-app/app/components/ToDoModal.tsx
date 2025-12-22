'use client';

import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Todo {
  id: number;
  title: string;
  dueDate: string;
}

interface TodoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<Todo>;
  initialData?: Todo | null;
  isEdit: boolean;
}

interface TodoFormData {
  title: string;
  dueDate: string;
}

const TodoModal: React.FC<TodoModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isEdit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TodoFormData>();

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title);
      setValue('dueDate', initialData.dueDate.split('T')[0]); // Format for date input
    } else {
      reset({
        title: '',
        dueDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData, setValue, reset]);

  if (!open) return null;

  const handleFormSubmit = (data: TodoFormData) => {
    onSubmit({ 
      id: initialData?.id || 0, 
      ...data 
    } as Todo);
    reset();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? 'Edit Todo' : 'Add New Todo'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              {...register('title', {
                required: 'Title is required',
                minLength: {
                  value: 3,
                  message: 'Title must be at least 3 characters',
                },
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              {...register('dueDate', { required: 'Due date is required' })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.dueDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;