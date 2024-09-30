import { TestBed } from "@angular/core/testing";
import { routes } from './app.routes';
import { provideRouter, Router } from "@angular/router";
import { Location } from "@angular/common";


describe('App Routes', () => {

    let router: Router;
    let location: Location

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideRouter(routes)
            ]
        });

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
    });

    it('should navigate to "about " redirects to /about', async () => {

        await router.navigate(['about']);

        expect(location.path()).toBe('/about');

    });


    it('should load the poper component', async () => {

        const aboutRoute = routes.find(route => route.path === 'about')!;
        expect(aboutRoute).toBeDefined();

        const aboutComponent = await aboutRoute.loadComponent!();
        expect((aboutComponent as any).default.name).toBe('AboutPagesComponent');
    });

});