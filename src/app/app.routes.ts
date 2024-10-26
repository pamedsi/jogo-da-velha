import { Routes } from '@angular/router';
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {GameScreenComponent} from "./pages/game-screen/game-screen.component";
import {HomeComponent} from "./pages/home/home.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'game',
    component: GameScreenComponent,
  },
  { path: '**', component: NotFoundComponent },
]
