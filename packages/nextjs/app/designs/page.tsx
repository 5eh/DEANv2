"use client";

import React, { useEffect, useState } from "react";

const UpdateForm = () => {
  const connectedAddress = "0x9d958fc91792293Fb0028CbaA27de58093aE0757";
  const [field, setField] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <form>
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
    </div>
  );
};

export default UpdateForm;
