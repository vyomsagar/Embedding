import React from "react";

const AskQuestion = () => {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleAsk = async () => {
    try {
      if (!question.trim()) {
        alert("Please enter a question");
        return;
      }

      setLoading(true);
      setAnswer("");

      const response = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: question }), // match backend
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      setAnswer(data.answer); // because your backend returns { answer: { answer: "..." } }

    } catch (err) {
      console.error(err);
      alert("Error asking question");
    } finally {
      setLoading(false);
        setQuestion("");
    }
  };

  return (
    <div className="w-full p-20 bg-mauve-900 flex items-center justify-center">
      <div className="w-1/3 h-fit bg-slate-900 p-10 rounded-lg shadow-lg">
        
        <h1 className="text-white text-xl font-bold text-center">
          Ask Your Question
        </h1>

        <p className="text-gray-300 text-center mt-4">
          Ask anything based on your uploaded data
        </p>

        <textarea
          className="w-full mt-6 p-3 rounded bg-gray-800 text-white outline-none"
          rows={4}
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={handleAsk}
          className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

        {answer && (
          <div className="mt-6 bg-gray-800 p-4 rounded text-white">
            <h3 className="font-semibold mb-2">Answer:</h3>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskQuestion;