import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.scss'
})
export class AppMenuComponent implements OnInit {

  menuItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
      },
      {
        label: 'Search',
        icon: 'pi pi-fw pi-search',
        routerLink: '/search'
      },
      {
        label: 'Bookings',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/bookings'
      }
    ];
  }



}
