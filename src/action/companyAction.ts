/**
 * Nahid
 */

import { action } from 'mobx';
import { ICompanyStore } from 'src/storage/companyStore';
import {
    IEmployeeStore,
    createEmployeeStore
} from 'src/storage/employeeStore';
import {
    IEmployeeService,
    EmployeeService
} from 'src/service/employeeService';

export interface ICompanyAction {
    readonly employeeService: IEmployeeService;
    readonly companyStore: ICompanyStore;
    addEmployee(employee: IEmployeeStore): void;
    updateEmployee(
        id: string,
        firstName: string,
        lastName: string,
        phone: string
    ): void;
    removeEmployee(id: string): void;
}

export class CompanyAction implements ICompanyAction {
    constructor(companyStore: ICompanyStore) {
        this.companyStore = companyStore;
        this.employeeService = new EmployeeService();
        this.loadEmployees();
    }

    public companyStore: ICompanyStore;
    public employeeService: IEmployeeService;

    @action.bound
    public async addEmployee(employee: IEmployeeStore) {
        const newEmployee = await this.employeeService.addEmployee(
            employee
        );
        this.companyStore.employeeStores.push(
            createEmployeeStore(newEmployee)
        );
    }
    @action.bound
    public async updateEmployee(
        id: string,
        firstName: string,
        lastName: string,
        phone: string
    ) {
        const employee = { id, firstName, lastName, phone };
        const updatedEmployee = await this.employeeService.updateEmployee(
            employee
        );

        const updatedIndex = this.companyStore.employeeStores
            .map(es => es.id)
            .indexOf(id);

        this.companyStore.employeeStores[
            updatedIndex
        ] = createEmployeeStore(updatedEmployee);
    }

    @action.bound
    public async loadEmployees() {
        const employees = await this.employeeService.getEmployees();

        employees
            .map(createEmployeeStore)
            .forEach(es => this.companyStore.employeeStores.push(es));
    }

    @action.bound
    public async removeEmployee(id: string) {
        await this.employeeService.deleteEmployee(id);
        const idx = this.companyStore.employeeStores
            .map(e => e.id)
            .indexOf(id);
        if (idx > -1) {
            this.companyStore.employeeStores.splice(idx, 1);
        }
    }
}
