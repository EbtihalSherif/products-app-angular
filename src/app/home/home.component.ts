import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public pageTitle = 'Welcome';

  constructor() { }

  ngOnInit(): void {
  }

}
