import {Routes} from "@angular/router";

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/table/table.routes').then(m => m.TABLE_ROUTES),
  },
  {
    path: 'ui-kit',
    loadChildren: () => import('./modules/ui-kit/ui-kit.routes').then(m => m.UI_KIT_ROUTES),
  },
];
