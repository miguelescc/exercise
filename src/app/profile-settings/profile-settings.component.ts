import { Component, OnInit } from '@angular/core';
import {IProfile, ProfileService} from '../profile-service/profile.service';
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  public title = 'Profile';


  loading=false;
  error=false;
  errorMessage='';

  public user: IProfile={
    firstName : '',
  lastName : '',
  username : '',
  age:0
  };

  constructor(private profile: ProfileService) {
  }

  ngOnInit() {}


  async saveProfile() {
    this.loading=true;

    console.log(this.user.firstName);
    //const {a,b}= await this.profile.setName('asd').then(resp=>resp.map);
    await this.profile.setName('asd')
    .then(resp=> {
        this.error=false;
        this.errorMessage=''
        console.log(resp)
        //this.user=resp;
      })
      .catch(resp=>{
        console.warn(resp.error)
        this.error=true;
        this.errorMessage=resp.error;
      });
      this.loading=false;
      //console.log(resp)






    // let prom1=this.profile.setName.then(resolve);
    // this.profile.setName.then(message=>console.log(message))
    // console.log(profile.then());
  }


}



// await this.profile.setName('asd')
// .then(resp=>{
//   console.log(resp) this.error=true;
// })

// .then(resp=> {
//   this.error=false;
//   this.errorMessage=''
//   console.log(resp)

//   //const a=resp.pipe((asd:any)=>console.log(asd))
// })



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
