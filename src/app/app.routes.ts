import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'pokemons/page/:page',
        loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
    },
    {
        path: 'pokemons/:id',
        loadComponent: () => import('./pages/pokemon/pokemon.component'),
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about-pages.component'),
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact-pages.component'),
    },
    {
        path: 'pricing',
        loadComponent: () => import('./pages/pricing/pricing-pages.component'),
    },
    {
        path: '**',
        redirectTo: 'about'
    }
];
