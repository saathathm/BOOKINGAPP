import axios from "axios";
const { useEffect, useState } = require("react");

export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(url);
                setData(res.data);
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
        };
        fetchData(); // Call the async function inside useEffect
    }, []);

    const reFetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url)
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };
    return { data, loading, error, reFetch }
};

export default useFetch;