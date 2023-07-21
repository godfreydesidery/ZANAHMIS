import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.scss']
})
export class LabTestComponent implements OnInit {

  rs : number[] = [1,2,3.4,5,6]

  constructor() { }

  ngOnInit(): void {
  }

}
