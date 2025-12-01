import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <div className="prose dark:prose-invert lg:prose-xl mx-auto">
      <h1>Contact Us</h1>
      <p>Have a question or want to work with us? Feel free to reach out.</p>
      <p>
        You can find us on social media or send an email to:
        <a href="mailto:nixic0@proton.me"> nixic0@proton.me</a>
      </p>
    </div>
  )
}
