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
  emailErrorMessage='';

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
    this.loading=true;
    this.user.firstName=this.forma.value.firstName;
    this.user.lastName=this.forma.value.lastName;
    this.forma.controls['firstName'].disable();
    this.forma.controls['lastName'].disable();


    await this.profile.setName(this.user.firstName,this.user.lastName)
    .then((resp:any)=> {
        this.error=false;
        this.errorMessage='';
        //console.log(resp);
        //console.log(this.user);
        // Object.entries(resp).forEach(([key, value]) => {//for saving the values into the user
        //   console.log(key + ' ' + value);
        //   this.user.firstName=value as string;
        //   this.user.lastName=value as string;
        //   this.user.username=value as string;
        //   this.user.email=value as string;
        //   this.user.age=value as number;
        // })
      })
      .catch(resp=>{
        console.warn(resp.error)
        this.error=true;
        this.errorMessage=resp.error;
      });

      this.loading=false;
      this.forma.controls['firstName'].enable();
      this.forma.controls['lastName'].enable();
      this.user.firstName = this.user.firstName.replace(/\s/g, "").toLowerCase();
      this.user.lastName = this.user.lastName.replace(/\s/g, "").toLowerCase();


      //si es nulo osea si salio error al otro lado (falta borrar el user) entoncesno se hace esto
      this.user.email= this.user.firstName+'.'+this.user.lastName+'@blueface.com';
      console.log("error: "+this.error);
      if(!this.error){
      await this.profile.setUserEmail(this.user.email)
      .then((resp:any)=> {
        this.emailErrorMessage='';
        this.emailError=false;
        //console.log(resp)
      })
      .catch(resp=>{
        console.warn(resp.error)
        this.user.firstName='';
        this.user.lastName='';
        this.forma.reset();
        this.emailError=true;
        this.emailErrorMessage=resp.error;
      });
      }
      console.log(this.user);



  }


  get invalidName(){
    return this.forma.get('firstName')?.invalid&&this.forma.get('firstName')?.touched;
  }
  get invalidLastName(){
    return this.forma.get('lastName')?.invalid&&this.forma.get('lastName')?.touched;
  }
}





//
// .then(resp=> {
//   this.error=false;
//   this.errorMessage=''
//   console.log(resp)


// })
// .catch(resp=>{
//   console.warn(resp.error)
//   this.error=true;
//   this.errorMessage=resp.error;
// });
