import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    github_repo_owner: "",
    github_repo_name: "",
    twitter_consumer_key: "",
    twitter_consumer_secret: "",
    twitter_access_token: "",
    twitter_access_token_secret: "",
    gemini_api_key: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <>
      <div className="header_login flex justify-center h-fit w-screen">
        <h1 className="text-9xl">Twitter_Github_Connector</h1>
      </div>
      <div className="login h-fit w-fit">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center h-fit w-screen"
        >
          <div className="flex flex-row justify-center items-center py-5">
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">Github Owner Name:</label>
            <input
              type="text"
              name="github_repo_owner"
              value={formData.github_repo_owner}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex flex-row items-center py-5">
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">Github Repo Name:</label>
            <input
              type="text"
              name="github_repo_name"
              value={formData.github_repo_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex flex-row items-center py-5">
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">Twitter Consumer Key:</label>
            <input
              type="text"
              name="twitter_consumer_key"
              value={formData.twitter_consumer_key}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex flex-row items-center py-5">
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">Twitter Consumer Secret:</label>
            <input
              type="text"
              name="twitter_consumer_secret"
              value={formData.twitter_consumer_secret}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex flex-row items-center py-5">
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">Twitter Access Token:</label>
            <input
              type="text"
              name="twitter_access_token"
              value={formData.twitter_access_token}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex flex-row items-center py-5">
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">Twitter Access Token Secret:</label>
            <input
              type="text"
              name="twitter_access_token_secret"
              value={formData.twitter_access_token_secret}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex flex-row items-center py-5">
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">Gemini API Key:</label>
            <input
              type="text"
              name="gemini_api_key"
              value={formData.gemini_api_key}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
