import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Designation } from '../models/designation';
import { Member } from '../models/member';
import { ImagePathResponse } from '../models/image-path-response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    getDesi(): Observable<Designation[]> {
        return this.http.get<Designation[]>("http://localhost:55080/api/Designations");
    }
    getDesiById(id: number): Observable<Designation> {
        return this.http.get<Designation>(`http://localhost:55080/api/Designations/${id}`);
    }
    postDesi(data: Designation): Observable<Designation> {
        return this.http.post<Designation>('http://localhost:55080/api/Designations', data);
    }
    putDesi(data: Designation): Observable<any> {
        return this.http.put<Designation>(`http://localhost:55080/api/Designations/${data.designationId}`, data);
    }
    deleteDesi(id: number): Observable<Designation> {
        return this.http.delete<Designation>(`http://localhost:55080/api/Designations/${id}`);
    }


    getMembers(): Observable<Member[]> {
        return this.http.get<Member[]>("http://localhost:55080/api/Members");
    }
    getMemberById(id: number): Observable<Member> {
        return this.http.get<Member>(`http://localhost:55080/api/Members/${id}`);
    }
    postMember(data: Member): Observable<Member> {
        return this.http.post<Member>('http://localhost:55080/api/Members', data);
    }
    putMember(data: Member): Observable<any> {
        return this.http.put<Member>(`http://localhost:55080/api/Members/${data.memberId}`, data);
    }
    deleteMember(id: number): Observable<Member> {
        return this.http.delete<Member>(`http://localhost:55080/api/Members/${id}`);
    }

    upload(id: number, f: File): Observable<ImagePathResponse> {
        const formData = new FormData();
        formData.append('file', f);
        return this.http.post<ImagePathResponse>(`http://localhost:55080/api/Members/Uploads/${id}`, formData);
    }
}
