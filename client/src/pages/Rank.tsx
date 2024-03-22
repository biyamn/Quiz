import { useEffect, useState } from 'react';
import axios from 'axios';

const Rank = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user');
        const data = response.data;
        const sortedData = data.sort((a: any, b: any) => {
          if (a.score === b.score) {
            return a.time - b.time;
          }
          return b.score - a.score;
        });
        setUsers(sortedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>~~db에 저장된 랭킹 보기~~</h1>
      <ul>
        {users.map((user: any, index: number) => (
          <li key={index}>
            {user.nickname} - {user.score}점 - {user.time}초
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rank;
