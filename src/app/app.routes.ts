import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {GameScreenComponent} from "./components/game-screen/game-screen.component";

export const routes: Routes = [
  {
    path: '',
    component: GameScreenComponent,
  },
  { path: '**', component: PageNotFoundComponent },
]
