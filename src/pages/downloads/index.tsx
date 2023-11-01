import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

function DownloadsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Make a request to your API function using Axios
    axios
      .get('/api/get-properties')
      .then((response) => {
        console.log('API Response:', response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, []);

  return <div>{data ? data.message : 'Loading...'}</div>;
}

export default DownloadsPage;
