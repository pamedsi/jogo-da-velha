import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {GameScreenComponent} from "./components/game-screen/game-screen.component";
import {FullSessionComponent} from "./components/full-session/full-session.component";

export const routes: Routes = [
  {
    path: '',
    component: GameScreenComponent,
  },
  {
    path: 'error',
    component: FullSessionComponent,
  },
  { path: '**', component: PageNotFoundComponent },
]
