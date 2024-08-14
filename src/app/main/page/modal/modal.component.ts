import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
//import { UpdateLongTermGoalSuccess } from 'src/app/core/store/long-term-goal/long-term-goal.actions';
import { ModalAnimations } from './modal.animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LongTermGoal } from '../../../core/store/long-term-goal/long-term-goal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: ModalAnimations,
})
export class ModalComponent implements OnInit {
  // --------------- INPUTS AND OUTPUTS ------------------

  // --------------- LOCAL AND GLOBAL STATE --------------

  // --------------- DATA BINDING ------------------------

  // --------------- EVENT BINDING -----------------------

  // --------------- HELPER FUNCTIONS AND OTHER ----------

  longtermgoal: LongTermGoal = {
    __id: '',
    __userId: '',
    oneYear: '',
    fiveYear: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      longTermData: LongTermGoal;
      UpdateGoals: (longtermgoal: LongTermGoal) => void;
    },
    // private dialog: MatDialogRef<ModalComponent>
    private dialogRef: MatDialogRef<ModalComponent>
  ) {}

  ngOnInit(): void {
    this.longtermgoal.__id = this.data.longTermData.__id;
    this.longtermgoal.__userId = this.data.longTermData.__userId;
    this.longtermgoal.oneYear = this.data.longTermData.oneYear;
    this.longtermgoal.fiveYear = this.data.longTermData.fiveYear;
  }

  // Method to close the modal
  closeModal(): void {
    this.dialogRef.close();
  }
}
