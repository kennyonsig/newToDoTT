export interface Task {
  id: string;
  title: string;
  assignees: string[];
  deadline?: Date
  stickers: Sticker[];
  isCompleted: boolean;
  isFavorite: boolean;
  author: string;
  createdAt: Date;
  location: string;
  parentListId?: string;
}

export type DeviceSticker = 'mobile' | 'web' | 'mobile-web';
export type PrioritySticker = 'critical' | 'major' | 'normal' | 'low';
export type TaskTypeSticker = 'layout' | 'bug'
export type StickerType = 'device' | 'priority' | 'taskType';

export interface Sticker {
  stickerId: string;
  type: StickerType;
  value?: DeviceSticker | PrioritySticker | TaskTypeSticker;
}

export interface TaskList {
  id: string;
  title: string;
  tasks: Task[];
  isImmutable?: true;
  position: number;
  expanded: boolean;
  canCreateTask: boolean;
  displayFlags: {
    showFavorite: boolean;
    showAssignees: boolean;
    showAuthor: boolean;
    showLocation: boolean;
    showCreatedAt: boolean;
    showDeadline: boolean;
    showStickers: boolean;
  };
}



