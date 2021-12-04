import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { Member } from '../../../models/member';
import { Designation } from '../../../models/designation';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.css']
})
export class MemberViewComponent implements OnInit {

    member: Member[] = [];
    designation: Designation[] = []; 
    dataSource: MatTableDataSource<Member> = new MatTableDataSource(this.member);
    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    columnList: string[] = ["picture", "name", "designation", "joiningDate", "gender", "actions"];
    constructor(
        private dataSvc: DataService,
        private notifySvc: NotifyService,
        private dialog: MatDialog
    ) { }
    confirmDelete(item: Member): void {
        this.dialog.open(ConfirmDialogComponent, {
            width: '450px'
        }).afterClosed().subscribe(r => {
            if (r) this.dataSvc.deleteMember(Number(item.memberId))
                .subscribe(x => {
                    this.notifySvc.success("One Member is Deleted From List!!", "DISMISS");
                    this.dataSource.data = this.dataSource.data.filter(d => d.memberId != x.memberId);
                }, err => {
                    this.notifySvc.fail("Failed to Delete Data From List!!", "DISMISS");
                });
        })
    }
    getDesiName(id: number) {
        let d = this.designation.find(d => d.designationId == id);
        return d ? d.desiName : '';
    }
    ngOnInit(): void {
        this.dataSvc.getMembers()
            .subscribe(r => {
                this.member = r;
                this.dataSource.data = this.member;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }, err => {

            });
        this.dataSvc.getDesi().
            subscribe(x => {
                this.designation = x;
            }, err => {

            });
    }

}
