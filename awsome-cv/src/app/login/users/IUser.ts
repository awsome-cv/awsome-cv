import { Property } from "./IProperties";
export class User {
  /**
   * @public name:string
   * @public password:string
   * @public email:string
   * @method addProperty(property: Property): User
   * @method changeProperty(property: Property): boolean
   */
  name: string;
  password: string;
  email: string;

  /**
   * @description this.name, this.password, this.email
   * @param ...args: string[] {[this.name, this.password, this.email]}
   */
  constructor(...args: string[]) {
    this.name = "";
    this.password = "";
    this.email = "";
    let receiveInputs = [this.name, this.password, this.email];
    for (let i in args) {
      receiveInputs[i] = args[i];
    }
  }
  /**
   * @description 添加一个User的属性
   * @param property: Property
   * @returns User
   */
  addProperty(property: Property): User {
    this[property.name] = property.value;
    return this;
  }
  /**
   * @description 改变一个User的属性
   * @param property: Property
   * @returns boolean
   */
  changeProperty(property: Property): boolean {
    if (this[property.name] == undefined) {
      return false;
    } else {
      this[property.name] = property.value;
      return true;
    }
  }
}
