import { GroupedByDepartment, User } from "@/utils/types";

function getAgeRange(users: User[]): string {
  const ages = users.map((user) => user.age);
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);
  return `${minAge}-${maxAge}`;
}

export function groupByDepartment(users: User[]): GroupedByDepartment {
  return users.reduce((acc: GroupedByDepartment, user) => {
    const department = user.company.department;
    const nameKey = `${user.firstName}${" "}${user.lastName}`;

    // Initialize department if not present
    if (!acc[department]) {
      acc[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      };
    }

    const deptSummary = acc[department];

    // Gender count
    deptSummary[user.gender] += 1;

    // Hair color count
    const hairColor = user.hair.color;
    if (!deptSummary.hair[hairColor]) {
      deptSummary.hair[hairColor] = 0;
    }
    deptSummary.hair[hairColor] += 1;

    // Address with formatted name
    deptSummary.addressUser[nameKey] = user.address.postalCode;

    // Update age range
    const departmentUsers = users.filter(
      (u) => u.company.department === department
    );
    deptSummary.ageRange = getAgeRange(departmentUsers);

    return acc;
  }, {});
}
