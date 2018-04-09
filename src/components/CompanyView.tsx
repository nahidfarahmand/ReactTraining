/**
 * Nahid
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import { ICompanyStore } from 'src/storage/companyStore';
import { EmployeeCard } from 'src/components/EmployeeCard';
import { ICompanyAction } from 'src/action/companyAction';

export interface ICompanyViewProps {
    companyStore: ICompanyStore;
    companyAction: ICompanyAction;
}

@observer
export class CompanyView extends React.Component<ICompanyViewProps> {
    public render() {
        const {
            companyStore: { employeeStores },
            companyAction: { updateEmployee, removeEmployee }
        } = this.props;
        return (
            <div>
                <h1>List of Employees</h1>
                {employeeStores.map(t => (
                    <EmployeeCard
                        key={t.id}
                        employeeStore={t}
                        onUpdateEmployee={updateEmployee}
                        onRemoveEmployee={removeEmployee}
                    />
                ))}
            </div>
        );
    }
}
