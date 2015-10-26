var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    paymentDue : {type: 'date', defaultsTo: null},
    paymentAmount : {type: 'float', defaultsTo: 0},
    passports : { collection: 'Passport', via: 'user' }
  }
};

module.exports = User;
