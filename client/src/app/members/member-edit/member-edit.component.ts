import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm") editForm: NgForm;
  member: Member;
  user: User;
  // this will give notification if you want to leave the website
  @HostListener("window:beforeunload", ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) { 
    // currentUser$ is an observable, in order to take it out to use we need .pipe(take(1)).subscribe
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    // this.memberService.getMember(this.user.username).pipe(take(1)).subscribe(member => this.member = member);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => this.member = member);
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success("Profile update successfully");
      this.editForm.reset(this.member);  // the input parameter 'this.member' is used to preserve the member value not being reset
    })
  }
  
}
