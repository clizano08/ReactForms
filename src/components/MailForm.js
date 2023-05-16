import React, { useState } from "react";
import MailClient from "../api/MailClient.js";

const MailForm = () => {
  const [sender, setSender] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState("");

  function handleInputChangeSender(event) {
    setSender(event.target.value);
  }

  function handleInputChangeCc(event) {
    setCc(event.target.value);
  }

  function handleInputChangeBcc(event) {
    setBcc(event.target.value);
  }

  const onClick = () => {
    const senderList = sender.split(",");
    let ccList;
    let bccList;

    if (cc.length > 0) {
      ccList = cc.split(",");
    } else {
      ccList = new Array();
    }
    if (bcc.length > 0) {
      bccList = bcc.split(",");
    } else {
      bccList = new Array();
    }

    addPosts(senderList, ccList, bccList, subject, body);
  };

  const addPosts = (senderList, ccList, bccList, subject, body) => {
    MailClient.post("/Send", {
      sender: senderList,
      cc: ccList,
      bcc: bccList,
      subject: subject,
      body: body,
    })
      .then((response) => {
        console.log(response.data);
        setPosts([response.data, ...posts]);
      })
      .catch((error) => {
        console.log(error);
      });

    setSender("");
    setCc("");
    setBcc("");
    setSubject("");
    setBody("");
  };

  return (
    <div>
      <h2>Formulario Email</h2>
      <div className="mb-3">
        <label htmlFor="txtSender" className="form-label">
          Sender
        </label>
        <input
          type="text"
          className="form-control"
          name="txtSender"
          id="txtSender"
          value={sender}
          onChange={(e) => handleInputChangeSender(e)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="txtCc" className="form-label">
          Cc
        </label>
        <input
          type="text"
          className="form-control"
          name="txtCc"
          id="txtCc"
          value={cc}
          onChange={(e) => handleInputChangeCc(e)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="txtBcc" className="form-label">
          Bcc
        </label>
        <input
          type="text"
          className="form-control"
          name="txtBcc"
          id="txtBcc"
          value={bcc}
          onChange={(e) => handleInputChangeBcc(e)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="txtSubject" className="form-label">
          Subject
        </label>
        <input
          type="text"
          className="form-control"
          name="txtSubject"
          id="txtSubject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="txtBody" className="form-label">
          Body
        </label>
        <textarea
          className="form-control"
          name="txtBody"
          id="txtBody"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="d-grid gap-2">
        <button
          type="submit"
          name="SendMail"
          id="SendMail"
          className="btn btn-success btn-sm"
          onClick={onClick}
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default MailForm;
