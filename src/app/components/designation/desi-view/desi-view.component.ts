import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Designation } from '../../../models/designation';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { NotifyService } from '../../../services/notify.service';


@Component({
    selector: 'app-desi-view',
    templateUrl: './desi-view.component.html',
    styleUrls: ['./desi-view.component.css']
})
export class DesiViewComponent implements OnInit {
    designation: Designation[] = [];
    dataSource: MatTableDataSource<Designation> = new MatTableDataSource(this.designation);
    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    columnList: string[] = ["name", "actions"]

    constructor(
        private dataSvc: DataService,
        private dialog: MatDialog,
        private notifySvc: NotifyService
    ) { }

    ngOnInit(): void {
        this.dataSvc.getDesi().subscribe(x => {
            this.designation = x;
            console.log(x);
            this.dataSource.data = this.designation;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    confirmDelete(item: Designation) {
        this.dialog.open(ConfirmDialogComponent, {
            width: '450px'
        }).afterClosed().subscribe(r => {
            if (r) this.dataSvc.deleteDesi(Number(item.designationId))
                .subscribe(x => {
                    this.notifySvc.success("Data Deleted Successfully!!", "DISMISS");
                    this.dataSource.data = this.dataSource.data.filter(d => d.designationId != x.designationId);
                }, err => {
                    this.notifySvc.fail("Failed to Delete Data!!", "DISMISS");
                });
        })
    }
}
