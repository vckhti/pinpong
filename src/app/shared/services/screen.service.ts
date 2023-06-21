import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class ScreenService {
    private screenWidthSubject = new BehaviorSubject<number>(window.innerWidth);

    constructor() {
        try {
            window.addEventListener('resize', (event) => {
              this.onResize()
            });
        } catch (e) {
             console.error(e);
        }
    }
    onResize(): void {
        this.screenWidthSubject.next(window.innerWidth);
    }

    getScreenWidth(): Observable<number> {
      return this.screenWidthSubject.asObservable();
    }

}
