import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PokemonCardComponent } from "./pokemon-card.component";
import { provideRouter } from "@angular/router";
import { SimplePokemon } from "../../interfaces";

const mockPokemon: SimplePokemon = {
    id: '1',
    name: 'bulbasaur'
}

describe('PokemonCardComponent', () => {
    let fixture: ComponentFixture<PokemonCardComponent>;
    let compiled: HTMLElement;
    let component: PokemonCardComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PokemonCardComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonCardComponent);
        fixture.componentRef.setInput('pokemon', mockPokemon);

        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        // console.log(compiled);
        expect(component).toBeTruthy();
    });


    it('should have the SimplePokemon signal inputValue', () => {
        expect(component.pokemon()).toEqual(mockPokemon);
    });

    it('should render the pokemon name and image correctly', () => {
        //Test del nombre
        const namePokemon = compiled.querySelector('h2')?.innerHTML.trim();
        expect(namePokemon).not.toBeUndefined();
        expect(namePokemon!).toEqual(component.pokemon().name);

        //Test de la imagen
        const imgPokemon = compiled.querySelector('img');
        expect(imgPokemon).not.toBeUndefined();
        expect(imgPokemon!.src).toEqual(component.pokemonImage());
    });

    it('shoul have the proper ng-reflect-router-link', () => {
        const divWithLink = compiled.querySelector('div');
        const routerValue = divWithLink?.attributes.getNamedItem('ng-reflect-router-link')!.value;
        expect(routerValue).toBe('/pokemons,bulbasaur');
    });

});