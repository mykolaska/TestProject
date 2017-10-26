import * as mongoose from 'mongoose';

const peopleSchema = new mongoose.Schema({
  name: String
});

const People = mongoose.model('People', peopleSchema);

export default People;
