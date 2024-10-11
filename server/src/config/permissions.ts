import { Role } from "@prisma/client";

type Permissions = {
  [key: string]: {
    [key: string]: string;
  };
};

export const permissions: Permissions = {
  basic: {
    read: "read",
    create: "create",
    update: "update",
    delete: "delete",
  },
};

const userPermissions = [permissions.basic.read];
const adminPermissions = [
  ...userPermissions,
  permissions.basic.create,
  permissions.basic.update,
  permissions.basic.delete,
];

const permissionsByRole = {
  [Role.USER]: userPermissions,
  [Role.ADMIN]: adminPermissions,
};

export const getPermissionsByRole = (role: Role[]) => {
  const permissionsSet = new Set<string>();
  role.forEach((role) => {
    permissionsByRole[role].forEach((permission) => {
      permissionsSet.add(permission);
    });
  });

  const permissions = Array.from(permissionsSet);
  if (permissions.length === 0) return null;
  return permissions;
};
