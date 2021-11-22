import { Component, OnInit } from '@angular/core';
import {IProfile, ProfileService} from '../profile-service/profile.service';
import {map} from'rxjs/operators';

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

  constructor(private profile: ProfileService) { }

  ngOnInit() {}


  async saveProfile() {
    this.loading=true;

    await this.profile.setName('asd')
    .then(resp=> {
      this.error=true;
      this.errorMessage=''
      console.log(resp)

    })
    .catch(resp=>{
      console.warn(resp.error)
      this.error=true;
      this.errorMessage=resp.error;
    });

    this.loading=false;
    // let prom1=this.profile.setName.then(resolve);
    // this.profile.setName.then(message=>console.log(message))
    // console.log(profile.then());
  }


}



// await this.profile.setName('asd')
// .then(resp=>{
//   console.log(resp) this.error=true;
// })
