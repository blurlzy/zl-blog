import { ErrorHandler, inject, Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly snackbar = inject(SnackbarService);

  handleError(error: unknown): void {
    const message = this.extractMessage(error);
    this.snackbar.error(message);
    // preserve the original error in the console for debugging
    console.error(error);
  }

  private extractMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message || 'An unexpected error occurred.';
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unexpected error occurred.';
  }
}
