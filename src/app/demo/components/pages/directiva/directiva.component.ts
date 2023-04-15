import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './directiva.component.html',
  providers: [MessageService]
})
export class DirectivaComponent implements OnInit {
  
  ngOnInit(){
    
  }
  
}