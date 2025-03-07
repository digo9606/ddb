import { useState } from "react";
import axios from "axios";

export default function FinancialNews() {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    const fetchAnalysis = async () => {
        const res = await axios.post("http://localhost:5000/analyze", { prompt: query });
        setResponse(res.data.choices[0].message.content);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Financial AI News & Analysis</h1>
            <textarea
                className="w-full p-2 border rounded"
                placeholder="Ask about stock trends, crypto, or finance..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={fetchAnalysis} className="mt-2 p-2 bg-blue-500 text-white rounded">
                Get Analysis
            </button>
            {response && <p className="mt-4 p-2 border">{response}</p>}
        </div>
    );
}
