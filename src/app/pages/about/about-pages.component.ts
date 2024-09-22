
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [

  ],
  templateUrl: './about-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPagesComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi About Page' });
    this.meta.updateTag({ name: 'og:tittle', content: ' About Page' });
    this.meta.updateTag({ name: 'keywords', content: ' Hola,Mundo,Fernando,Herrera,Curso,Angular,PRO' });
  }

}
