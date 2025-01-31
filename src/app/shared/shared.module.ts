import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// External Modules
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

// Containers

// Components

// Pipes

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // External Modules
    MatSnackBarModule,
    MatDialogModule,
  ],
  declarations: [
    // Containers
    // Components
    // Pipes
  ],
  exports: [
    RouterModule,
    FormsModule,
    // External Modules
    MatSnackBarModule,
    // Containers
    // Components
    // Pipes
  ],
})
export class SharedModule {}
