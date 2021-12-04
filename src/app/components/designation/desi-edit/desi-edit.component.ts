import { Component, OnInit } from '@angular/core';
import { Designation } from '../../../models/designation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-desi-edit',
    templateUrl: './desi-edit.component.html',
    styleUrls: ['./desi-edit.component.css']
})
export class DesiEditComponent implements OnInit {
    designation!: Designation;
    desiForm: FormGroup = new FormGroup({
        desiName: new FormControl('', Validators.required)
    });
    constructor(
        private dataSvc: DataService,
        private notifySvc: NotifyService,
        private activatedRoute: ActivatedRoute
    ) { }
    get f() {
        return this.desiForm.controls;
    }
    update() {
        if (this.desiForm.invalid) return;
        this.designation.desiName = this.f.desiName.value;
        this.dataSvc.putDesi(this.designation)
            .subscribe(r => {
                this.notifySvc.success("Data Updated Successfully!!", "DISMISS");
            }, err => {
                this.notifySvc.fail("Failed to Update Data!!", "DISMISS");
            });
    }
    ngOnInit(): void {
        let id: number = this.activatedRoute.snapshot.params.id;
        this.dataSvc.getDesiById(id)
            .subscribe(x => {
                this.designation = x;
                this.desiForm.patchValue(this.designation);
            }, err => {
                this.notifySvc.fail("Failed to load data!!", "DISMISS");
            });
    }

}
