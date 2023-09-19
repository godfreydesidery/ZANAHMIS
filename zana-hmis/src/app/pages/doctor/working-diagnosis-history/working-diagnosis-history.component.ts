import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IWorkingDiagnosis } from 'src/app/domain/working-diagnosis';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';



const API_URL = environment.apiUrl;

@Component({
  selector: 'app-working-diagnosis-history',
  templateUrl: './working-diagnosis-history.component.html',
  styleUrls: ['./working-diagnosis-history.component.scss']
})
export class WorkingDiagnosisHistoryComponent {
  
  patientId : any = null

  workingDiagnosises : IWorkingDiagnosis[] = []

  filterRecords : string = ''

  consultationId : any = null
  admissionId : any = null

  constructor(private auth : AuthService,
    private http :HttpClient,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
    ) { }

  async ngOnInit(): Promise<void> {
    this.patientId = localStorage.getItem('patient-id')
    this.getWorkingDiagnosisHistory()

    this.consultationId = localStorage.getItem('consultation-id')
    this.admissionId = localStorage.getItem('admission-id')
  } 
  
  async getWorkingDiagnosisHistory(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IWorkingDiagnosis[]>(API_URL+'/patients/get_all_working_diagnosises_by_patient_id?patient_id='+this.patientId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.workingDiagnosises = data!
        console.log(data)

      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load working diagnosises')
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
