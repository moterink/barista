/**
 * @license
 * Copyright 2022 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CommonModule, ViewportScroller } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Router, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BaErrorPage } from '../pages/error-page/error-page';

export const baristaRoutes: Route[] = [
  // We need to add the path to index here since the routes are used for ssr
  // and if index is called and not redirected we end up with an empty prerendered page for the
  // homepage
  {
    path: 'index',
    redirectTo: '',
  },
  {
    path: 'content',
    loadChildren: () =>
      import('../pages/overview-page/overview-page.module').then(
        (module) => module.BaOverviewPageModule,
      ),
  },
  {
    path: 'resources',
    loadChildren: () =>
      import('../pages/overview-page/overview-page.module').then(
        (module) => module.BaOverviewPageModule,
      ),
  },
  {
    path: 'guidelines',
    loadChildren: () =>
      import('../pages/overview-page/overview-page.module').then(
        (module) => module.BaOverviewPageModule,
      ),
  },
  {
    path: 'guidelines/ux-decision-graph',
    loadChildren: () =>
      import('../pages/decision-graph-page/decision-graph-page.module').then(
        (module) => module.DecisionGraphPageModule,
      ),
  },
  {
    path: 'components',
    loadChildren: () =>
      import('../pages/overview-page/overview-page.module').then(
        (module) => module.BaOverviewPageModule,
      ),
  },
  {
    path: 'patterns',
    loadChildren: () =>
      import('../pages/overview-page/overview-page.module').then(
        (module) => module.BaOverviewPageModule,
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('../pages/index-page/index-page.module').then(
        (module) => module.BaIndexPageModule,
      ),
  },
  { path: 'not-found', component: BaErrorPage },
  {
    path: '**',
    loadChildren: () =>
      import('../pages/single-page/single-page.module').then(
        (module) => module.BaSinglePageModule,
      ),
  },
];

@NgModule({
  declarations: [BaErrorPage],
  imports: [
    CommonModule,
    RouterModule.forRoot(baristaRoutes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      paramsInheritanceStrategy: 'always',
      enableTracing: false, // Can be set for debugging the router
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class BaRoutingModule {
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {
    // A workaround due to an issue with scrolling on navigation as stated here:
    // https://github.com/angular/angular/issues/24547
    this.router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .subscribe((e) => {
        if (e.anchor !== null) {
          // Navigate to an anchor if it exists after a delay
          setTimeout(() => {
            viewportScroller.scrollToAnchor(e.anchor!);
          }, 500);
        }
      });
  }
}
