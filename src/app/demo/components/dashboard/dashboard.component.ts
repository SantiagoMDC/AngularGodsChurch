import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DirectivaService } from '../../service/directiva.service';
import { Directiva } from '../../api/directiva';
import { count } from 'console';
import { Miembro } from '../../api/miembro';
import { MiembroService } from '../../service/miembro.service';
import { Finanza } from '../../api/finanza';
import { FinanzaService } from '../../service/finanza.service';
import { Table } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';


@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService]
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];
    
    directivas: Directiva[] = [];

    directiva: Directiva = {};

    miembros: Miembro[] = [];

    miembro: Miembro = {};

    finanza: Finanza = {};

    finanzas: Finanza[] = [];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;
    totalRegistros: any;
    totalMiembros: any;
    totalIngresos:any;
    totalEgresos:any;

    miembroDialog: boolean = false;
    directivaDialog: boolean = false;
    submitted: boolean = false;
    estados: any[] = [];
    cols: any[] = [];

    constructor(private miembroService: MiembroService,private directivaService: DirectivaService,private finanzaService: FinanzaService,private productService: ProductService, public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }
    

    ngOnInit() {
        this.totalEgresos = 0;
        this.totalIngresos = 0;
        this.totalMiembros = 0;
        this.totalRegistros = 0;

        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);
        
        this.directivaService.getDirectivas().then(data => {
            //@ts-ignore()
            this.directivas = data;
            this.totalRegistros = this.directivas.length;
        });

        this.miembroService.getMiembros().then(data => {
            //@ts-ignore()
            this.miembros = data;
            this.totalMiembros = this.miembros.length;
        });

        this.finanzaService.getFinanzas().then((data) => {
            // @ts-ignore
            this.finanzas = data;
             // @ts-ignore
             this.totalIngresos = this.finanzas.reduce((sum, finanza) => finanza.tipo === 'Ingreso' ? sum + finanza.valor : sum, 0);
             // @ts-ignore
             this.totalEgresos = this.finanzas.reduce((sum, finanza) => finanza.tipo === 'EGRESO' ? sum + finanza.valor : sum, 0);

            
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

    

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    hideDialog() {
        this.miembroDialog = false;
        this.submitted = false;
    }

    viewMiembro(miembro: Miembro) {
        this.miembro = { ...miembro };
        this.miembroDialog = true;
    }

    viewDirectiva(directiva: Directiva) {
        this.directiva = { ...directiva };
        this.directivaDialog = true;
    }

}
