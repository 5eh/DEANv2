"use client";

import React, { useState, useEffect } from "react";
import { createAccount } from "~~/mongodb/_actions/createAccountAction";
import { useAccount } from "wagmi";

const RegisterForm = () => {
  const [message, setMessage] = useState("");
  const { address: connectedAddress } = useAccount();
  const [formData, setFormData] = useState({ wallet: connectedAddress, username: "", email: "" });

  useEffect(() => {
    if (connectedAddress) {
      setFormData(prev => ({ ...prev, wallet: connectedAddress }));
    }
  }, [connectedAddress]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { wallet, username, email } = formData;
    try {
      const response = await createAccount(wallet, username, email);
      setMessage(response.msg || response.errMsg || "Failed to create account");
    } catch (error) {
      console.error("Failed to create account", error);
      setMessage("Failed to create account");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address">Connected Address:</label>
          <p>{connectedAddress}</p>
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
