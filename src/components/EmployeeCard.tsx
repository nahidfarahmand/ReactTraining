/**
 * Nahid
 */

import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as styledComponent from 'styled-components';
import { IEmployeeStore } from 'src/storage/employeeStore';
import * as FontAwesome from 'react-fontawesome';

const { default: styled } = styledComponent;

const Container = styled.div`
    padding: 8px 16px;
    color: DimGray;
`;

const Column = styled.span`
    padding: 4px 8px;
    display: inline-block;
    width: 100px;
`;

const ButtonColumn = styled.span`
    padding: 4px 8px;
    display: inline-block;
    width: 30px;
`;

const TextBox = styled.input`
    width: 100px;
`;

const Button = styled.button`
    border: 0px;
    display: flex;
    padding: 2px;
    cursor: pointer;
    text-align: center;
    border: 1px solid LightGray;
    border-radius: 5px;
`;

export interface IEmployeeCardProps {
    employeeStore: IEmployeeStore;
    onUpdateEmployee: (id: string, firstName: string, lastName: string, phone: string) => void;
    onRemoveEmployee: (id: string) => void;
}

@observer
export class EmployeeCard extends React.Component<IEmployeeCardProps> {
    public render() {
        const { employeeStore: { firstName, lastName, phone } } = this.props;
        return (
            <Container>
                {this._isEdit ? (
                    <div>
                        <Column>
                            <TextBox defaultValue={firstName} onChange={this._onFirstNameChange} />
                        </Column>
                        <Column>
                            <TextBox defaultValue={lastName} onChange={this._onLastNameChange} />
                        </Column>
                        <Column>
                            <TextBox value={phone} />
                        </Column>
                        <ButtonColumn>
                            <Button disabled={this._saveDisabled} onClick={this._onSaveClick}>
                                <FontAwesome name="save" />
                            </Button>
                        </ButtonColumn>
                        <ButtonColumn>
                            <Button onClick={this._onCancelClick}>
                                <FontAwesome name="times" />
                            </Button>
                        </ButtonColumn>
                    </div>
                ) : (
                    <div>
                        <Column>{firstName}</Column>
                        <Column>{lastName}</Column>
                        <Column>{phone}</Column>
                        <ButtonColumn>
                            <Button onClick={this._onEditClick}>
                                <FontAwesome name="edit" />
                            </Button>
                        </ButtonColumn>
                        <ButtonColumn>
                            <Button onClick={this._onRemoveEmployee}>
                                <FontAwesome name="trash" />
                            </Button>
                        </ButtonColumn>
                    </div>
                )}
            </Container>
        );
    }

    @observable private _isEdit: boolean = false;
    @observable private _fName: string = this.props.employeeStore.firstName;
    @observable private _lName: string = this.props.employeeStore.lastName;
    @observable private _phone: string = this.props.employeeStore.phone;
    @observable private _saveDisabled: boolean = true;

    private _onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this._fName = e.target.value;
        this._saveDisabled = false;
    };

    private _onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this._lName = e.target.value;
        this._saveDisabled = false;
    };

    private _onEditClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
        this._isEdit = true;
    };

    private _onSaveClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
        this._isEdit = false;
        const { employeeStore: { id }, onUpdateEmployee } = this.props;
        onUpdateEmployee(id, this._fName, this._lName, this._phone);
    };

    private _onRemoveEmployee = () => {
        if (confirm('Are you sure you want to delete this employee')) {
            this.props.onRemoveEmployee(this.props.employeeStore.id);
        }
    };

    private _onCancelClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
        this._isEdit = false;
    };
}
