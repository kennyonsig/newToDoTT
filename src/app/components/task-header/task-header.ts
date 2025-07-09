import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckbox } from "@angular/material/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskItem } from '../../interface/task';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-task-header',
  imports: [
    MatCheckbox,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './task-header.html',
  styleUrl: './task-header.scss'
})
export class TaskHeader  {
  @Input() task!: TaskItem;
  @Input() isEditing!: boolean;

  @Output() toggleComplete = new EventEmitter<boolean>();
  @Output() editClick = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() titleChange = new EventEmitter<string>();
  @Output() save = new EventEmitter<void>();

  editingTitle = '';

  onStartEditing() {
    this.editingTitle = this.task.title;
    this.editClick.emit();
  }
}

