import { Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { RoleService } from "./roles.service";
import { roleServiceObj } from "../common/constants/services";
import { CreateRoleInput } from "./inputs/create-role.input";
import { RolesPermissions } from "./role-permissions";
import { AssignRoleToUserInput } from "./inputs/assign-role-to-user.input";
import { Role } from "./role.model";
import { User } from "../user/user.model";
import { UpdateRoleInput } from "./inputs/update-role.input";
import { RoleInput } from "./inputs/role.input";

@Resolver(Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService = roleServiceObj) {}

  @Authorized(RolesPermissions.MANAGE_ROLES)
  @Query((returns) => [Role])
  async roles() {
    return await this.roleService.roles();
  }

  @Authorized(RolesPermissions.MANAGE_ROLES)
  @Query((returns) => Role)
  async roleById(@Args() { roleId }: RoleInput) {
    return await this.roleService.roleOrError(roleId);
  }

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
  @Mutation((returns) => Role)
  async updateRole(@Args() input: UpdateRoleInput) {
    return await this.roleService.updateRole(input);
  }

  @Authorized(RolesPermissions.MANAGE_ROLES)
  @Mutation((returns) => Boolean)
  async deleteRole(@Args() input: RoleInput) {
    return await this.roleService.deleteRole(input);
  }

  @Authorized(RolesPermissions.MANAGE_ROLES)
  @Mutation((returns) => User)
  async assignOrUnassignRoleToUser(@Args() input: AssignRoleToUserInput) {
    return await this.roleService.assignOrUnassignRoleToUser(input);
  }
}
