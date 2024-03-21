import { useEffect, useState } from 'react';
import axios from 'axios';

const Rank = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/user');
        console.log(response.data);
        setUsers(response.data);
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
