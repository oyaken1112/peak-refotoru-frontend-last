'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useImageContext } from '../../lib/image-context';

export default function UploadPage() {
  const router = useRouter();
  const { setUploadedImage } = useImageContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // プレビュー用のURLを作成
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // コンテキストに画像をセット
      setUploadedImage(objectUrl);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      
      // プレビュー用のURLを作成
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // コンテキストに画像をセット
      setUploadedImage(objectUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleNext = () => {
    if (previewUrl) {
      router.push('/2-category');
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf6f2]">
      {/* ヘッダー */}
      <header className="p-4 flex justify-between items-center bg-white shadow-sm">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/logo.png" 
            alt="リフォトル" 
            width={40} 
            height={40} 
            className="mr-2"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-xl font-bold">リフォトル</span>
        </Link>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      <div className="container mx-auto px-4 pt-8">
        {/* ステップインジケーター */}
        <div className="step-nav mb-10">
          <div className="step-item">
            <div className="step-circle step-active">1</div>
            <div className="step-label">部屋写真<br/>アップ</div>
          </div>
          <div className="step-line line-inactive"></div>
          <div className="step-item">
            <div className="step-circle step-inactive">2</div>
            <div className="step-label">カテゴリ<br/>範囲選択</div>
          </div>
          <div className="step-line line-inactive"></div>
          <div className="step-item">
            <div className="step-circle step-inactive">3</div>
            <div className="step-label">素材選択</div>
          </div>
          <div className="step-line line-inactive"></div>
          <div className="step-item">
            <div className="step-circle step-inactive">4</div>
            <div className="step-label">作成完了</div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-8">部屋写真アップロード</h1>

        {/* ドラッグ&ドロップエリア */}
        <div 
          className="max-w-xl mx-auto border-2 border-dashed border-orange-300 rounded-lg p-12 flex flex-col items-center justify-center bg-white cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleButtonClick}
        >
          {previewUrl ? (
            <div className="relative w-full">
              <img 
                src={previewUrl} 
                alt="アップロードされた画像" 
                className="w-full h-auto rounded-md" 
              />
              <button 
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewUrl(null);
                  setSelectedFile(null);
                  setUploadedImage(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <p className="text-lg mb-3">ここからアップロード</p>
                <p className="text-sm text-gray-500 mb-4">または下のボタンから</p>
              </div>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/svg+xml,image/heif"
            className="hidden"
          />
        </div>

        {!previewUrl && (
          <div className="max-w-xl mx-auto mt-6">
            <button 
              onClick={handleButtonClick}
              className="w-full py-3 bg-[#eb6832] text-white rounded-md hover:bg-[#d55a25] transition-colors font-medium"
            >
              写真を選択
            </button>
          </div>
        )}

{/* プライバシーポリシー */}
<div className="max-w-xl mx-auto mt-8 bg-blue-50 p-4 rounded-lg">
  <div className="flex justify-center items-center mb-2">
    {/* アイコン */}
    <div className="text-blue-500 mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    </div>
    {/* 見出しテキスト */}
    <h3 className="font-medium text-center text-base ">プライバシー保護について</h3>
  </div>

  {/* 本文テキスト */}
  <p className="text-sm text-gray-600 text-center whitespace-pre-line">
    アップロードされた写真は<br />
    安全なクラウドストレージに保存され、{'\n'}
    リフォームイメージの作成にのみ使用されます。{'\n'}
    個人情報保護のため、写真は暗号化され、{'\n'}
    第三者に共有されることはありません。
  </p>
</div>


        {/* ナビゲーションボタン */}
        <div className="max-w-xl mx-auto mt-8 flex justify-between">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md px-5 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>戻る</span>
          </Link>
          <button 
            onClick={handleNext}
            disabled={!previewUrl}
            className={`flex items-center px-5 py-2 rounded-md ${previewUrl ? 'bg-[#eb6832] text-white hover:bg-[#d55a25]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} transition-colors`}
          >
            <span>次へ進む</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* 注意書き */}
        <div className="max-w-xl mx-auto mt-4 text-center text-sm text-gray-500">
          写真をアップロードしてから次へ進んでください
        </div>
      </div>
    </div>
  );
}