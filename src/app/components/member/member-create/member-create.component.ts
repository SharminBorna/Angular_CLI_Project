import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Designation } from '../../../models/designation';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-member-create',
    templateUrl: './member-create.component.html',
    styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
    picFile!: File;
    member: Member = new Member();
    memberForm: FormGroup = new FormGroup({
        memberName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        designationId: new FormControl('', Validators.required),
        joiningDate: new FormControl(undefined, Validators.required),
        gender: new FormControl('Male', Validators.required),
        picture: new FormControl(undefined, Validators.required)
    });
    designation: Designation[] = [];
    get f() {
        return this.memberForm.controls;
    }
    onChange(event: any) {
        this.picFile = event.target.files[0];
    }
    insert(): void {
        if (this.memberForm.invalid) return;
        console.log(this.memberForm.value);

        Object.assign(this.member, this.memberForm.value);
        console.log(this.member);
        this.member.picture = 'no-pic.jpg';
        this.member.memberName = this.f.memberName.value
        this.member.designationId = this.f.designationId.value
        this.member.joiningDate = this.f.joiningDate.value
        this.member.joiningDate = new Date(<string>this.datePipe.transform(this.member.joiningDate, "yyyy-MM-dd"));
        this.member.gender = this.f.gender.value
        this.dataSvc.postMember(this.member)
            .subscribe(m => {
                this.upload(Number(m.memberId));
            }, err => {
                this.notifySvc.fail("Failed to save data!!", "DISMISS");
            });
    }
    upload(id: number) {
        let reader = new FileReader();
        reader.addEventListener("load", (event: any) => {
            this.dataSvc.upload(id, this.picFile)
                .subscribe(r => {
                    this.member.picture = r.imagePath;
                    this.notifySvc.success("Data save successfully!!", "DISMISS");
                    this.memberForm.reset({});
                }, err => {
                    this.notifySvc.fail("Failed to upload image!!", "DISMISS");
                })
        })
        reader.readAsDataURL(this.picFile);
    }
    constructor(
        private dataSvc: DataService,
        private notifySvc: NotifyService,
        private datePipe: DatePipe
    ) { }

    ngOnInit(): void {
        this.dataSvc.getDesi()
            .subscribe(r => {
                this.designation = r;
            }, err => {
                this.notifySvc.fail("Failed to load designation!", "DISMISS");
            })
    }

}
