/**
 * Nahid
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import * as styledComponent from 'styled-components';
import { Tab } from 'src/commons';

const { default: styled } = styledComponent;

const Container = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: -1px;
`;

const TabHeader = styled.span`
    color: gray;
    border: 1px solid LightGray;
    border-bottom: 0px;
    padding: 5px 8px;
    cursor: pointer;
    &:hover {
        color: CornFlowerBlue;
    }
    :not(:first-child) {
        border-left: 0px;
    }
`;

const TabContent = styled.div`
    color: black;
    border: 1px solid LightGray;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    border-top: none;
`;

export interface ITabViewProps {
    tabs: Tab[];
    selectedTabIndex: number;
    className?: string;
}

@observer
export class TabView extends React.Component<ITabViewProps> {
    public render() {
        const { className = '', tabs } = this.props;
        return (
            <Container className={className}>
                <HeaderContainer>
                    {tabs.map((t, idx) => (
                        <TabHeader
                            id={t.title}
                            onClick={() => this._onTabSelectionChanged(idx)}
                            key={t.title}
                            style={{ background: idx === this._selectedTabIndex ? 'white' : 'whiteSmoke' }}>
                            {t.title}
                        </TabHeader>
                    ))}
                </HeaderContainer>
                <TabContent>{tabs[this._selectedTabIndex].content}</TabContent>
            </Container>
        );
    }

    @observable private _selectedTabIndex: number = this.props.selectedTabIndex;

    private _onTabSelectionChanged = (selectedId: number) => {
        this._selectedTabIndex = selectedId;
    };
}
