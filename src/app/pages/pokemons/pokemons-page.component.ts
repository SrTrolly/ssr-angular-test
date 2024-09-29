
import { ApplicationRef, ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/Pokemos.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent,
    RouterLink
  ],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class PokemonsPageComponent implements OnDestroy {


  // public currentName = signal('Nicolas');
  private pokemonsService = inject(PokemonsService);


  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(param => param['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page)),
      // tap(() => this.loadPokemons())
    )
  )

  public loadOnPageChange = effect(() => {
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true
  });

  // public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((IsStable: boolean) => {
  //   console.log({ IsStable });
  // })

  // ngOnInit(): void {

  //   console.log(this.currentPage());

  //   this.loadPokemons();

  //   // setTimeout(() => {
  //   //   this.isLoading.set(false);
  //   // }, 5000);

  // }


  public loadPokemons(page: number = 0) {

    this.pokemonsService.loadPage(page)
      .pipe(
        // tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`Pokemons SSR - Page ${page}`))
      )
      .subscribe(pokemons => this.pokemons.set(pokemons));
  }

  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }

}
