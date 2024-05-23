import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { STORAGE_KEYS } from '../../../_shared/constants';
import { tap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const reqClone = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
  return next(reqClone).pipe(tap(() => console.log('intercepted')));
};
