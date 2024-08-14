import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../core/store/app.reducer';
import * as fromAuth from '../../core/store/auth/auth.reducer';
import { PageAnimations } from './page.animations';
import { FirebaseService } from '../../core/firebase/firebase.service';
import {
  tap,
  filter,
  withLatestFrom,
  take,
  takeUntil,
  map,
  subscribeOn,
} from 'rxjs/operators';
import {
  distinctUntilChanged,
  interval,
  Observable,
  Subject,
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
import { User } from '../../core/store/user/user.model';
import { PageSelectors } from './+state/page.selectors';
import { LoadData, Cleanup } from './+state/page.actions';
import { ActionFlow, RouterNavigate } from '../../core/store/app.actions';
import { UpdateUser } from '../../core/store/user/user.actions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

// importing the Long Term Goal
import { LongTermGoal } from '../../core/store/long-term-goal/long-term-goal.model';
import { UpdateLongTermGoal } from '../../core/store/long-term-goal/long-term-goal.actions';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: PageAnimations,
})
export class PageComponent implements OnInit {
  // --------------- ROUTE PARAMS & CURRENT USER ---------

  // --------------- LOCAL AND GLOBAL STATE --------------
  dialogRef: MatDialogRef<any>;

  // --------------- DB ENTITY DATA ----------------------

  /** Container id for selectors and loading. */
  containerId: string = this.db.createId();

  // --------------- DATA BINDING ------------------------

  // calling the selector function in order to get the Long Term Goal data
  longTermData$: Observable<LongTermGoal> = this.selectors.selectLongTermData(
    this.containerId
  );

  // --------------- EVENT BINDING -----------------------

  // Event for opening the edit modal
  openEditModal$: Subject<void> = new Subject();

  // --------------- HELPER FUNCTIONS AND OTHER ----------

  /** Unsubscribe observable for subscriptions. */
  unsubscribe$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private selectors: PageSelectors,
    private store: Store<fromStore.State>,
    private db: FirebaseService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // --------------- EVENT HANDLING ----------------------

    this.longTermData$.subscribe((LongTermGoal) => {
      console.log(LongTermGoal);
      // Printing to the console to check if program is doing what its's intended to do
      console.log('Grabs data from database and prints to console');
    });

    /** Handle openEditModal events. */
    // continue working on this
    this.openEditModal$
      .pipe(withLatestFrom(this.longTermData$), takeUntil(this.unsubscribe$))
      .subscribe(([_, longTermData]) => {
        console.log(longTermData, 'printing');
        this.dialogRef = this.dialog.open(ModalComponent, {
          height: '366px',
          width: '100%',
          maxWidth: '500px',
          data: {
            longTermData: longTermData,
            UpdateGoals: (longtermgoal: LongTermGoal) => {
              this.store.dispatch(
                new UpdateLongTermGoal(
                  longtermgoal.__id,
                  {
                    oneYear: longtermgoal.oneYear,
                    fiveYear: longtermgoal.fiveYear,
                  },
                  this.containerId
                )
              );
              console.log(longtermgoal);
            },
          },
        });
      });

    // --------------- LOAD DATA ---------------------------
    // Once everything is set up, load the data for the role.
    this.store.dispatch(new LoadData(this.containerId));
  }

  ngOnDestroy() {
    // Unsubscribe subscriptions.
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    // Unsubscribe from firebase connection from load and free up memoized selector values.
    this.store.dispatch(new Cleanup(this.containerId));
    this.selectors.cleanup(this.containerId);
  }
}
