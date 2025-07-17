export interface Task {
  id: string;
  title: string;
  assignees: string[];
  deadline: Date | null;
  stickers: Sticker[];
  isCompleted: boolean;
}

interface Sticker {
  id: string;
  name: string;
  color?: string;
}


export interface TaskList {
  id: string;
  title: string;
  tasks: Task[];
  isImmutable?: true;
  position: number;
  expanded: boolean;
  canCreateTask: boolean;
}

