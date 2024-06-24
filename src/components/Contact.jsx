import React from "react"
import { FaLinkedin, FaInstagram, FaGlobeAsia } from "react-icons/fa"

const Contact = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "red",
        alignItems: "end",
        marginRight: 10,
      }}
    >
      <h1
        style={{
          fontFamily: "sans-serif",
          fontSize: "1rem",
          color: "white",
          fontWeight: "lighter",
        }}
      >
        Say hi to A'zham
      </h1>
      <div>
        <a
          href="https://www.linkedin.com/in/a-zham-albar-rasyid-958539203/"
          target="_blank"
        >
          <FaLinkedin style={{ fontSize: 28, color: "white" }} />
        </a>
        <a href="https://www.instagram.com/azham.rasyid/" target="_blank">
          <FaInstagram
            style={{ fontSize: 28, color: "white", marginLeft: 10 }}
          />
        </a>
        <a href="https://azhamrasyidv2.vercel.app/" target="_blank">
          <FaGlobeAsia
            style={{ fontSize: 28, color: "white", marginLeft: 10 }}
          />
        </a>
      </div>
    </div>
  )
}

export default Contact
