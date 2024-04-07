import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../core/auth/account.service';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.scss'
})
export class SidebarLayoutComponent implements OnInit{


  constructor() { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

}
