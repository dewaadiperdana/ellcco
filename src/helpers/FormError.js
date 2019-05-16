class FormError {
  constructor(errors) {
    this.errors = errors;
  }

  has(field) {
    if(this.errors === null || this.errors.length <= 0) {
      return false;
    }

    return this.errors.hasOwnProperty(field);
  }

  get(field) {
    return this.has(field) ? this.errors[field].message : null;
  }

  delete(field) {
    if(this.has(field)) {
      return;
    }

    delete this.errors[field];
  }
}

export default FormError;