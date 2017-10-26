import * as express from 'express';

import PeopleCtrl from './controllers/people';
import People from './models/people';

export default function setRoutes(app) {

  const router = express.Router();

  const peopleCtrl = new PeopleCtrl();

  // People
  router.route('/people').get(peopleCtrl.getAll);
  router.route('/people').post(peopleCtrl.insert);
  router.route('/people/:id').get(peopleCtrl.get);
  router.route('/people/:id').put(peopleCtrl.update);
  router.route('/people/:id').delete(peopleCtrl.delete);


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
