/**
 * Nahid
 */

import { ICompanyStore } from 'src/storage/companyStore';
import { ICompanyAction } from 'src/action/companyAction';

export interface IDataStore {
    readonly companyStore: ICompanyStore;
    readonly companyAction: ICompanyAction;
}

export class DataStore implements IDataStore {
    constructor(companyStore: ICompanyStore, companyAction: ICompanyAction) {
        this.companyStore = companyStore;
        this.companyAction = companyAction;
    }
    public companyStore: ICompanyStore;
    public companyAction: ICompanyAction;
}
