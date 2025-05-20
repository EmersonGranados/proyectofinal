const User = require("./user.models");
const Role = require("./role.models");
const UserRole = require("./userRole.models");
const Auth = require("./auth.models");


User.hasOne(Auth, { foreignKey: 'id', sourceKey: 'id', as: 'AuthUser' });
Auth.belongsTo(User, { foreignKey: 'id', targetKey: 'id', as: 'AuthUser' });


User.hasMany(UserRole, { foreignKey: 'user_id', sourceKey: 'id', as: 'urUser' });
UserRole.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', as: 'urUser' });


Role.hasMany(UserRole, { foreignKey: "role_id", sourceKey: "id", as: "urRole" });
UserRole.belongsTo(Role, { foreignKey: "role_id", targetKey: "id", as: "urRole" });