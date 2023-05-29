import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.beta.ons.gov.uk/v1/datasets');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div>
                <div>
                    <pre>{JSON.stringify(data, null, 4)}</pre>
                </div>
            </div>
        </>
    );
}

export default App;
