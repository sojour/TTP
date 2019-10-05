const db = require('./db');
const { User, Transaction } = require('./db/models');


const seed = async () => {
  await db.sync({ force: true });

  // seed your database here!
  const userOne = await User.create({
    firstName: 'Hello',
    lastName: 'There',
    email: 'one@gmail.com',
    password: '1234',
  });

  const userTwo = await User.create({
    firstName: 'Good',
    lastName: 'Bye',
    email: 'two@gmail.com',
    password: '1234'
  });


  const transactionOne = await Transaction.create({
    ticker: 'APPL',
    quantity: 5,
    price: 1000
  })

  console.log('Seeding success!');
  db.close();
};

// const syncDb = () => db.sync({ force: true });
//syncDb();
seed().catch(err => {
  console.error('Oh noes! Something went wrong!');
  console.error(err);
  db.close();
});
