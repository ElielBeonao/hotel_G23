import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap';
// import { NgxWebstorageModule } from 'ngx-webstorage';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { HttpClientModule } from '@angular/common/http';
// import { NgxWebstorageModule } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor(ngbConfig: NgbConfig) { 
    ngbConfig.animation = false;
  }
}
