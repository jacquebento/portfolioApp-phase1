import React, { useState } from "react";

function Contact() {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent by ${contact.name}`);
    setContact({ name: "", email: "", message: "" }); // reset form
  };

  return (
    <section>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Your Email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="Your Message"
          value={contact.message}
          onChange={(e) => setContact({ ...contact, message: e.target.value })}
          required
        />
        <br />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}

export default Contact;
