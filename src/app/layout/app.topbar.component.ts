import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../demo/service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [MessageService]
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    submitted: boolean = false;
    salirDialog: boolean = false;

    constructor(public layoutService: LayoutService, private authService:AuthService,
        private messageService: MessageService, private router:Router) { }



    logoutDialog() {
        this.salirDialog = true;
    }

    confirmLogout(){
        
        this.salirDialog = false;
        localStorage.removeItem('Authorization');
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Sesion Cerrada', life: 3000 });
        setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);

    }
}
