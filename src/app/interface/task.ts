export interface  TaskItem {
  id: number;
  title: string;
  description?: string;
  inProgress: boolean;
  isCompleted: boolean;
  createdAt: Date;
  deadLine: Date;
}
