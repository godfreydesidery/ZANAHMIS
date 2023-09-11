import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IFinalDiagnosis } from 'src/app/domain/final-diagnosis';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';



const API_URL = environment.apiUrl;

@Component({
  selector: 'app-final-diagnosis-history',
  templateUrl: './final-diagnosis-history.component.html',
  styleUrls: ['./final-diagnosis-history.component.scss']
})
export class FinalDiagnosisHistoryComponent {
  
  patientId : any = null

  finalDiagnosises : IFinalDiagnosis[] =  []

  constructor(private auth : AuthService,
    private http :HttpClient,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
    ) { }

  async ngOnInit(): Promise<void> {
    this.patientId = localStorage.getItem('patient-id')
    this.getFinalDiagnosisHistory()
  }    
  
  async getFinalDiagnosisHistory(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IFinalDiagnosis[]>(API_URL+'/patients/get_all_final_diagnosises_by_patient_id?patient_id='+this.patientId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.finalDiagnosises = data!
        console.log(data)

      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load final diagnosises')
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