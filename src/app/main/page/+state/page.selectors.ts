import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../../core/store/app.reducer';
import { EntitySelectorService } from '../../../core/store/app.selectors';

import { Observable, of, combineLatest } from 'rxjs';
import {
  bufferTime,
  distinctUntilChanged,
  shareReplay,
  mergeMap,
  filter,
  switchMap,
  map,
} from 'rxjs/operators';
import { User } from '../../../core/store/user/user.model';

// Long Term Goal
import { LongTermGoal } from '../../../core/store/long-term-goal/long-term-goal.model';

@Injectable({
  providedIn: 'root',
})
export class PageSelectors {
  constructor(private slRx: EntitySelectorService) {}

  /** Release memoized selectors. */
  cleanup(cId: string) {
    this.slRx.release(cId);
  }

  // Selector function that selects data and sends it to the components
  selectLongTermData(containerId: string) {
    return this.slRx.selectLongTermGoal('ltg', containerId);
  }
}
