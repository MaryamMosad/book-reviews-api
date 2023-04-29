import { User } from "../user/user.model";
import { hashPassword } from "../common/utils/password-utils";
import { AssignRoleToUserInput } from "./inputs/assign-role-to-user.input";
import { CreateRoleInput } from "./inputs/create-role.input";
import { MainAdmin, RolesPermissions } from "./role-permissions";
import { Role } from "./role.model";

export class RoleService {
  /**
   * creates the main role with all of the permissions if it doesn't exist
   * and updates it if it already exists
   */
  async createAdmin() {
    let role = await Role.findOne({ where: { name: MainAdmin } });
    if (!role) {
      role = await Role.create({
        name: MainAdmin,
        permissions: Object.keys(RolesPermissions),
      });

      await User.create({
        username: "admin",
        password: await hashPassword("main@admin@password"),
        email: "admin@test.com",
        roleId: role.id,
      });
    } else {
      await role.update({ permissions: Object.keys(RolesPermissions) });
      role.save();
    }
    return true;
  }

  async createRole(input: CreateRoleInput) {
    return await Role.create({ ...input });
  }
  
  /**
   * assigns a role to the user if the role is present in the input </br>
   * 
   * if the role in undefind then it removes the role from the user
   */
  async assignOrUnassignRoleToUser(
    input: AssignRoleToUserInput
  ): Promise<User> {
    const user = await User.update(
      { roleId: input.roleId ? input.roleId : null },
      {
        where: { id: input.userId },
        returning: true,
      }
    );
    return user[1][0];
  }
}
