import { Component, OnInit } from '@angular/core';
declare function _initPlugins();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IcastWeb';

  ngOnInit() {
    _initPlugins();
  }

}
