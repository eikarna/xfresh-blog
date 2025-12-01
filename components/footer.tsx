import { Instagram, Youtube } from "lucide-react"
import Link from "next/link"

import { Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://www.xfresh.id/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              XFresh
            </a>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="https://www.xfresh.id/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              XFresh Home
            </Link>
            <Link href="https://www.xfresh.id/#tentang-kami" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              Tentang Kami
            </Link>
            <Link href="https://www.xfresh.id/#lokasi" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              Lokasi
            </Link>
            <Link href="https://www.xfresh.id/#kemitraan" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              Kemitraan
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://www.instagram.com/xfresh.id"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://www.tiktok.com/@xfresh.id"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.49-.01-8.99-.02-13.48Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

