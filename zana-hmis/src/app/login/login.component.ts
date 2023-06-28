import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**Login credentials */
  username  : string
  password  : string

  /**Checks the login status */
  status : string = ''

  /**User alert message */
  message : any = ''

  /**For modal display */
  closeResult : string = ''

  constructor(
    private http :HttpClient,
    private auth : AuthService, 
    private router: Router, 
    private authService: AuthService) {  
    
    this.username = ''
    this.password = ''  

  }

  ngOnInit(): void {
    this.status   = ''
    this.message  = ''
    this.username = ''
    this.password = '' 
  }

  async loginUser(){
    localStorage.removeItem('user-name')
    localStorage.removeItem('system-date')

    if(this.username == '' || this.password == ''){ 
      alert('Please fill in your username and password')
      return
    }
    this.status = 'Loading... Please wait.'
    await this.auth.loginUser(this.username, this.password)
      .pipe(first())
      .toPromise()
      .then(
        async data => {
          this.status = 'Loading User... Please wait.'
          await this.auth.loadUserSession(this.username)
          this.status = 'Authenticated'
          window.location.reload()
        }
      )
      .catch(error => {
        this.status = ''
        localStorage.removeItem('current-user')
        alert('Invalid username and password')
        console.log(error)
        return
      })    
  }
  
  /**Clear credential fields to allow new entry */
  clearFields(){
    this.username = ''
    this.password = ''
  }

  /** */
  contactAdministrator(){
    alert('Please contact System Administrator for password recovery')
  }

  clearCredentials(event : any){
    event.target.value = ''
  }


  
}

/**A user model */
export interface User{
  firstName   : string
  secondName  : string
  lastName    : string
}