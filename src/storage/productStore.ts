/**
 * Nahid
 */
import { observable } from 'mobx';

export interface IProductStore {
    readonly id: string;
    readonly label: string;
    readonly price: number;
}

export class ProductStore implements IProductStore {
    constructor(id: string, label: string, price: number) {
        this.id = id;
        this.label = label;
        this.price = price;
    }

    public id: string = '';
    @observable public label: string = '';
    @observable public price: number = 0;
}
