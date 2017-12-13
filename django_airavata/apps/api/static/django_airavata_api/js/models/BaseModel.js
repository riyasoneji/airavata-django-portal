
export default class BaseModel {

    /**
     * Create and optionally populate fields of a model instance.
     * - fields: an Array of field definitions. Each field definition can either
     *   be just the name of the field as a string, or an object with the
     *   following properties:
     *   - name (required)
     *   - type (required: one of 'string', 'boolean', 'number', 'date', or a class reference)
     *   - list (optional, boolean)
     *   - default (optional, the default value to be used, if not specified then null is used)
     * - data: a data object, typically a deserialized JSON response
     */
    constructor(fields, data={}){
        fields.forEach(fieldDefinition => {
            if (typeof fieldDefinition === 'string') {
                this[fieldDefinition] = this.convertSimpleField(data[fieldDefinition], null);
            } else { // fieldDefinition must be an object
                let fieldName = fieldDefinition.name;
                let fieldType = fieldDefinition.type;
                let fieldIsList = typeof fieldDefinition.list !== 'undefined' ? fieldDefinition.list : false;
                let fieldDefault = typeof fieldDefinition.default !== 'undefined' ? fieldDefinition.default : null;
                let fieldValue = data[fieldName];
                if (fieldIsList) {
                    this[fieldName] = fieldValue ? fieldValue.map(item => this.convertField(fieldType, item, fieldDefault)) : fieldDefault;
                } else {
                    this[fieldName] = this.convertField(fieldType, fieldValue, fieldDefault);
                }
            }
        });
    }

    convertField(fieldType, fieldValue, fieldDefault) {
        if (fieldType === 'string' || fieldType === 'boolean' || fieldType === 'number') {
            return this.convertSimpleField(fieldValue, fieldDefault);
        } else if (fieldType === 'date') {
            return this.convertDateField(fieldValue, fieldDefault);
        } else if (typeof fieldType === 'function') {
            // Assume that it is another BaseModel class
            return this.convertModelField(fieldType, fieldValue, fieldDefault);
        }
    }

    convertSimpleField(fieldValue, fieldDefault) {
        return typeof fieldValue !== 'undefined' ? fieldValue : fieldDefault;
    }

    convertDateField(fieldValue, fieldDefault) {
        return typeof fieldValue !== 'undefined' ? new Date(fieldValue) : fieldDefault;
    }

    convertModelField(modelClass, fieldValue, fieldDefault) {
        return typeof fieldValue !== 'undefined' ? new modelClass(fieldValue) : fieldDefault;
    }

    /**
     * Override to provide validation. If there are validation errors this
     * method should return a dictionary where keys are property names and
     * values are an array of error messages.
     */
    validate() {
        return null;
    }
}
