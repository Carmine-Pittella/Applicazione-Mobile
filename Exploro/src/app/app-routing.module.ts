import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./pages/registration/registration.module').then(
        (m) => m.RegistrationPageModule
      )
  },
  {
    path: 'base-home',
    loadChildren: () =>
     import('./pages/base-home/base-home.module').then(
      (m) => m.BaseHomePageModule
    )
  },  {
    path: 'homepage',
    loadChildren: () => import('./pages/homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: 'profilo',
    loadChildren: () => import('./pages/profilo/profilo.module').then( m => m.ProfiloPageModule)
  },
  {
    path: 'cache',
    loadChildren: () => import('./pages/cache/cache.module').then( m => m.CachePageModule)
  },
  {
    path: 'preferiti',
    loadChildren: () => import('./pages/preferiti/preferiti.module').then( m => m.PreferitiPageModule)
  },
  {
    path: 'classifica',
    loadChildren: () => import('./pages/classifica/classifica.module').then( m => m.ClassificaPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
