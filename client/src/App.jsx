import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [recipients, setRecipients] = useState("");
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("formal");
  const [subject, setSubject] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    setLoading(true);
    toast.loading("Generating email...");
    try {
      const response = await axios.post("http://localhost:3000/generate", {
        prompt,
        tone,
      });

      const { subject, emailBody } = response.data;
      setSubject(subject);
      setGeneratedEmail(emailBody);

      toast.dismiss();
      toast.success("Email generated!");
    } catch (err) {
      toast.dismiss();
      toast.error("❌ Error generating email.");
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    setLoading(true);
    toast.loading("Sending email...");
    try {
      const res = await axios.post("http://localhost:3000/send", {
        recipients,
        subject,
        emailBody: generatedEmail,
      });

      toast.dismiss();
      toast.success(res.data.message);
    } catch (err) {
      toast.dismiss();
      toast.error("❌ Error sending email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-300 p-6">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto bg-white/80 shadow-md rounded-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">📧 AI Email Sender</h1>

        <div>
          <label className="block font-medium text-gray-700">Recipients</label>
          <input
            type="text"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            placeholder="e.g. john@example.com, jane@xyz.com"
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Write an email to..."
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Tone / Style</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="friendly">Friendly</option>
            <option value="persuasive">Persuasive</option>
            <option value="apologetic">Apologetic</option>
          </select>
        </div>

        <button
          onClick={generateEmail}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
          ✨ Generate Email
        </button>

        {generatedEmail && (
          <>
            <div>
              <label className="block font-medium text-gray-700">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-600">Tone: {tone}</p>
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="text-sm text-blue-600 hover:underline"
              >
                {previewMode ? "Switch to Edit Mode" : "Switch to Preview Mode"}
              </button>
            </div>

            {previewMode ? (
              <div className="mt-2 p-4 border bg-gray-100 rounded-md whitespace-pre-wrap text-gray-800">
                {generatedEmail}
              </div>
            ) : (
              <textarea
                value={generatedEmail}
                onChange={(e) => setGeneratedEmail(e.target.value)}
                rows={10}
                className="w-full mt-2 p-2 border rounded-md"
              />
            )}

            <button
              onClick={sendEmail}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition mt-4 flex items-center justify-center gap-2"
            >
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              ✅ Send Email
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
