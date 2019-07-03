import { defer, concat, of } from 'rxjs';
import { scan, shareReplay, map, startWith } from 'rxjs/operators';
import * as moment from 'moment';

export const timeSeries = (key: string, maxHours: number) => {
  return source => defer(() => {
    let history;
    try {
      history = JSON.parse(localStorage.getItem(key)).history;
    } catch (err) {
      history = [];
    }

    const sourceWithTimeStamp = source.pipe(
      map(value => [ new Date().getTime(), value ])
    );
    return concat(of(...history), sourceWithTimeStamp).pipe(
      startWith([]),
      scan((accumulator: any[], value) => {
        const cutoffTime = moment(new Date()).subtract(maxHours, 'hours').unix() * 1000;
        let i;
        for (i = 0; i < accumulator.length; i++) {
          if (accumulator[i][0] >= cutoffTime) {
            break;
          }
        }
        accumulator = accumulator.slice(i);
        localStorage.setItem(key, JSON.stringify({ history: accumulator }));

        return [...accumulator, value];
      }),
      shareReplay(1)
    );
  });
};

