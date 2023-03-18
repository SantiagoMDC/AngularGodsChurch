import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Miembro } from 'src/app/demo/api/miembro';
import { MiembroService } from 'src/app/demo/service/miembro.service';

@Component({
 
  templateUrl: './miembro.component.html',
  providers: [MessageService]
})
export class MiembroComponent implements OnInit{
  
  miembroDialog: boolean = false;

  deleteMiembroDialog: boolean = false;

  deleteMiembrosDialog: boolean = false;

  miembros: Miembro[] = [];

  miembro: Miembro = {};

  selectedMiembros: Miembro[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private miembroService: MiembroService, private messageService: MessageService) { }

  ngOnInit() {
      this.miembroService.getMiembros().then(data => this.miembros = data);

      this.cols = [
          { field: 'nombre', header: 'Nombre' },
          { field: 'apellido', header: 'Apelllido' },
          { field: 'edad', header: 'Edad'},
          { field: 'telefono', header: 'Telefonoo' },
          { field: 'direccion', header: 'Direccion' },
          { field: 'miembroStatus', header: 'Estado' },
          { field: 'categoria', header: 'Categoria' }
          
          
      ];

      this.statuses = [
          { label: 'ACTIVO', value: 'activo' },
          { label: 'PENDIENTE', value: 'pendiente' },
          { label: 'INACTIVO', value: 'inactivo' }
      ];
  }

  openNew() {
      this.miembro = {};
      this.submitted = false;
      this.miembroDialog = true;
  }

  deleteSelectedMiembros() {
      this.deleteMiembrosDialog = true;
  }

  editMiembro(miembro: Miembro) {
      this.miembro = { ...miembro };
      this.miembroDialog = true;
  }

  deleteMiembro(miembro: Miembro) {
      this.deleteMiembroDialog = true;
      this.miembro = { ...miembro };
  }

  confirmDeleteSelected() {
      this.deleteMiembrosDialog = false;
      this.miembros = this.miembros.filter(val => !this.selectedMiembros.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Miembros Deleted', life: 3000 });
      this.selectedMiembros = [];
  }

  confirmDelete() {
      this.deleteMiembroDialog = false;
      this.miembros = this.miembros.filter(val => val.id !== this.miembro.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Miembro Deleted', life: 3000 });
      this.miembro = {};
  }

  hideDialog() {
      this.miembroDialog = false;
      this.submitted = false;
  }

  saveMiembro() {
      this.submitted = true;

      if (this.miembro.nombre?.trim()) {
          if (this.miembro.id) {
              // @ts-ignore
              this.miembro.miembroStatus = this.miembro.miembroStatus.value ? this.miembro.miembroStatus.value : this.miembro.miembroStatus;
              this.miembros[this.findIndexById(this.miembro.id)] = this.miembro;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Miembro Updated', life: 3000 });
          } else {
              this.miembro.id = this.createId();
              // @ts-ignore
              this.miembro.miembroStatus = this.miembro.miembroStatus ? this.miembro.miembroStatus.value : 'ACTIVO';
              this.miembros.push(this.miembro);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Miembro Created', life: 3000 });
          }

          this.miembros = [...this.miembros];
          this.miembroDialog = false;
          this.miembro = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.miembros.length; i++) {
          if (this.miembros[i].id === id) {
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
