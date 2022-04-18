const User = require('../models/User');
const Role = require('../models/Role');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { 
        association: 'roles', 
        attributes: ['name'], 
        through: { 
          attributes: []
        } 
      }
    })

    return res.json(user.roles);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    console.log('01 ')
       
    const [ role ] = await Role.findOrCreate({
      where: { name }
    });

    await user.addRole(role);       
    
    return res.json(role);
  },



  async delete(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const role = await Role.findOne({
      where: { name }
    });

    await user.removeRole(role);

    return res.json();
  }
};