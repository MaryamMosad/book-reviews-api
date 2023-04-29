import { Args, Authorized, Mutation, Resolver } from "type-graphql";
import { RoleService } from "./roles.service";
import { CreateRoleInput } from "./inputs/create-role.input";
import { RolesPermissions } from "./role-permissions";
import { AssignRoleToUserInput } from "./inputs/assign-role-to-user.input";
import { Role } from "./role.model";
import { User } from "../user/user.model";

@Resolver(Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService = new RoleService()) {}

  @Mutation((returns) => Boolean)
  async createAdmin() {
    return await this.roleService.createAdmin();
  }

  @Authorized(RolesPermissions.MANAGE_ROLES)
  @Mutation((returns) => Role)
  async createRole(@Args() input: CreateRoleInput) {
    return await this.roleService.createRole(input);
  }

  @Authorized(RolesPermissions.MANAGE_ROLES)
  @Mutation((returns) => User)
  async assignOrUnassignRoleToUser(@Args() input: AssignRoleToUserInput) {
    return await this.roleService.assignOrUnassignRoleToUser(input);
  }
}
