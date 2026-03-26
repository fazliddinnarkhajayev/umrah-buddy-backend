import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { PaginatedResult, PaginationMeta } from '../interfaces/pagination.interface';

interface BaseResponse<T> {
  success: boolean;
  data: T;
}

interface PaginatedResponse<T> extends BaseResponse<T[]> {
  meta: PaginationMeta;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T> | PaginatedResponse<T>> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse<T> | PaginatedResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof PaginatedResult) {
          return {
            success: true,
            data: data.items,
            meta: data.meta,
          };
        }

        return { success: true, data };
      }),
    );
  }
}
