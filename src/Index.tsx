/**
 * Nahid
 */

/* tslint:disable: no-require-imports no-var-requires */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'src/components/App';
import { DataStore } from 'src/storage/dataStore';
import { CompanyStore } from 'src/storage/companyStore';
import { CompanyAction } from 'src/action/companyAction';

const rootElement = document.getElementById('root');
let DevTools: React.ComponentClass<{}>;

if (__DEV__) {
    DevTools = require<{
        // tslint:disable-next-line:no-reserved-keywords
        default: React.ComponentClass<{}>;
    }>('mobx-react-devtools').default;
}

const companyStore = new CompanyStore();
const companyAction = new CompanyAction(companyStore);
const store = new DataStore(companyStore, companyAction);
const createUi = (AppComponent: typeof App) => {
    return (
        <div>
            <AppComponent dataStore={store} />
            {DevTools ? <DevTools /> : null}
        </div>
    );
};

ReactDOM.render(createUi(App), rootElement);

// Hot Module Replacement APIs
if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require<{ App: typeof App }>('./components/App').App;
        ReactDOM.render(createUi(NextApp), rootElement);
    });
}
