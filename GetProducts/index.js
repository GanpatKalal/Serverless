const MongoClient = require('mongodb').MongoClient;
const auth = require('../shared/index');
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger Azure function for get all products processed a request.');
  // Connection URL
MongoClient.connect(
  process.env.CosmosDBURL,
  (err, database) => {
      if (err) throw err;
      console.log('Connected succesfully');
      const db = database.db(process.env.CosmosDB);
      db
        .collection('productcatlog')
        .find()
        .toArray((err, result) => {
          if (err) throw err;
          context.log('Product catlog list');
          result.forEach(product => delete product._id);
          context.res = {
            //status: 200,
            body: result
          };
          database.close();
          context.done();
        });
    }
  );
};