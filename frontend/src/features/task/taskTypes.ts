export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;

  project: {
    _id: string;
    title: string;
  };

  assignedTo: {
    _id: string;
    name: string;
  };
}

export interface CreateTaskInput {
  title: string;
  description: string;
  project: string;
  assignedTo: string;
  dueDate: string;
  priority: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: string;
  assignedTo?: string;
}