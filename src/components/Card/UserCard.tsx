import React from 'react';

interface UserCardProps {
  department: string;
  summary: {
    male: number;
    female: number;
    ageRange: string;
    hair: Record<string, number>;
    addressUser: Record<string, string>;
  };
}

const UserCard: React.FC<UserCardProps> = ({ department, summary }) => {
  return (
    <>
      <section>
        <h2>{department}</h2>
        <p>Male: {summary.male}</p>
        <p>Female: {summary.female}</p>
        <p>Age Range: {summary.ageRange}</p>
      </section>

      <section>
        <h4>Hair Color Summary:</h4>
        <ul>
          {Object.entries(summary.hair).map(([color, count]) => (
            <li key={color}>{color}: {count}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4>Addresses:</h4>
        <ul>
          {Object.entries(summary.addressUser).map(([name, postalCode]) => (
            <li key={name}>{name}: {postalCode}</li>
          ))}
        </ul>
      </section>
      <hr />
    </>
  );
};

export default UserCard;
