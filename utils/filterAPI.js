const isPositiveNumber = require('./helper');
const system = require('../config/system');


class FilterAPI {
    constructor(model, queryString) {
        this.model = model;
        this.queryString = queryString;
        this.options = {};
        this.modelAttributes = Object.keys(this.model.getAttributes());
    }

    // If user provides non-existing attributes with existing ones in select query string, 
    // We will exclude non-existing ones in the model attributes,
    // e.g. localhsot/users/select=blablabla&name;
    // in the previous example, we will select 'name' field only

    select() {
        if (this.queryString.select) {
            const selectedAttributes =
                this.queryString.select.split(',').filter(attr => this.modelAttributes.includes(attr));
            if (selectedAttributes.length) {
                this.options.attributes = selectedAttributes;
            }
        }
        return this;
    }

    sort() {
        let orderDirectionOptions = ['ASC', 'DESC'];
        let orderDirection;
        let orderBy;

        // If orderBy field does not exist in model attributes;
        // we will cancel the order option completely

        if (this.modelAttributes.includes(this.queryString.orderBy)) {

            // If orderDirection is not 'ASC' nor 'DESC',
            // We well set it to be ASC order

            if (orderDirectionOptions.includes(this.queryString.orderDirection?.toUpperCase())) {
                orderDirection = this.queryString.orderDirection;
            } else {
                orderDirection = 'ASC'
            }
            orderBy = this.queryString.orderBy;
            this.options.order = [[orderBy, orderDirection]];
        }
        return this;
    }

    paginate() {
        const page = isPositiveNumber(Number(this.queryString.page)) ? parseInt(this.queryString.page) : 1;
        const pageSize = isPositiveNumber(Number(this.queryString.pageSize)) ? parseInt(this.queryString.pageSize) : system.DOCUMENTS_PER_PAGE;
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        this.options.limit = limit;
        this.options.offset = offset;
        return this.model.findAll(this.options);
    }
}

module.exports = FilterAPI