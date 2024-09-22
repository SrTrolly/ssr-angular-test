
import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [

  ],
  templateUrl: './pricing-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPagesComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {

    // if(isPlatformServer(this.platform)){
    //   console.log('test')
    // }


    this.title.setTitle('Contact Page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi Contact Page' });
    this.meta.updateTag({ name: 'og:tittle', content: ' Contact Page' });
    this.meta.updateTag({ name: 'keywords', content: ' Hola,Mundo,Fernando,Herrera,Curso,Angular,PRO' });
  }



}
