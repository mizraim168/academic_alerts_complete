import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';

declare let M: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  // user = {
  //   name : '',
  //   lastname: '',
  //   motherlastname: '',
  //   email:'',
  //   password: '',
  //   role: ''
  // }
  constructor(public userService: UserService) {

   }

  ngOnInit(): void {
    
  
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    
  }

  addUser(form: NgForm){
    this.userService.postUser(form.value)
      .subscribe(res => {
        console.log(res);
        let data = JSON.stringify(res);
        let dataJson = JSON.parse(data);
        localStorage.setItem('token', dataJson.token);
      });
  }

 

}
