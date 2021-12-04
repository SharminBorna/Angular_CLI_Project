import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Designation } from '../../../models/designation';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-member-edit',
    templateUrl: './member-edit.component.html',
    styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

    picFile!: File;
    member!: Member;
    memberForm: FormGroup = new FormGroup({
        memberName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        designationId: new FormControl('', Validators.required),
        joiningDate: new FormControl(undefined, Validators.required),
        gender: new FormControl('Male', Validators.required),
        picture: new FormControl(undefined, Validators.required)
    });
    designation: Designation[] = [];
    constructor(
        private dataSvc: DataService,
        private notifySvc: NotifyService,
        private datePipe: DatePipe,
        private actvatedRoute: ActivatedRoute
    ) { }
    get f() {
        return this.memberForm.controls;
    }
    onChange(event: any) {
        this.picFile = event.target.files[0];
    }
    update(): void {
        if (this.memberForm.invalid) return;
        console.log(this.memberForm.value);

        this.member.memberName = this.f.memberName.value
        this.member.designationId = this.f.designationId.value
        this.member.joiningDate = this.f.joiningDate.value
        this.member.joiningDate = new Date(<string>this.datePipe.transform(this.member.joiningDate, "yyyy-MM-dd"));
        this.member.gender = this.f.gender.value

        console.log(this.member);

        this.dataSvc.putMember(this.member)
            .subscribe(m => {
                if (this.picFile != null && this.member.memberId) {
                    this.upload(Number(this.member.memberId))
                }
                else {
                    this.notifySvc.fail("Data Updated Successfully!!", "DISMISS");
                }
            }, err => {
                this.notifySvc.fail("Failed to Updated Data!!", "DISMISS");
            });
    }
    upload(id: number): void {
        let reader = new FileReader();
        reader.addEventListener("load", (event: any) => {
            this.dataSvc.upload(id, this.picFile)
                .subscribe(r => {
                    this.member.picture = r.imagePath;
                    this.notifySvc.success("Data save successfully!!", "DISMISS");
                }, err => {
                    this.notifySvc.fail("Failed to upload image!!", "DISMISS");
                })
        })
        reader.readAsDataURL(this.picFile);
    }
    ngOnInit(): void {
        let id: number = this.actvatedRoute.snapshot.params.id;
        this.dataSvc.getMemberById(id).
            subscribe(r => {
                this.member = r;
                this.memberForm.patchValue(this.member);
            }, err => {
                this.notifySvc.fail("Failed to load data!!", "DISMISS");
            })
        this.dataSvc.getDesi()
            .subscribe(d => {
                this.designation = d;
            }, err => {
                this.notifySvc.fail("Failed to load data!!", "DISMISS");
            });
    }

}
