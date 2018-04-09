/**
 * Nahid
 */
import { observable } from 'mobx';
import { Employee } from 'src/commons';

export interface IEmployeeStore {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly phone: string;
}

export class EmployeeStore implements IEmployeeStore {
    constructor(
        id: string,
        firstName: string,
        lastName: string,
        phone: string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }

    public id: string = '';
    @observable public firstName: string = '';
    @observable public lastName: string = '';
    @observable public phone: string = '';
}

export const createEmployeeStore = (
    employee: Employee
): IEmployeeStore => {
    return new EmployeeStore(
        employee._id,
        employee.firstName,
        employee.lastName,
        employee.phone
    );
};
