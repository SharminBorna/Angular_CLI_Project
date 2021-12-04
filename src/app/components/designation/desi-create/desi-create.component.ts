import { Component, OnInit } from '@angular/core';
import { Designation } from '../../../models/designation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
    selector: 'app-desi-create',
    templateUrl: './desi-create.component.html',
    styleUrls: ['./desi-create.component.css']
})
export class DesiCreateComponent implements OnInit {
    designation: Designation = new Designation();
    desiForm: FormGroup = new FormGroup({
        desiName: new FormControl('', Validators.required)
    });

    constructor(
        private dataSvc: DataService,
        private notifySvc: NotifyService
    ) { }

    get f() {
        return this.desiForm.controls;
    }
    insert() {
        if (this.desiForm.invalid) return;
        this.designation.desiName = this.f.desiName.value;

        this.dataSvc.postDesi(this.designation)
            .subscribe(r => {
                this.notifySvc.success("Data Inserted Successfully!!", "DISMISS");
                this.desiForm.reset({});
                console.log(r);
            }, err => {
                this.notifySvc.fail("Failed to Save Data!!", "DISMISS");
            })
    }
    ngOnInit(): void {
    }

}
