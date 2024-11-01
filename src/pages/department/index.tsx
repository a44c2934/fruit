import UserCard from '@/components/Card/UserCard';
import Box from '@/components/Layout/Box';
import Container from '@/components/Layout/Container';
import Loading from '@/components/Loading/Loading';
import { GroupedByDepartment } from '@/utils/types';
import { useEffect, useState } from 'react';

const Department = () => {
  const [data, setData] = useState<GroupedByDepartment>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      // Type assertion for error
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred : fetchData at /api/users');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <Box>
        <h1>User Data Summary</h1>
        {loading && <Loading />}
        {Object.entries(data).map(([department, summary]) => (
          <UserCard key={department} department={department} summary={summary} />
        ))}
      </Box>
    </Container>
  );
};

export default Department;
