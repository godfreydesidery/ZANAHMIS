import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { SearchFilterPipe } from 'src/app/pipes/search-filter-pipe';

@Component({
  selector: 'app-pharmacy-to-pharmacy-r-n',
  templateUrl: './pharmacy-to-pharmacy-r-n.component.html',
  styleUrls: ['./pharmacy-to-pharmacy-r-n.component.scss'],
  standalone : true,
  imports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchFilterPipe,
    AgePipe,
    RouterLink
  ],
})
export class PharmacyToPharmacyRNComponent {

}
