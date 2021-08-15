const MongoClient = require('mongodb').MongoClient;
const auth = require('../shared/index');
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger Azure function for create product processed a request.');
  // Connection URL
MongoClient.connect(
  process.env.CosmosDBURL,
  (err, database) => {
    if (err) throw err;
    let product = ({ name, price, description } = req.body);
    const db = database.db(process.env.CosmosDB);    

    db.collection('productcatlog').insertOne(
      {
        name: product.name,
        price: product.price,
        description: product.description,
        viewCount : 0,
        isDeleted:false,
        deletionDate:null,
        createdAt: Date.now()
      },
      (err, result) => {
        if (err) throw err;
        context.res = {
          body: result
        };
        database.close();
        context.done();
      }
    );
  }
);
};