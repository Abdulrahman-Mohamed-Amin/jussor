import { Component, Input, OnInit } from '@angular/core';
import { DashboardRoutingModule } from "../../features/dashboard/dashboard-routing.module";
import { Project } from '../../core/interfaces/project';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DashboardRoutingModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
@Input() project: Project | null = null;
  url:string = 'https://realstatesaudi.runasp.net'

lang:string = "ar"

constructor(){
}

ngOnInit(): void {
  
}
}
