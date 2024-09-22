
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [

  ],
  templateUrl: './contact-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPagesComponent { }
