import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

// no longer need this when using interceptor
// const httpOptions = {
//   headers: new HttpHeaders ({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("user"))?.token
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers() {
    if (this.members.length > 0) return of(this.members); // 'of' from rxjs returns something observables

    // return this.http.get<Member[]>(this.baseUrl + "users", httpOptions);
    return this.http.get<Member[]>(this.baseUrl + "users").pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(username: string) {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of(member);

    // return this.http.get<Member>(this.baseUrl + "users/" + username, httpOptions);
    return this.http.get<Member>(this.baseUrl + "users/" + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + "users", member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }
}
