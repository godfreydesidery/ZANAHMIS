import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;
@Component({
  selector: 'app-lab-outsider-list',
  templateUrl: './lab-outsider-list.component.html',
  styleUrls: ['./lab-outsider-list.component.scss']
})
export class LabOutsiderListComponent implements OnInit {

  
  constructor(private auth : AuthService,
    private http :HttpClient,
    private modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private router : Router) { }

  ngOnInit(): void {
  }

  attend(){
    this.router.navigate(['lab-test'])
  }

}
