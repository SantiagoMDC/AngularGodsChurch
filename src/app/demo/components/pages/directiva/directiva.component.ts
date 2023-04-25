import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Directiva } from 'src/app/demo/api/directiva';
import { DirectivaService } from 'src/app/demo/service/directiva.service';

@Component({
  templateUrl: './directiva.component.html',
  providers: [MessageService]
})
export class DirectivaComponent implements OnInit {

  directivaDialog: boolean = false;

  deleteDirectivaDialog: boolean = false;

  deleteDirectivasDialog: boolean = false;

  directivas: Directiva[] = [];

  directiva: Directiva = {};

  selectedDirectivas: Directiva[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private directivaService: DirectivaService, private messageService: MessageService) { }

  ngOnInit() {
      this.directivaService.getDirectivas().then(data => this.directivas = data);

      
  }

  openNew() {
      this.directiva = {};
      this.submitted = false;
      this.directivaDialog = true;
  }

  deleteSelectedDirectivas() {
      this.deleteDirectivasDialog = true;
  }

  editDirectiva(directiva: Directiva) {
      this.directiva = { ...directiva };
      this.directivaDialog = true;
  }

  deleteDirectiva(directiva: Directiva) {
      this.deleteDirectivaDialog = true;
      this.directiva = { ...directiva };
  }

  confirmDeleteSelected() {
      this.deleteDirectivasDialog = false;
      this.directivas = this.directivas.filter(val => !this.selectedDirectivas.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Directivas Deleted', life: 3000 });
      this.selectedDirectivas = [];
  }

  confirmDelete() {
      this.deleteDirectivaDialog = false;
      this.directivas = this.directivas.filter(val => val.codigo !== this.directiva.codigo);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Directiva Deleted', life: 3000 });
      this.directiva = {};
  }

  hideDialog() {
      this.directivaDialog = false;
      this.submitted = false;
  }

  saveDirectiva() {
      this.submitted = true;

      if (this.directiva.nombre?.trim()) {
          if (this.directiva.codigo) {
              // @ts-ignore
              this.directivas[this.findIndexById(this.directiva.codigo)] = this.directiva;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Directiva Updated', life: 3000 });
          } else {
              
            this.directiva.codigo = this.createId();
              // @ts-ignore
              this.directivas.push(this.directiva);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Directiva Created', life: 3000 });
          }

          this.directivas = [...this.directivas];
          this.directivaDialog = false;
          this.directiva = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.directivas.length; i++) {
          if (this.directivas[i].codigo === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
