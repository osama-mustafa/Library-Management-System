
class FilterAPI {
    constructor(model, queryString) {
        this.model = model;
        this.queryString = queryString;
        this.attributes = [];
        this.options = {};
        this.modelAttributes = Object.keys(this.model.getAttributes());
    }


    select() {
        if (this.queryString.select) {
            this.options.attributes = this.queryString.select.split(',');
            this.options.model = this.model

            // If user provides non-existing fields with existing ones in select query string, 
            // We will exclude any other attributes that is not exist in model attributes,
            // e.g. localhsot/users/select=blablabla&name;
            // in the previous example, we will select 'name' field only

            this.options.attributes =
                this.options.attributes.filter(attr => this.modelAttributes.includes(attr));
            if (!this.options.attributes.length) {
                delete this.options.attributes;
            }

        } else {

            // If user does not provide select in query string,
            // so we will delete attributes array from options object

            delete this.options.attributes
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
            return this.model.findAll(this.options);
        } else {
            delete this.options.order;
            return this.model.findAll(this.options)
        }
    }
}

module.exports = FilterAPI