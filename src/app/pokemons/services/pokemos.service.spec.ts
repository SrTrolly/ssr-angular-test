import { TestBed } from "@angular/core/testing";
import { PokemonsService } from "./pokemos.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { PokeAPIResponse, SimplePokemon } from "../interfaces";
import { catchError } from "rxjs";


const mockPokeApiResponse: PokeAPIResponse = {
    count: 1302,
    next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    previous: '',
    results: [
        {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            name: "ivysaur",
            url: "https://pokeapi.co/api/v2/pokemon/2/"
        },
    ],
}


const expectedPokemons: SimplePokemon[] = [
    { id: '1', name: 'bulbasaur' },
    { id: '2', name: 'ivysaur' },
];

const mockPokemon: SimplePokemon = {
    id: '1',
    name: 'bulbasaur'
};


describe('AppComponent', () => {
    let service: PokemonsService;
    let httpmock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        });
        service = TestBed.inject(PokemonsService);
        httpmock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpmock.verify();
    })

    it('should create the app', () => {
        expect(service).toBeTruthy();
    });

    it('should load a pgae of SimplePokemons', () => {

        service.loadPage(1).subscribe(pokemons => {
            expect(pokemons).toEqual(expectedPokemons);
        });
        const req = httpmock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);

        expect(req.request.method).toBe('GET');

        req.flush(mockPokeApiResponse);
    });
    it('should load a page 5 of SimplePokemons', () => {

        service.loadPage(5).subscribe(pokemons => {
            expect(pokemons).toEqual(expectedPokemons);
        });
        const req = httpmock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`);

        expect(req.request.method).toBe('GET');

        req.flush(mockPokeApiResponse);
    });

    it('should load a Pokemon by id', () => {

        const pokemonId = '1';

        service.loadPokemon(pokemonId).subscribe((pokemon: any) => {
            expect(pokemon).toEqual(mockPokemon);
        });

        const req = httpmock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

        expect(req.request.method).toBe('GET');

        req.flush(mockPokemon);

    });
    it('should load a Pokemon by name', () => {

        const pokemonName = 'bulbasaur';

        service.loadPokemon(pokemonName).subscribe((pokemon: any) => {
            expect(pokemon).toEqual(mockPokemon);
        });

        const req = httpmock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        expect(req.request.method).toBe('GET');

        req.flush(mockPokemon);

    });

    it('should cath erro if pokemon not found', () => {

        const pokemonName = 'no-existe';

        service.loadPokemon(pokemonName)
            .pipe(
                catchError(err => {

                    expect(err.message).toContain('Pokemon not found');

                    return [];
                })
            )
            .subscribe();

        const req = httpmock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        expect(req.request.method).toBe('GET');

        req.flush('Pokemon not found', {
            status: 404,
            statusText: 'Not Found'
        });

    });
});