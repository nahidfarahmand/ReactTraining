/**
 * Nahid
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import * as styledComponent from 'styled-components';
import { observable } from 'mobx';

const { default: styled } = styledComponent;

const BackDrop = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 9998;
    background: rgba(0, 0, 0, 0.3);
`;
const Container = styled.div`
    width: 300px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -150px;
    padding: 20px;
    z-index: 9999;
    background: #f5f5f5;
`;

const FormInput = styled.input`
    margin-left: 10px;
`;

const FormLabel = styled.label`
    display: inline-block;
    width: 100px;
    padding-top: 10px;
`;

const FormSubmit = styled.input`
    margin-left: 10px;
    margin-top: 20px;
    padding: 10px 0px 10px 0px;
    width: 125px;
`;

const CloseButton = styled.button`
    border: 0;
    padding: 4px;
    position: absolute;
    right: 0;
    top: 0;
    background: transparent;
    cursor: pointer;
    transition: background 250ms ease;
    &:hover {
        background: #ccc;
    }
`;

export interface IAddEmployeeProps {
    onAddNewEmployee: (
        fName: string,
        lName: string,
        phone?: string
    ) => void;
    onDismiss: () => void;
}

@observer
export class AddEmployee extends React.Component<IAddEmployeeProps> {
    public render() {
        return (
            <div>
                <BackDrop onClick={this.props.onDismiss} />
                <Container>
                    <CloseButton onClick={this.props.onDismiss}>
                        X
                    </CloseButton>
                    <form onSubmit={this._onAddNewEmployee}>
                        <div>
                            <FormLabel>FirstName</FormLabel>
                            <FormInput
                                type="text"
                                onChange={this._onFirstNameChange}
                            />
                            <br />
                            <FormLabel>LastName</FormLabel>
                            <FormInput
                                type="text"
                                onChange={this._onLastNameChange}
                            />
                            <br />
                            <FormLabel>Phone</FormLabel>
                            <FormInput
                                type="text"
                                onChange={this._onPhoneChange}
                            />
                            <br />
                            <FormLabel />
                            <FormSubmit type="submit" value="Add" />
                        </div>
                    </form>
                </Container>
            </div>
        );
    }

    @observable private _firstName = '';
    @observable private _lastName = '';
    @observable private _phone = '';

    private _onAddNewEmployee = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onAddNewEmployee(
            this._firstName,
            this._lastName,
            this._phone
        );
    };

    private _onFirstNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => (this._firstName = e.target.value);

    public _onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        (this._lastName = e.target.value);
    public _onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        (this._phone = e.target.value);
}
