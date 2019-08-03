'use strict';

module.exports = (app, db) => {

  // GET all users
  app.get('/users', (req, res) => {
    db.users.findAll()
      .then(users => {
        res.json(users);
      });
  });

  // GET one owner by id
  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    db.users.find({
      where: { id: id}
    })
      .then(users => {
        res.json(users);
      });
  });

  // POST single owner
  app.post('/owner', (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    db.users.create({
      name: name,
      role: role
    })
      .then(newusers => {
        res.json(newusers);
      })
  });

  // PATCH single owner
  app.patch('/owner/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    db.users.find({
      where: { id: id }
    })
      .then(owner => {
        return owner.updateAttributes(updates)
      })
      .then(updatedOwner => {
        res.json(updatedOwner);
      });
  });

  // DELETE single owner
  app.delete('/owner/:id', (req, res) => {
    const id = req.params.id;
    db.users.destroy({
      where: { id: id }
    })
      .then(deletedOwner => {
        res.json(deletedOwner);
      });
  });
};