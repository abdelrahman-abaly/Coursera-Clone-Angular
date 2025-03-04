import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ParentComponentComponent } from './components/parent-component/parent-component.component';
import { careerComponent } from './components/career/career.component';

@Component({
  selector: 'app-root',
  imports: [ParentComponentComponent,careerComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'career';
}
