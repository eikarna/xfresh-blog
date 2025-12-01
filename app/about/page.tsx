import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our mission and team.",
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return (
    <div className="prose dark:prose-invert lg:prose-xl mx-auto">
      <h1>About Us</h1>
      <p>
        This is a placeholder about page for our Next.js blog. We are passionate about sharing knowledge and creating
        amazing web experiences.
      </p>
      <p>
        Our blog is built with the latest technologies to ensure it's fast, SEO-friendly, and a joy to read. We cover
        topics ranging from web development and software engineering to design and productivity.
      </p>
    </div>
  )
}
