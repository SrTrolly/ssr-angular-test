import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemos.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonComponent implements OnInit {

  private pokemonsService = inject(PokemonsService)
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null)


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id') ?? '';

    if (!id) return;

    this.pokemonsService.loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {
          this.setMetaTags(name, id);
        })
      )
      .subscribe(pokemon => this.pokemon.set(pokemon));

  }


  private setMetaTags(name: string, id: number) {
    const pageTitle = `#${id} - ${name}`;
    const pageDescription = `Pagina del Pokemon ${name}`;

    this.title.setTitle(`#${id} - ${name}`);
    this.meta.updateTag({ name: 'description', content: pageTitle })
    this.meta.updateTag({ name: 'og:description', content: pageDescription })
    this.meta.updateTag({ name: 'og:description', content: pageDescription })
    this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` })
  }






}
