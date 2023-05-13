import { Component, OnInit } from '@angular/core';
import { Console, log } from 'console';
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

  estados: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private miembroService: MiembroService, private messageService: MessageService) { }

  ngOnInit() {
        
    
    this.miembroService.getMiembros().then(data => {
        if (data) {
            
          this.miembros = data;
        }
      });
      
      this.cols = [
          { field: 'identificacion', header: 'Identificacion'},
          { field: 'nombre', header: 'Nombre' },
          { field: 'apellido', header: 'Apelllido' },
          { field: 'edad', header: 'Edad'},
          { field: 'telefono', header: 'Telefonoo' },
          { field: 'direccion', header: 'Direccion' },
          { field: 'estado', header: 'Estado' },
          { field: 'categoria', header: 'Categoria' }
          
          
      ];

      this.estados = [
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

  async confirmDeleteSelected() {
      this.deleteMiembrosDialog = false;
      this.miembros = this.miembros.filter(val => !this.selectedMiembros.includes(val));
      for (const miembro of this.selectedMiembros) {
        await this.miembroService.deleteMiembro(miembro);
      }
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Miembros Deleted', life: 3000 });
      this.selectedMiembros = [];
  }

  confirmDelete() {
      this.deleteMiembroDialog = false;
      this.miembros = this.miembros.filter(val => val.identificacion !== this.miembro.identificacion);
      //@ts-ignore()
        this.miembroService.deleteMiembro(this.miembro);
      
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
          if (this.miembro.identificacion) {
              if (this.findIndexById(this.miembro.identificacion) === -1) {

                  // @ts-ignore
                  this.miembro.miembroStatus = this.miembro.estado.value ? this.miembro.estado.value : this.miembro.estado;
                  this.miembroService.addMiembro(this.miembro);
                  this.miembros.push(this.miembro);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Miembro Created', life: 3000 });
                   
              } else {
                  // @ts-ignore

                  this.miembro.miembroStatus = this.miembro.estado.value ? this.miembro.estado.value : this.miembro.estado;
                  this.miembros[this.findIndexById(this.miembro.identificacion)] = this.miembro;
                  this.miembroService.updateMiembro(this.miembro);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Miembro Updated', life: 3000 });
                  
              }
              
          }

          this.miembros = [...this.miembros];
          this.miembroDialog = false;
          this.miembro = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.miembros.length; i++) {
          if (this.miembros[i].identificacion === id) {
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
