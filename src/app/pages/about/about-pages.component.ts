
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [

  ],
  templateUrl: './about-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPagesComponent { }
