/**
 * Nahid
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import * as styledComponent from 'styled-components';
import { ICompanyStore } from 'src/storage/companyStore';
import { EmployeeCard } from 'src/components/EmployeeCard';
import { ICompanyAction } from 'src/action/companyAction';

const { default: styled } = styledComponent;

const Header = styled.h4`
    color: DimGray;
    margin-bottom: 10px;
    padding-left: 5px;
`;

const Border = styled.div`
    border-radius: 5px;
    border: 0.5px solid LightGray;
`;

const Row = styled.div`
    background: White;
    &:nth-child(2n) {
        background: WhiteSmoke;
    }
`;

export interface ICompanyViewProps {
    companyStore: ICompanyStore;
    companyAction: ICompanyAction;
}

@observer
export class CompanyView extends React.Component<ICompanyViewProps> {
    public render() {
        const { companyStore: { employeeStores }, companyAction: { updateEmployee, removeEmployee } } = this.props;
        return (
            <div>
                <Header>Current Employees</Header>

                <Border>
                    {employeeStores.map(t => (
                        <Row key={t.id}>
                            <EmployeeCard
                                key={t.id}
                                employeeStore={t}
                                onUpdateEmployee={updateEmployee}
                                onRemoveEmployee={removeEmployee}
                            />
                        </Row>
                    ))}
                </Border>
            </div>
        );
    }
}
