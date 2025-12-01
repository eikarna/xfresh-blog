"use client"

import { DiscussionEmbed } from "disqus-react"
import { useTheme } from "next-themes"

interface DisqusCommentsProps {
  shortname: string
  config: {
    url: string
    identifier: string
    title: string
  }
}

export function DisqusComments({ shortname, config }: DisqusCommentsProps) {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  
  // Avoid rendering on the server or during build
  if (typeof window === "undefined") {
    return null
  }

  return (
    <div className="mt-12 bg-white dark:bg-[#242525] p-5" key={currentTheme}>
      <DiscussionEmbed shortname={shortname} config={{...config, colorScheme: currentTheme}} theme={currentTheme} />
    </div>
  )
}
