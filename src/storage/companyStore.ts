/**
 * Nahid
 */

import { observable } from 'mobx';
import { IEmployeeStore } from 'src/storage/employeeStore';

export interface ICompanyStore {
    readonly employeeStores: IEmployeeStore[];
}

export class CompanyStore implements ICompanyStore {
    @observable public employeeStores: IEmployeeStore[] = [];
}
