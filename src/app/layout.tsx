import './globals.css'
import type { Metadata } from 'next'
import { ImageProvider } from '../lib/image-context'

export const metadata: Metadata = {
  title: 'リフォトル - リフォームシミュレーション',
  description: 'リフォーム後のイメージを簡単に作成できるサービス',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <ImageProvider>
          {children}
        </ImageProvider>
      </body>
    </html>
  )
}