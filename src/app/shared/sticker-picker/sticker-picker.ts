import { Component, Input } from '@angular/core';
import { DeviceSticker, PrioritySticker, Sticker, StickerType, TaskTypeSticker } from '../../interface/task';
import { NgClickOutsideDirective } from 'ng-click-outside2';

@Component({
  selector: 'app-sticker-picker',
  imports: [
    NgClickOutsideDirective
  ],
  templateUrl: './sticker-picker.html',
  styleUrl: './sticker-picker.scss'
})
export class StickerPicker {
  @Input() stickers: Sticker[] = [];

  showMainMenu = false;
  showDeviceSubMenu = false;
  showPrioritySubMenu = false;
  showTaskTypeSubMenu = false;

  openedStickerId: string | null = null;
  openedStickerType: StickerType | null = null;

  openMainMenu() {
    if (this.showMainMenu) {
      this.showMainMenu = false;
      return;
    }
    this.closeAllMenu();
    this.showMainMenu = true;
  }

  openSubMenu(menuType: StickerType) {
    this.closeAllMenu();
    if (menuType === 'device') {
      this.showDeviceSubMenu = true;
    }
    if (menuType === 'priority') {
      this.showPrioritySubMenu = true;
    }
    if (menuType === 'taskType') {
      this.showTaskTypeSubMenu = true;
    }
  }

  closeAllMenu() {
    this.showDeviceSubMenu = false;
    this.showPrioritySubMenu = false;
    this.showTaskTypeSubMenu = false;
    this.showMainMenu = false;
    this.openedStickerId = null;
    this.openedStickerType = null;
  }

  addSticker(type: StickerType, value: DeviceSticker | PrioritySticker | TaskTypeSticker) {
    const findStickerIndex = this.stickers.findIndex(sticker => sticker.type === type);
    if (findStickerIndex !== -1) {
      this.stickers[findStickerIndex].value = value;
      this.closeAllMenu();
      return;
    }

    const stickerId = 'sticker-' + crypto.randomUUID();
    this.stickers.push({stickerId, type, value})
    this.closeAllMenu();
  }

  toggleStickerMenu(stickerId: string, stickerType: StickerType) {
    if (this.openedStickerId === stickerId && this.openedStickerType === stickerType) {
      this.openedStickerId = null;
      this.openedStickerType = null;
      return
    }

    this.openedStickerId = stickerId;
    this.openedStickerType = stickerType;
  }

  isMenuOpenForSticker(stickerId: string, menuType: StickerType): boolean {
    return (this.openedStickerId === stickerId) && (this.openedStickerType === menuType);
  }
}
