import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private currentModal: NgbModalRef | null = null;

  constructor(private modalService: NgbModal) {}

  open(content: any, options?: any): NgbModalRef {
    this.currentModal = this.modalService.open(content, options);
    return this.currentModal;
  }

  close(): void {
    if (this.currentModal) {
      this.currentModal.close();
    }
  }

  dismiss(reason?: any): void {
    if (this.currentModal) {
      this.currentModal.dismiss(reason);
    }
  }
}
