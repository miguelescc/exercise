import { Component, OnInit } from '@angular/core';
import {IProfile, ProfileService} from '../profile-service/profile.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  public title = 'Profile';

  forma:FormGroup;
  loading=false;
  error=false;
  errorMessage='';
  emailError=false;
  emailMessage='';
  opt:string='';

  public user: IProfile={
  firstName : '',
  lastName : '',
  username : '',
  email:'',
  age:0
  };

  constructor(private profile: ProfileService,private fb: FormBuilder) {

    this.forma=this.fb.group({
      firstName:['',[Validators.required,Validators.minLength(1)]],
      lastName:['',[Validators.required,Validators.minLength(1)]],
      username:'',
      email:[],
      age:0
    })
  }

  ngOnInit() {}


  async saveProfile() {
    if(this.forma.valid ){
    this.loading=true;
    this.user.firstName=this.forma.value.firstName;
    this.user.lastName=this.forma.value.lastName;
    this.forma.controls['firstName'].disable();
    this.forma.controls['lastName'].disable();



    await this.profile.setName(this.user.firstName,this.user.lastName)
    .then((resp:any)=> {
        this.error=false;
        this.errorMessage='';
      })
      .catch(resp=>{
        console.warn(resp.error)
        this.error=true;
        this.emailMessage='';
        this.errorMessage=resp.error;
      });


      this.user.firstName = this.user.firstName.replace(/\s/g, "").toLowerCase();
      this.user.lastName = this.user.lastName.replace(/\s/g, "").toLowerCase();


      this.user.email= this.user.firstName+'.'+this.user.lastName+'@blueface.com';
      if(!this.error){
      await this.profile.setUserEmail(this.user.email)
        .then((resp:any)=> {
          this.emailMessage='';
          this.emailError=true;
          this.emailMessage='Email generated: '+this.user.email;
          //console.log(resp)
       })
        .catch(resp=>{
          console.warn(resp.error)
          this.user.firstName='';
          this.user.lastName='';
          this.user.email='';
          this.forma.reset();
          this.emailError=true;
          this.emailMessage=resp.error;
        });
      }
      this.loading=false;
      this.forma.controls['firstName'].enable();
      this.forma.controls['lastName'].enable();
      console.log(this.user);


    }
  }
  get invalidName(){
    return this.forma.get('firstName')?.invalid&&this.forma.get('firstName')?.touched;
  }
  get invalidLastName(){
    return this.forma.get('lastName')?.invalid&&this.forma.get('lastName')?.touched;
  }
}
