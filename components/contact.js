import styles from "../styles/contact.module.css";
import { FormControl, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending");
    let data = {
      name,
      email,
      message,
    };
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Response received");
      if (res.status === 200) {
        console.log("Response succeeded!");
        setSubmitted(true);
      }
    });
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <div className={styles.contactsection}>
      <div className={styles.socialmedia}>
        <div className={styles.socialheader}>
          <p>Reach me at</p>
        </div>
        <div className={styles.socialcontent}>
          <Link href="https://www.facebook.com/phillip.nguyen.2901/">
            <img
              src="/images/social/facebook.png"
              style={{ marginTop: "-5px" }}
            />
          </Link>
          <Link href="phucnguyen290198@gmail.com">
            <img src="/images/social/google.png" />
          </Link>
          <Link href="https://www.linkedin.com/in/philswe/">
            <img src="/images/social/linkedin.png" />
          </Link>
          <Link href="https://twitter.com/TradesPhil">
            <img
              src="/images/social/twitter.png"
              style={{ marginTop: "5px" }}
            />
          </Link>
        </div>
      </div>
      <div className={styles.contactformsection}>
        <form className={styles.contactform}>
          <input
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <textarea
            value={message}
            placeholder="Message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
