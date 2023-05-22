import { VueAjaxTable, VueSimpleTable } from './components';

export default {
    install: (app) => {
        app.component('VueAjaxTable', VueAjaxTable)
        app.component('VueSimpleTable', VueSimpleTable)
    },
};

export { VueAjaxTable, VueSimpleTable }
