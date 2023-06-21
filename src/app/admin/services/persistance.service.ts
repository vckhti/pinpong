import {Injectable} from '@angular/core'

@Injectable()
export class PersistanceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  delete() {
    localStorage.removeItem('admin-exp');
    localStorage.removeItem('token');
  }

  get(key: string): any {
    try {
      let str: string | null;
      str = localStorage.getItem(key);
      if (str) {
        return JSON.parse(str);
      }
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

}
