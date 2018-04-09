/**
 * Nahid
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import * as styledComponent from 'styled-components';
import { IEmployeeStore } from 'src/storage/employeeStore';
import { observable } from 'mobx';

const { default: styled } = styledComponent;

const Container = styled.div`
    border: 1px solid #ccc;
    padding: 8px 16px;
`;

const Column = styled.span`
    padding: 4px 8px;
    display: inline-block;
`;

export interface IEmployeeCardProps {
    employeeStore: IEmployeeStore;
    onUpdateEmployee: (
        id: string,
        firstName: string,
        lastName: string,
        phone: string
    ) => void;
    onRemoveEmployee: (id: string) => void;
}

@observer
export class EmployeeCard extends React.Component<IEmployeeCardProps> {
    public render() {
        const {
            employeeStore: { firstName, lastName, phone }
        } = this.props;
        return (
            <Container>
                {this._isEdit ? (
                    <div>
                        <Column>
                            <input
                                defaultValue={firstName}
                                onChange={this._onFirstNameChange}
                            />
                        </Column>
                        <Column>
                            <input
                                defaultValue={lastName}
                                onChange={this._onLastNameChange}
                            />
                        </Column>
                        <Column>
                            <input value={phone} />
                        </Column>
                        <Column>
                            <input
                                type="button"
                                value="Save"
                                onClick={this._onSaveClick}
                            />
                        </Column>
                    </div>
                ) : (
                    <div>
                        <Column>{firstName}</Column>
                        <Column>{lastName}</Column>
                        <Column>{phone}</Column>
                        <Column>
                            <input
                                type="button"
                                value="Edit"
                                onClick={this._onEditClick}
                            />
                        </Column>
                        <Column>
                            <input
                                type="button"
                                value="Delete"
                                onClick={this._onRemoveEmployee}
                            />
                        </Column>
                    </div>
                )}
            </Container>
        );
    }

    @observable private _isEdit: boolean = false;
    @observable
    private _fName: string = this.props.employeeStore.firstName;
    @observable private _lName: string = this.props.employeeStore.lastName;
    @observable private _phone: string = this.props.employeeStore.phone;

    private _onFirstNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        this._fName = e.target.value;
    };

    private _onLastNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        this._lName = e.target.value;
    };

    private _onEditClick = (_e: React.MouseEvent<HTMLInputElement>) => {
        this._isEdit = true;
    };

    private _onSaveClick = (_e: React.MouseEvent<HTMLInputElement>) => {
        this._isEdit = false;
        const { employeeStore: { id }, onUpdateEmployee } = this.props;
        onUpdateEmployee(id, this._fName, this._lName, this._phone);
    };

    private _onRemoveEmployee = () => {
        if (confirm('Are you sure you want to delete this employee')) {
            this.props.onRemoveEmployee(this.props.employeeStore.id);
        }
    };
}
