export interface Task {
  id: number;
  title: string;
  assignees: string[];
  deadline: Date | null;
  stickers: Sticker[];
  isCompleted: boolean;
}

interface Sticker {
  id: number;
  name: string;
  color?: string;
}


export interface TaskList {
  id: number;
  title: string;
  tasks: Task[];
  isImmutable?: true;
  position: number;
  expanded: boolean;
  canCreateTask: boolean;
}

