import { Injectable } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { BaseDataAccessStore } from './_lib/base-service-data-access-store';

@Injectable()
export class TeacherStore extends BaseDataAccessStore<Teacher> {}
