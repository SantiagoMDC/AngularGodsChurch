import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Finanza } from 'src/app/demo/api/finanza';
import { FinanzaService } from 'src/app/demo/service/finanza.service';
import { SelectItem } from 'primeng/api';

@Component({
    templateUrl: './finanza.component.html',
    providers: [MessageService],
})
export class FinanzaComponent implements OnInit {
    
    totalIngreso: number = 0;
    totalEgreso: number = 0;

    finanzaDialog: boolean = false;

    deleteFinanzaDialog: boolean = false;

    deleteFinanzasDialog: boolean = false;

    finanzas: Finanza[] = [];

    finanza: Finanza = {};

    selectedFinanzas: Finanza[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    mesSeleccionado: string = '';
    anioSeleccionado: string = '';

    meses: SelectItem[] = [];
    anios: SelectItem[] = [];

    

    constructor(
        private finanzaService: FinanzaService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.meses = [
            { label: 'Enero', value: '01' },
            { label: 'Febrero', value: '02' },
            { label: 'Marzo', value: '03' },
            { label: 'Abril', value: '04' },
            { label: 'Mayo', value: '05' },
            { label: 'Junio', value: '06' },
            { label: 'Julio', value: '07' },
            { label: 'Agosto', value: '08' },
            { label: 'Septiembre', value: '09' },
            { label: 'Octubre', value: '10' },
            { label: 'Noviembre', value: '11' },
            { label: 'Diciembre', value: '12' },
        ];

        const anioActual = new Date().getFullYear();
        this.anios = [];
        for (let i = 0; i < 10; i++) {
            this.anios.push({
                label: `${anioActual - i}`,
                value: `${anioActual - i}`,
            });
        }

        this.finanzaService.getFinanzas().then((data) => {
            // @ts-ignore
            this.finanzas = data;
             // @ts-ignore
             this.totalIngreso = this.finanzas.reduce((sum, finanza) => finanza.tipo === 'Ingreso' ? sum + finanza.valor : sum, 0);
             // @ts-ignore
             this.totalEgreso = this.finanzas.reduce((sum, finanza) => finanza.tipo === 'EGRESO' ? sum + finanza.valor : sum, 0);

            
          });
          

        this.cols = [
            { field: 'codigo', header: 'Codigo' },
            { field: 'description', header: 'Descripcion' },
            { field: 'valor', header: 'Valor' },
            { field: 'fecha', header: 'Fecha' },
            { field: 'tipo', header: 'Tipo' },
        ];

        this.statuses = [
            { label: 'INGRESO', value: 'ingreso' },
            { label: 'EGRESO', value: 'egreso' },
        ];
    }

    openNew() {
        this.finanza = {};
        this.submitted = false;
        this.finanzaDialog = true;
    }

    deleteSelectedFinanzas() {
        this.deleteFinanzasDialog = true;
    }

    editFinanza(finanza: Finanza) {
        this.finanza = { ...finanza };
        this.finanzaDialog = true;
    }

    deleteFinanza(finanza: Finanza) {
        this.deleteFinanzaDialog = true;
        this.finanza = { ...finanza };
    }

    confirmDeleteSelected() {
        this.deleteFinanzasDialog = false;
        this.finanzas = this.finanzas.filter(
            (val) => !this.selectedFinanzas.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Finanzas Deleted',
            life: 3000,
        });
        this.selectedFinanzas = [];
    }

    confirmDelete() {
        this.deleteFinanzaDialog = false;
        this.finanzas = this.finanzas.filter(
            (val) => val.codigo !== this.finanza.codigo
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Finanza Deleted',
            life: 3000,
        });
        this.finanza = {};
    }

    hideDialog() {
        this.finanzaDialog = false;
        this.submitted = false;
    }

    saveFinanza() {
        this.submitted = true;
      
        if (this.finanza.descripcion?.trim()) {
          let fechaActual: Date = new Date(); // Crear un nuevo objeto Date y asignarle la fecha actual del sistema
          let dia: number = fechaActual.getDate(); // Obtener el día del mes (1-31)
          let mes: number = fechaActual.getMonth() + 1; // Obtener el mes (0-11) y sumar 1 para que sea 1-12
          let anio: number = fechaActual.getFullYear(); // Obtener el año con cuatro dígitos
          let fechaFormateada: string =
            anio.toString() +
            '-' +
            mes.toString().padStart(2, '0') +
            '-' +
            dia.toString().padStart(2, '0');
      
          this.finanza.fecha = fechaFormateada;
          this.finanza.codigo = this.createId();
      
          this.finanzaService.addFinanza(this.finanza).then((data) => {
            // @ts-ignore
            this.finanzas.push(data);
        
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Finanza Created',
                life: 3000,
              });
      
              this.finanzas = [...this.finanzas];
              this.finanzaDialog = false;
              this.finanza = {};
            },
            (error) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error creating Finanza',
                life: 3000,
              });
            }
          );
        }
      }
      

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.finanzas.length; i++) {
            if (this.finanzas[i].codigo === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    limpiarFiltros() {
        this.mesSeleccionado = '';
        this.anioSeleccionado = '';
        this.ngOnInit();

    }

    filtrado() {
        if (this.mesSeleccionado && this.anioSeleccionado) {
          const fechaInicio = new Date(parseInt(this.anioSeleccionado), parseInt(this.mesSeleccionado) - 1, 1);
          const fechaFin = new Date(parseInt(this.anioSeleccionado), parseInt(this.mesSeleccionado), 0);
          this.finanzaService.getFinanzas().then((data) => {
            // @ts-ignore
            this.finanzas = data.filter((item) => {
                // @ts-ignore
              const fechaRegistro = new Date(item.fecha);
              return fechaRegistro >= fechaInicio && fechaRegistro <= fechaFin;
             
            });
             // @ts-ignore
             this.totalIngreso = this.finanzas.reduce((sum, finanza) => finanza.tipo === 'Ingreso' ? sum + finanza.valor : sum, 0);
             // @ts-ignore
             this.totalEgreso = this.finanzas.reduce((sum, finanza) => finanza.tipo === 'Egreso' ? sum + finanza.valor : sum, 0);
          });
           
        }
    }



}
