import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // Selvalue:any

  constructor(private api:ApiService) { }
  ngOnInit(): void {
   
  }

select(evt:any){
console.log(evt.target.value)
// this.Selvalue=evt.target.value
this.api.currencyvalue.next(evt.target.value)
}

}
