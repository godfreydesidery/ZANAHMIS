import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IRadiology } from 'src/app/domain/radiology';
import { MsgBoxService } from 'src/app/services/msg-box.service';
import { environment } from 'src/environments/environment';



const API_URL = environment.apiUrl;

@Component({
  selector: 'app-radiology-history',
  templateUrl: './radiology-history.component.html',
  styleUrls: ['./radiology-history.component.scss']
})
export class RadiologyHistoryComponent {
  
  patientId : any = null

  radiologies : IRadiology[] = []

  constructor(private auth : AuthService,
    private http :HttpClient,
    private spinner : NgxSpinnerService,
    private msgBox : MsgBoxService
    ) { }

  async ngOnInit(): Promise<void> {
    this.patientId = localStorage.getItem('patient-id')
    this.getRadiologyHistory()
  }   
  
  async getRadiologyHistory(){
    let options = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.user.access_token)
    }
    this.spinner.show()
    await this.http.get<IRadiology[]>(API_URL+'/patients/get_all_radiologies_by_patient_id?patient_id='+this.patientId, options)
    .pipe(finalize(() => this.spinner.hide()))
    .toPromise()
    .then(
      data => {
        this.radiologies = data!
        console.log(data)

      }
    )
    .catch(
      error => {
        this.msgBox.showErrorMessage('Could not load radiologies')
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
