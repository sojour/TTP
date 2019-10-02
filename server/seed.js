const db = require('./db');
const { User, UserShares } = require('./db/models');


const seed = async () => {
  await db.sync({ force: true });

  // seed your database here!
  const userOne = await User.create({
    email: 'one@gmail.com',
    password: '1234'
  });

  const userTwo = await User.create({
    email: 'two@gmail.com',
    password: '1234'
  });

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
