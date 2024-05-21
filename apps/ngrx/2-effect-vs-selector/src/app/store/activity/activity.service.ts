import { Injectable } from '@angular/core';
import { map, timer } from 'rxjs';
import { activities } from './activity.model';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  fetchActivities = () => timer(500).pipe(map(() => activities));
}
