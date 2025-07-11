export interface  TaskItem {
  id: number;
  title: string;
  description?: string;
  inProgress: boolean;
  createdAt: Date;
  deadLine: Date;
  isCompleted: boolean;
}
