"use client";

import React, { useEffect, useState } from "react";
import { updateAccount } from "~~/mongodb/_actions/updateAccountAction";
import { readAccount } from "~~/mongodb/_actions/readAccountAction";
import { useAccount } from "wagmi";

const UpdateForm = () => {
  const { address: connectedAddress } = useAccount();
  const [field, setField] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [accountInformation, setAccountInformation] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!connectedAddress) {
      setMessage("You must be connected to your wallet");
      return;
    }

    try {
      const response = await updateAccount(connectedAddress, field, value);
      setMessage(response.msg || "Account updated successfully");
    } catch (error) {
      console.error("Failed to update account", error);
      setMessage("Failed to update account");
    }
  };

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const user = await readAccount(connectedAddress);
        setAccountInformation(user);
      } catch (error) {
        console.error("Failed to read account", error);
      }
    };

    if (connectedAddress) {
      fetchAccountData();
    }
  }, [connectedAddress]);

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="field">Field:</label>
            <input
              type="text"
              id="field"
              name="field"
              value={field}
              onChange={e => setField(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="value">Value:</label>
            <input
              type="text"
              id="value"
              name="value"
              value={value}
              onChange={e => setValue(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update</button>
        </form>
        {message && <p>{message}</p>}
      </div>

      <div>
        <p>Account information:</p>
        {accountInformation ? (
          <pre>{JSON.stringify(accountInformation, null, 2)}</pre>
        ) : (
          <p>No account information available</p>
        )}
      </div>
    </div>
  );
};

export default UpdateForm;
