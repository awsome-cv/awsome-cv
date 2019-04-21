import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import * as moment from "moment";
import { User } from "./login/users/IUser";
import { Note } from "./Notes/INote.interface";
import { tap } from "rxjs/operators";
@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  /**
   *
   * @param user User
   */
  login(user: User) {
    return this.http
      .post<any>("https://md-server.wangdongdong.xyz/users/login", user)
      .pipe(
        tap(res => {
          if (res.status == 200) {
            this.setSession(res);
          }
        })
      );
  }
  /**
   *
   * @param user User
   */
  signUp(user: User) {
    return this.http.post<any>(
      "https://md-server.wangdongdong.xyz/users/signup",
      user
    );
  }
  /**
   *
   */
  getAllNotes() {
    return this.http.get<any>(
      `https://md-server.wangdongdong.xyz/notes/${localStorage.getItem("_id")}`,
      {
        headers: {
          Pragma: "no-cache",
          Expires: "-1",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("id_token")
        }
      }
    );
  }
  /**
   *
   * @param note Note
   */
  getOneNote(note: Note) {
    return this.http.get<any>(
      `https://md-server.wangdongdong.xyz/notes/getone/${note._id}`,
      {
        headers: {
          Pragma: "no-cache",
          Expires: "-1",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("id_token")
        }
      }
    );
  }
  creatNote(note: Note) {
    note.owner_id = localStorage.getItem("_id");
    return this.http.post<any>(
      "https://md-server.wangdongdong.xyz/notes/create",
      note,
      {
        headers: {
          Pragma: "no-cache",
          Expires: "-1",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("id_token")
        }
      }
    );
  }
  deletNote(note: Note) {
    return this.http.delete<any>(
      `https://md-server.wangdongdong.xyz/notes/${note._id}`,
      {
        headers: {
          Pragma: "no-cache",
          Expires: "-1",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("id_token")
        }
      }
    );
  }
  putNote(note: Note) {
    return this.http.put<any>(
      `https://md-server.wangdongdong.xyz/notes/edit/${note._id}`,
      note,
      {
        headers: {
          Pragma: "no-cache",
          Expires: "-1",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("id_token")
        }
      }
    );
  }
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, "second");

    localStorage.setItem("id_token", authResult.accessToken);
    localStorage.setItem("_id", authResult._id);
    localStorage.setItem("name", authResult.name);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("name");
    localStorage.removeItem("_id");
    localStorage.removeItem("markdown");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
