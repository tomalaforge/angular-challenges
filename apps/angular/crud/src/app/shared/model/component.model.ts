import { HttpErrorResponse } from "@angular/common/http";

export type ComponentFeature = IsLoadingFeature & ErrorFeature;

export interface IsLoadingFeature {
  isLoading: boolean;
}

export interface ErrorFeature {
  error: HttpErrorResponse | null;
}