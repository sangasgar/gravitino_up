import { SetMetadata } from "@nestjs/common";
import { PermissionEnum } from "./enums/permission.enum";

export const HasPermissions = (...permissions: PermissionEnum[]) => SetMetadata('permissions', permissions);