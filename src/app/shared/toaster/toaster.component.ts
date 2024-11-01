import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {

  @Input('tosterData') tosterData?: {message: string, success: boolean};
  constructor() { }

  ngOnInit() {
  }

}
