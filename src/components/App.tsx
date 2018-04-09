/**
 * Nahid
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import * as styledComponent from 'styled-components';
import { observable, action } from 'mobx';
import { IDataStore } from 'src/storage/dataStore';
import { CompanyView } from 'src/components/CompanyView';
import { AddEmployee } from 'src/components/AddEmployee';
import { EmployeeStore } from 'src/storage/employeeStore';

const { default: styled } = styledComponent;

const Container = styled.div`
    border: 1px solid #ccc;
    padding: 8px 16px;
`;

const LinkButton = styled.input`
    color: blue;
    type: button;
    border: 0px;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
        color: gray;
    }
`;

export interface IAppProps {
    dataStore: IDataStore;
}

@observer
export class App extends React.Component<IAppProps> {
    public render() {
        const { companyStore, companyAction } = this.props.dataStore;
        return (
            <Container>
                <LinkButton
                    type="button"
                    value="Add new Employee"
                    onClick={this._onButtonAddNewEmployeeClick}
                />

                {this._isAddEmployeeVisible && (
                    <AddEmployee
                        onDismiss={this._onDismissAddDialog}
                        onAddNewEmployee={this._onAddNewEmployee}
                    />
                )}
                <CompanyView
                    companyStore={companyStore}
                    companyAction={companyAction}
                />
            </Container>
        );
    }

    @observable private _isAddEmployeeVisible: boolean = false;

    private _onButtonAddNewEmployeeClick = (
        e: React.MouseEvent<HTMLInputElement>
    ) => {
        // tslint:disable-next-line:no-console
        console.log(e);
        this._isAddEmployeeVisible = true;
    };

    private _onAddNewEmployee = (
        fName: string,
        lName: string,
        phone: string = '3233260372'
    ) => {
        const { dataStore: { companyAction } } = this.props;
        companyAction.addEmployee(
            new EmployeeStore('', fName, lName, phone)
        );
        this._isAddEmployeeVisible = false;
    };

    @action
    private _onDismissAddDialog = () =>
        (this._isAddEmployeeVisible = false);
}
