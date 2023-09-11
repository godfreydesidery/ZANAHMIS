import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IProcedure } from 'src/app/domain/procedure';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';



const API_URL = environment.apiUrl;

@Component({
  selector: 'app-procedure-history',
  templateUrl: './procedure-history.component.html',
  styleUrls: ['./procedure-history.component.scss']
})
export class ProcedureHistoryComponent {
  
  patientId : any = null

  procedures : IProcedure[] = []

  constructor(private auth : AuthService,
    private http :HttpClient,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
    ) { }

  async ngOnInit(): Promise<void> {
    this.patientId = localStorage.getItem('patient-id')
    this.getProcedureHistory()
  }  
  
  async getProcedureHistory(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IProcedure[]>(API_URL+'/patients/get_all_procedures_by_patient_id?patient_id='+this.patientId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.procedures = data!
        console.log(data)

      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load procedures')
        console.log(error)
      }
    )
  }

  public grant(privilege : string[]) : boolean{
    /**Allow user to perform an action if the user has that priviledge */
    var granted : boolean = false
    privilege.forEach(
      element => {
        if(this.auth.checkPrivilege(element)){
          granted = true
        }
      }
    )
    return granted
  }
}