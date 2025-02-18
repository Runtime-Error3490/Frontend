import React, { useState } from "react";
import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";
import axios from "axios";
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
  const postToTwitter = async (tweetText) => {
    console.log("tweetText", tweetText);
    try {
      const response = await axios.post("http://localhost:3001/tweet", {
        twitter_consumer_key: formData.twitter_consumer_key,
        twitter_consumer_secret: formData.twitter_consumer_secret,
        accessToken: formData.twitter_access_token,
        accessTokenSecret: formData.twitter_access_token_secret,
        tweetText: tweetText,
      });

      console.log("Tweet posted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error posting tweet:",
        error.response?.data || error.message
      );
      return "Failed to post tweet.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commitMessages = await fetchCommits(
      formData.github_repo_owner,
      formData.github_repo_name
    );
    const geminiMessaage = await fetchGeminiSummary(await commitMessages.join("\n"));
    const postTwitterData= await postToTwitter(geminiMessaage);
    console.log("postTwitterData", postTwitterData);
  };

  const fetchGeminiSummary = async (commitMessages) => {
    console.log("commitMesasges", commitMessages);
    const GEMINI_API_KEY = formData.gemini_api_key;
    try {
      const response = await fetch("http://localhost:3001/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ GEMINI_API_KEY, commitMessages }),
      });

      if (!response.ok) {
        throw new Error(`Backend Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Gemini API Summary:", data.summary);
      return data.summary;
    } catch (error) {
      console.error("Error fetching summary from backend:", error);
      return "Could not generate summary.";
    }
  };

  const fetchCommits = async (owner, repo) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        {
          method: "GET",
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.statusText}`);
      }

      const commits = await response.json();
      const commitMessages = commits.map((commit) => commit.commit.message);
      return commitMessages;
    } catch (error) {
      console.error("Error fetching commits:", error);
    }
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
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">
              Github Owner Name:
            </label>
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
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">
              Github Repo Name:
            </label>
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
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">
              Twitter Consumer Key:
            </label>
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
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">
              Twitter Consumer Secret:
            </label>
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
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">
              Twitter Access Token:
            </label>
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
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">
              Twitter Access Token Secret:
            </label>
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
            <label className="font-medium whitespace-nowrap mr-2.5 w-60">
              Gemini API Key:
            </label>
            <input
              type="text"
              name="gemini_api_key"
              value={formData.gemini_api_key}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="relative z-10 inline-flex items-center justify-center w-full px-8 py-3 text-lg text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
