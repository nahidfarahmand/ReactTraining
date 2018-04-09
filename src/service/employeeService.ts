/**
 * Nahid
 */

import { Employee } from 'src/commons';
import { IEmployeeStore } from 'src/storage/employeeStore';

const getApi = <T>(url: string): Promise<T> => {
    return fetch(url, { method: 'GET' }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
};

const deleteApi = (url: string, context: Object): Promise<void> => {
    return fetch(buildQuery(url, context), { method: 'DELETE' }).then(
        response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        }
    );
};

const postApi = <T>(url: string, data: T): Promise<T> => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
};

const putApi = <T>(url: string, data: T): Promise<T> => {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
};

const buildQuery = (url: string, context: Object): string => {
    const temp = JSON.parse(JSON.stringify(context));

    return `${url}${Object.keys(context).reduce(
        (prev: string, key: string) => `${prev}/${temp[key]}`,
        ''
    )}`;
};

export interface IEmployeeService {
    getEmployees(): Promise<Employee[]>;
    addEmployee(employee: IEmployeeStore): Promise<Employee>;
    updateEmployee(employee: IEmployeeStore): Promise<Employee>;
    deleteEmployee(id: string): Promise<void>;
}

export class EmployeeService {
    public getEmployees = (): Promise<Employee[]> => {
        return getApi<Employee[]>('/employees');
    };

    public addEmployee = (employee: IEmployeeStore): Promise<Employee> => {
        return postApi<Employee>('/employee', <Employee>employee);
    };

    public updateEmployee = (
        employee: IEmployeeStore
    ): Promise<Employee> => {
        const { id: _id, firstName, lastName, phone } = employee;
        const updatingEmployee = { _id, firstName, lastName, phone };
        return putApi<Employee>('/employee', updatingEmployee);
    };

    public deleteEmployee = (id: string) => {
        return deleteApi('/employee', { id });
    };
}
