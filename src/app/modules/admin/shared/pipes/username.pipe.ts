import {Pipe, PipeTransform} from "@angular/core";
import {UserDescriptionInterface} from "../types/userDescription.interface";

@Pipe({
  name: "username",
  pure: true
})
export class UsernamePipe implements PipeTransform {

  transform(id: number, usersDecriptions: UserDescriptionInterface[]): string {
    if (usersDecriptions && usersDecriptions.length >0) {
      if (id && usersDecriptions && usersDecriptions.length > 0) {
        for (let i = 0; i < usersDecriptions.length; i++) {
          if (usersDecriptions[i].id === id) {
            return usersDecriptions[i].name;
          }
        }
      }
    }
    else {
      return "";
    }
  }

}
