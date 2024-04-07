import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChaineHoteliereService } from '../../admin/services/chaine-hoteliere.service';
import { ChambreService } from '../../admin/services/chambre.service';
import { IChaineHoteliere } from '../../shared/models/chaine-hoteliere.model';
import { IChambre } from '../../shared/models/chambre.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  chambresDisponibles: IChambre[] = [];

  startDateDp: any;
  endDateDp: any;

  chaineHotelieres: IChaineHoteliere[] = [];

  constructor(private fb: FormBuilder, private chaineHoteliereService: ChaineHoteliereService, private chambreService: ChambreService) {
    this.searchForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      capacity: ['', Validators.required],
      area: ['', Validators.required],
      hotelChain: [''],
      hotelCategory: [''],
      numberOfRooms: [undefined, Validators.required],
      price: [undefined, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadChaineHotelieres();
    this.onSubmit();
  }

  onSubmit() {
    // console.log(this.searchForm.value);
    this.chambreService.findByFilter(
      this.searchForm.value).subscribe((res) => {
      this.chambresDisponibles = res.body ?? [];
    });
  }

  loadChaineHotelieres() {
    this.chaineHoteliereService.query().subscribe((res) => {
      this.chaineHotelieres = res.body ?? [];
    });
  }

}
